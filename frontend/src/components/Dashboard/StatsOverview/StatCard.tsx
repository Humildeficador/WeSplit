import { Line, LineChart } from "recharts"
import type { StatCardType } from "../../../types/StatCardData"

type Props = {
  data: StatCardType
}

export const StatCard = ({ data: { id, Icon, title, value, description, accentColor: { bg, text, icon } } }: Props) => {
  return (
    <div className="bg-[#13151a] mt-5 p-5 flex gap-5 rounded-md">
      <div className={`${bg} w-14 h-14 rounded-full flex justify-center items-center`}>
        {<Icon className={icon} size={28} />}
      </div>

      <div>
        <h2>{title}</h2>
        {
          id !== 4 ?
            <p className={`font-semibold text-2xl ${text}`}>R$ {value.toFixed(2)}</p>
            :
            <p className={`font-semibold text-2xl ${text}`}>{value}</p>
        }
        <p className="text-sm text-white/50 mt-3">{description}</p>

      </div>
    </div>
  )
}