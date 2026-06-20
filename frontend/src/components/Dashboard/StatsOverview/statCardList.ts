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
      text: 'text-[#5eb566]',
      icon: 'text-green-300'
    }
  },
  {
    id: 2,
    Icon: ArrowUp,
    title: 'Total a pagar',
    value: 79.28,
    description: 'Você deve para 3 pessoas',
    accentColor: {
      bg: 'bg-red-900',
      text: 'text-[#fa5343]',
      icon: 'text-red-300'
    }
  },
  {
    id: 3,
    Icon: Wallet,
    title: 'Total movimentado',
    value: 215.90,
    description: 'Valor total de despesas no grupo',
    accentColor: {
      bg: 'bg-blue-900',
      text: 'text-[#4580c4]',
      icon: 'text-blue-300'
    }
  },
  {
    id: 4,
    Icon: ClipboardList,
    title: 'Total de despesas',
    value: 18,
    description: 'Despesas registradas no grupo',
    accentColor: {
      bg: 'bg-purple-900',
      text: 'text-[#a972f0]',
      icon: 'text-purple-300'
    }
  }
]