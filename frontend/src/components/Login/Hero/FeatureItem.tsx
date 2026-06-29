import type { LucideIcon } from "lucide-react"

type Props = {
  title: string,
  description: string,
  icon: LucideIcon
}

export const FeatureItem = ({ title, description, icon: Icon }: Props) => {
  return (
    <div className="flex gap-5">
      <div className="bg-gray-800 w-12 h-12 rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-105">
        <Icon size={24} className="text-blue-400"/>
      </div>

      <div className="flex flex-col">
        <p>{title}</p>
        <p className="text-white/50">{description}</p>
      </div>
    </div>
  )
}