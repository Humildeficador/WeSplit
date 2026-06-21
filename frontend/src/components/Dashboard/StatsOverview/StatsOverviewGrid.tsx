import { StatCard } from "./StatCard"
import { statCardList } from "./statCardList"
import { StatChart } from "./StatChart"


export const StatsOverviewGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {statCardList.map(data => (
        <StatCard key={data.id} data={data}>
          <StatChart data={data.sparkLineData} bgChart={data.accentColor.bgChart} />
        </StatCard>
      ))}
    </div>
  )
}