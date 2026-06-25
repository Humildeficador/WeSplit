import { createContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
  isLogged: boolean,
  login: (token: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogged(true)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setIsLogged(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}