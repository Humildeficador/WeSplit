import type { LucideIcon } from "lucide-react"
import type { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  label: string,
  type: string,
  placeholder: string,
  icon: LucideIcon,
  error?: string,
  registration: UseFormRegisterReturn
}

export const Input = ({ label, type, placeholder, icon: Icon, error, registration }: Props) => {
  return (
    <div className="flex flex-col gap-2 mt-9">
      <label htmlFor={registration.name}>{label}</label>
      <div className="bg-[#0a0d11] rounded-lg flex items-center gap-2 pl-3 border border-hairline">
        <label htmlFor={registration.name}><Icon size={15} className="text-white/50" /></label>
        <input type={type} {...registration} className="outline-none py-3 flex-1 text-sm" placeholder={placeholder} id={registration.name} />
      </div>

      {error &&
        <p className="border border-danger bg-danger/10 text-danger mt-4 px-3 rounded-md">
          ⓘ {error}
        </p>
      }
    </div>
  )
}