import './globals.css'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Upstar Admin Dashboard',
  description: 'Internal admin panel for user and skill management',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}

