import { LoginForm } from "../components/Login/Form/LoginForm"
import { LoginHeader } from "../components/Login/LoginHeader"
import { LoginHero } from "../components/Login/Hero/LoginHero"
import { PhoneMockup } from "../components/Login/PhoneMockup"

export const Login = () => {
  return (
    <div className="bg-[#090b0c] text-white h-dvh">
      <div className="container mx-auto h-full flex flex-col">
        <LoginHeader />
        <div className="flex justify-between mt-10 relative">
          <LoginHero />
          <LoginForm />
          <PhoneMockup />
        </div>
      </div>
    </div>
  )
}