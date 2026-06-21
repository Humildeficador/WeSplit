import { StatsOverviewGrid } from "../components/Dashboard/StatsOverview/StatsOverviewGrid"

export const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="font-semibold text-xl">DASHBOARD FINANCEIRO GERAL</h1>

      <StatsOverviewGrid />
    </div>
  )
}