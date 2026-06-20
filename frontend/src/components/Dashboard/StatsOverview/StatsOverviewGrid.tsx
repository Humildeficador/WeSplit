import { StatCard } from "./StatCard"
import { statCardList } from "./statCardList"


export const StatsOverviewGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {statCardList.map(data => (
        <StatCard data={data} key={data.id} />
      ))}
    </div>
  )
}