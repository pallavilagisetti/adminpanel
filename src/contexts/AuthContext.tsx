"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  uid: string
  email: string
  displayName?: string
  emailVerified: boolean
  metadata: {
    lastSignInTime?: string
    creationTime?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('admin-user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate login - in real app, this would call Firebase
    const mockUser: User = {
      uid: 'admin-123',
      email: email,
      displayName: 'Admin User',
      emailVerified: true,
      metadata: {
        lastSignInTime: new Date().toISOString(),
        creationTime: new Date().toISOString()
      }
    }
    
    setUser(mockUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-user', JSON.stringify(mockUser))
    }
  }

  const logout = async () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-user')
    }
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
