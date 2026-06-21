import { StatCard } from "./StatCard"
import { statCardList } from "./statCardList"
import { StatChart } from "./StatChart"


export const StatsOverviewGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {statCardList.map(card => (
        <StatCard key={card.id} stat={card}>
          <StatChart chartData={card.sparkLineData} chartColor={card.accentColor.chartColor} />
        </StatCard>
      ))}
    </div>
  )
}