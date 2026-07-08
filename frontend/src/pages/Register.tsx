import { AuthHero } from "../components/Auth/Shared/Hero/AuthHero"
import { AuthHeader } from "../components/Auth/Shared/AuthHeader"
import { PhoneMockup } from "../components/Auth/Shared/PhoneMockup"
import { RegisterForm } from "../components/Auth/Register/RegisterForm"

export const Register = () => {
  return (
    <div className="bg-background text-white min-h-dvh">
      <div className="container mx-auto h-full flex flex-col">
        <AuthHeader />
        <div className="flex justify-between mt-10 relative">
          <AuthHero />
          <RegisterForm />
          <PhoneMockup />
        </div>
      </div>
    </div>
  )
}