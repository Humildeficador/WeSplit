import type { ReactNode } from "react"
import type { StatCardType } from "../../../types/StatCardData"

type Props = {
  stat: Omit<StatCardType, 'sparkLineData'>
  children: ReactNode
}

export const StatCard = ({ stat: { id, Icon, title, value, description, accentColor: { iconBackground, valueColor, iconColor } }, children }: Props) => {
  return (
    <div className="bg-[#13151a] mt-5 p-5 flex flex-col gap-5 rounded-md select-none">
      <div className="flex gap-5">
        <div className={`${iconBackground} w-14 h-14 rounded-full flex justify-center items-center`}>
          <Icon className={iconColor} size={28} />
        </div>

        <div className="flex-1">
          <h2>{title}</h2>
          {
            id !== 4 ?
              <p className={`font-semibold text-2xl ${valueColor}`}>R$ {value.toFixed(2)}</p>
              :
              <p className={`font-semibold text-2xl ${valueColor}`}>{value}</p>
          }
          <p className="text-sm text-white/50 mt-3">{description}</p>
        </div>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  )
}