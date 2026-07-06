import { DollarSign, FileText, PieChart, Users } from "lucide-react"
import type { FeatureItemType } from "../../../types/FeatureItemType"

export const featureList: FeatureItemType[] = [
  {
    icon: Users,
    title: 'Grupos',
    description: 'Crie grupos e convide amigos.'
  },
  {
    icon: FileText,
    title: 'Despesas',
    description: 'Registre despesas e categorize tudo.'
  },
  {
    icon: PieChart,
    title: 'Gráficos',
    description: 'Acompanhe gastos e veja gráficos categorizados.'
  },
  {
    icon: DollarSign,
    title: 'Saldos',
    description: 'Veja quem deve e quem tem a receber.'
  }
]