import { Line, LineChart, ResponsiveContainer } from "recharts"

type Props = {
  data: { value: number }[],
  bgChart: string
}

export const StatChart = ({ data, bgChart }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={data}>
        <Line
          type="linear"
          dataKey="value"
          stroke={bgChart}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}