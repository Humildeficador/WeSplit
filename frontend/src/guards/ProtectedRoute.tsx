import type { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useAuth()

  if (!isLogged) {
    return <Navigate to="/" />
  }
  return children
}