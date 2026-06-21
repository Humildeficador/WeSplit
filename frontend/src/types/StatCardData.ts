import type { ElementType } from "react"

export type StatCardType = {
  id: number
  Icon: ElementType,
  title: string,
  value: number,
  description: string
  accentColor: {
    bg: string,
    bgChart: string,
    text: string,
    icon: string
  },
  sparkLineData: { value: number }[]
}