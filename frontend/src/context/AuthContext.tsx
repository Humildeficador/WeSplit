import { createContext, useEffect, useState, type ReactNode } from "react"
import { TOKEN_KEY } from "../constants/tokenKey"

type AuthContextType = {
  isLogged: boolean,
  isLoading: boolean,
  login: (token: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      setIsLogged(true)
    }
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    setIsLogged(true)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setIsLogged(false)
  }

  return (
    <AuthContext.Provider value={{ isLogged, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}