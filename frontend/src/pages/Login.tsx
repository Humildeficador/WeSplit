import { LoginForm } from "../components/Login/LoginForm"
import { LoginHeader } from "../components/Login/LoginHeader"
import { LoginHero } from "../components/Login/LoginHero"
import { PhoneMockup } from "../components/Login/PhoneMockup"

export const Login = () => {
  return (
    <div className="bg-background text-white h-dvh">
      <div className="container mx-auto h-full flex flex-col">
        <LoginHeader />
        <div className="flex relative">
          <LoginHero />
          <LoginForm />
          <PhoneMockup />
        </div>
      </div>
    </div>
  )
}