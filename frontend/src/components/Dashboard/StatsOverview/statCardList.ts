import { ArrowDown, ArrowUp, ClipboardList, Wallet } from "lucide-react";
import type { StatCardType } from "../../../types/StatCardData";

export const statCardList: StatCardType[] = [
  {
    id: 1,
    Icon: ArrowDown,
    title: 'Total a receber',
    value: 129.29,
    format: 'currency',
    description: 'Você deve receber de 5 pessoas',
    accentColor: {
      iconBackground: 'bg-green-900',
      iconColor: 'text-green-300',
      valueColor: 'text-success',
      chartColor: '#5eb566'
    },
    sparkLineData: [
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 30 }
    ]
  },
  {
    id: 2,
    Icon: ArrowUp,
    title: 'Total a pagar',
    value: 79.28,
    format: 'currency',
    description: 'Você deve para 3 pessoas',
    accentColor: {
      iconBackground: 'bg-red-900',
      iconColor: 'text-red-300',
      valueColor: 'text-danger',
      chartColor: '#fa5343'
    },
    sparkLineData: [
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 30 }
    ]
  },
  {
    id: 3,
    Icon: Wallet,
    title: 'Total movimentado',
    value: 215.90,
    format: 'currency',
    description: 'Valor total de despesas no grupo',
    accentColor: {
      iconBackground: 'bg-blue-900',
      iconColor: 'text-blue-300',
      valueColor: 'text-info',
      chartColor: '#4580c4'
    },
    sparkLineData: [
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 30 }
    ]
  },
  {
    id: 4,
    Icon: ClipboardList,
    title: 'Total de despesas',
    value: 18,
    format: 'count',
    description: 'Despesas registradas no grupo',
    accentColor: {
      iconBackground: 'bg-purple-900',
      iconColor: 'text-purple-300',
      valueColor: 'text-accent',
      chartColor: '#a972f0'
    },
    sparkLineData: [
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 25 },
      { value: 10 },
      { value: 30 }
    ]
  }
]