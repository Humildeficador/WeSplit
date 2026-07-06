import { createContext, useEffect, useState, type ReactNode } from "react"
import { TOKEN_KEY } from "../constants/tokenKey"

type AuthContextType = {
  isLogged: boolean,
  login: (token: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      setIsLogged(true)
    }
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
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}