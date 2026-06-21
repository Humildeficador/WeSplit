import type { ElementType } from "react"

export type StatCardType = {
  id: number
  Icon: ElementType,
  title: string,
  value: number,
  format: 'currency' | 'count',
  description: string
  accentColor: {
    iconBackground: string,
    iconColor: string
    valueColor: string,
    chartColor: string,
  },
  sparkLineData: { value: number }[]
}