import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { api } from "../libs/axios";
import { calculateCompletedPercentage } from "../utils/calculate-completed-percentage";
import { HabitsInfo } from "./HabitDayModal";

interface HabitsListProps {
  date: Date,
  onCompletedChanged: (habitsInfo: HabitsInfo, completedHabits: string[]) => void,
  habitsInfo: HabitsInfo,
  handleCompletedPercentage: (percentage: number) => void
}

export function HabitsList({ date, onCompletedChanged, handleCompletedPercentage, habitsInfo }: HabitsListProps) {
  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    }
    else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    const updatedCompletedPercentage = calculateCompletedPercentage(habitsInfo.possibleHabits.length, completedHabits.length)

    handleCompletedPercentage(updatedCompletedPercentage);
    onCompletedChanged(habitsInfo, completedHabits);
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className='mt-6 flex flex-col gap-3 max-h-72'>
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed ml-4 mt-2'
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}>
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border 2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}