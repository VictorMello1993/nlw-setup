import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { useState } from 'react';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { HabitDayModal } from './HabitDayModal';

interface HabitDayProps {
  date: Date,
  availableHabits?: number,
  defaultHabitsCompleted?: number
}

export function HabitDay({ availableHabits = 0, defaultHabitsCompleted = 0, date }: HabitDayProps) {
  const defaultCompletedPercentage = calculateCompletedPercentage(availableHabits, defaultHabitsCompleted)

  const [completedPercentage, setCompletedPercentage] = useState(defaultCompletedPercentage)

  function handleCompletedPercentage(percentage: number) {
    setCompletedPercentage(percentage)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })} />
      <Popover.Portal>
        <>
          <HabitDayModal date={date} completedPercentage={completedPercentage} handleCompletedPercentage={handleCompletedPercentage} />
        </>
      </Popover.Portal >
    </Popover.Root >
  )
}