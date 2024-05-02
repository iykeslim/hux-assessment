import React, { createContext, useState, useEffect, ReactNode } from "react"

interface User {
  _id?: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
}

interface AuthContextState {
  user: User | null
  isAuthenticated: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (newUser: User) => void
  logout: () => void
  updateUser: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextState>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  updateUser: () => {},
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing authentication state on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  
  const login = (newUser: User) => {
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

   const updateUser = async (updatedUser: User) => {
    //  TOTO:Update User info
     console.log(
       "Update user logic goes here. Update user state and handle errors.",
     )
   }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
