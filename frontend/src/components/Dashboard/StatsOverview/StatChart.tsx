import { Line, LineChart, ResponsiveContainer } from "recharts"

type Props = {
  chartData: { value: number }[],
  chartColor: string
}

export const StatChart = ({ chartData, chartColor }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={chartData}>
        <Line
          type="linear"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}