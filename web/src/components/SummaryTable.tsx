import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../libs/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

//126 dias (logo, 126 quadradinhos para 18 semanas)
const minimumSummaryDatesSize = 18 * 7

//126 dias - nº de dias contados a partir do primeiro dia do ano
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = Array<{
  id: string
  date: string
  availableHabits: number
  completedHabits: number
}>

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(response => {
      // console.log('summary', response.data)
      setSummary(response.data)
    })
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              key={`${weekDay} - ${index}`}
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find(day => {

            // const dayHabit = dayjs(day.date, 'day').toDate()
            // console.log('dayHabit', dayHabit)
            // return dayjs(date).toDate() === dayHabit

            return dayjs(date).isSame(day.date, 'day')
          })

          // console.log('dayInSummary', dayInSummary)
          // const dateTest = new Date(2022, 12, 20)
          // console.log('dateTest', dayjs(dateTest))

          // console.log('summaryDates', summaryDates)
          // console.log('dayjs(date)toDate()', dayjs(date).toDate())
          // console.log('dayInSummary', dayInSummary)
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              availableHabits={dayInSummary?.availableHabits}
              completedHabits={dayInSummary?.completedHabits}
            />
          )
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
          )
        })}
      </div>
    </div>
  )
}