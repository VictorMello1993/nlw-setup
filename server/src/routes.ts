import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod"
import dayjs from "dayjs";
import { getHashedPassword } from "./utils/get-hashed-password";
import { sign } from "jsonwebtoken";
import { getSalt } from "./utils/get-salt";
import { getComparedPassword } from "./utils/compare-passwords";

export async function appRoutes(app: FastifyInstance) {
  const STRONG_PASSWORD_PATTERN = new RegExp(process.env.STRONG_PASSWORD_PATTERN as string)

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(STRONG_PASSWORD_PATTERN, { message: 'Senha fora do padrão' })
  })

  const AUTH_MESSAGE_ERROR = 'E-mail ou senha inválido(s).'

  const SALT = getSalt();

  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    //[0, 1, 2, 3, 4, 5, 6] => Domingo, segunda, terça, quarta, quinta, sexta, sábado

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id) ?? []

    return {
      possibleHabits,
      completedHabits
    }
  })

  //Completar / não completar hábito
  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      //remover a marcação de completo do hábito
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        }
      })
    }
    else {
      // Completar o hábito no dia atual
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    // [{date: 17/01, available_habits: 5, completed_habits: 1}, {date: 18/01, available_habits: 2, completed_habits: 2}, {}]

    const summary = await prisma.$queryRaw`
      SELECT d.id,
             d.date,
            (
              SELECT cast(count(*) as float) FROM day_habits dh
              where dh.day_id = d.id
            ) as completed_habits,
            (
              SELECT cast(count(*) as float)
              FROM habit_week_days hwd
                JOIN habits h ON h.id = hwd.habit_id
                WHERE hwd.week_day = cast(extract(dow from d.date) as integer)
                AND h.created_at <= d.date
            ) as available_habits FROM days d`

    return summary
  })

  app.post('/users', async (request) => {
    const { email, password } = userSchema.parse(request.body);

    const hashedPassword = getHashedPassword(password, SALT)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })
  })

  app.post('/users/login', async (request) => {
    const { email, password } = userSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error(AUTH_MESSAGE_ERROR)
    }

    const comparePasswords = getComparedPassword(SALT)
    const passwordIsMatch = comparePasswords(user.password, password)

    if (!passwordIsMatch) {
      throw new Error(AUTH_MESSAGE_ERROR)
    }

    const token = sign({ email }, process.env.SECRET_KEY as string, {
      subject: user.id,
      expiresIn: process.env.SECRET_KEY_EXPIRES_IN
    })

    return { token }

  })
}