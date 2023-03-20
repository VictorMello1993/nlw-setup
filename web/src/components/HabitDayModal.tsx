import * as Popover from "@radix-ui/react-popover"
import dayjs from "dayjs"
import { X } from "phosphor-react"
import { useEffect, useState } from "react"
import { http } from "../libs/axios"
import { calculateCompletedPercentage } from "../utils/calculate-completed-percentage"
import { HabitsList } from "./HabitsList"
import { ProgressBar } from "./ProgressBar"
import { ScrollBarArea } from "./ScrollBarArea"

interface HabitDayModalProps {
  date: Date,
  handleCompletedPercentage: (percentage: number) => void,
  completedPercentage: number
}

export interface HabitsInfo {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[],

  completedHabits: string[]
}


export function HabitDayModal({ date, handleCompletedPercentage, completedPercentage }: HabitDayModalProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  useEffect(() => {
    http.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then((response) => {
      setHabitsInfo(response.data)

      const updatedCompletedPercentage = calculateCompletedPercentage(response.data.possibleHabits.length, response.data.completedHabits.length)

      handleCompletedPercentage(updatedCompletedPercentage);
    })
  }, [])

  function handleCompletedChanged(habitsInfo: HabitsInfo, completedHabits: string[]) {
    setHabitsInfo({
      possibleHabits: habitsInfo.possibleHabits,
      completedHabits
    })
  }

  if (!habitsInfo) {
    return <div></div>
  }

  function stopFocusPropagationWhenPopoverIsOpen(event: any) {
    event.stopPropagation();
  }

  return (
    <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col" sideOffset={5} onOpenAutoFocus={(event) => event.preventDefault()}>
      <div className="flex items-center justify-between">
        <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
        <Popover.Close className="text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
          <X size={24} aria-label="Fechar" />
        </Popover.Close>
      </div>
      <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
      <ProgressBar progress={completedPercentage} />
      <ScrollBarArea>
        <HabitsList date={date} onCompletedChanged={handleCompletedChanged} habitsInfo={habitsInfo} handleCompletedPercentage={handleCompletedPercentage} />
      </ScrollBarArea>
      <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
    </Popover.Content>
  )
}