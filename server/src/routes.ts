import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod"
import dayjs from "dayjs";
import { getHashedPassword } from "./utils/get-hashed-password";
import { getSalt } from "./utils/get-salt";
import { randomUUID } from "node:crypto";

export async function appRoutes(app: FastifyInstance) {
  const STRONG_PASSWORD_PATTERN = new RegExp(process.env.STRONG_PASSWORD_PATTERN2 as string)
  const AUTH_MESSAGE_ERROR = 'E-mail ou senha inválido(s).'
  const SALT = getSalt();

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(STRONG_PASSWORD_PATTERN, { message: 'Senha fora do padrão' })
  })

  const userLoginSchema = userSchema.transform(async (user) => ({
    ...user,
    password: getHashedPassword(user.password, SALT)
  }))

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

  app.post('/users', async (request: FastifyRequest) => {
    const { email, password } = userSchema.parse(request.body);

    await prisma.user.create({
      data: {
        email,
        password
      }
    })
  })

  app.post('/users/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const MILLISSECONDS_IN_4_HOURS = 1000 * 60 * 60 * 4;

    const { email, password } = await userLoginSchema.parseAsync(request.body);

    let sessionId = request.cookies.sessionId as string;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: MILLISSECONDS_IN_4_HOURS
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      await prisma.user.create({
        data: {
          email,
          password,
          sessionId
        }
      })
    }
    else {
      await prisma.user.update({
        data: {
          sessionId
        },
        where: {
          email
        }
      })
    }

    return reply.status(201)
      .header("Access-Control-Allow-Credentials", "true")
      .header("Access-Control-Allow-Origin", process.env.ORIGIN)
      .send({ message: 'Login efetuado com sucesso' });
  })
}