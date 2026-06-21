import { ArrowDown, ArrowUp, ClipboardList, Wallet } from "lucide-react";
import type { StatCardType } from "../../../types/StatCardData";

export const statCardList: StatCardType[] = [
  {
    id: 1,
    Icon: ArrowDown,
    title: 'Total a receber',
    value: 129.29,
    description: 'Você deve receber de 5 pessoas',
    accentColor: {
      bg: 'bg-green-900',
      bgChart: '#5eb566',
      text: 'text-success',
      icon: 'text-green-300'
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
    description: 'Você deve para 3 pessoas',
    accentColor: {
      bg: 'bg-red-900',
      bgChart: '#fa5343',
      text: 'text-danger',
      icon: 'text-red-300'
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
    description: 'Valor total de despesas no grupo',
    accentColor: {
      bg: 'bg-blue-900',
      bgChart: '#4580c4',
      text: 'text-info',
      icon: 'text-blue-300'
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
    description: 'Despesas registradas no grupo',
    accentColor: {
      bg: 'bg-purple-900',
      bgChart: '#a972f0',
      text: 'text-accent',
      icon: 'text-purple-300'
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