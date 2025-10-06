"use client"
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserProfile from '@/components/UserProfile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  
  // If it's the login page, render it without the sidebar and header
  if (pathname === '/login') {
    return <>{children}</>
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="sidebar w-64 p-6 flex-shrink-0">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">SkillGraph AI</h1>
              <p className="text-sm text-[var(--text-secondary)]">Admin Panel</p>
            </div>
            
            <nav className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-[var(--text-secondary)] mb-1">Main</div>
              <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Dashboard
              </Link>
              <Link href="/users" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Users
              </Link>
              <Link href="/resumes" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resumes
              </Link>
              <Link href="/skills" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Skill Graph
              </Link>
              <Link href="/jobs" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                Jobs
              </Link>
              <div className="mt-6 text-xs uppercase tracking-wide text-[var(--text-secondary)]">Analytics</div>
              <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3v18M6 8v13M16 13v8M21 6v15" />
                </svg>
                Analytics
              </Link>
              <Link href="/payments" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1M5 7h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
                Payments
              </Link>
              <div className="mt-6 text-xs uppercase tracking-wide text-[var(--text-secondary)]">Management</div>
              <Link href="/ai-settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM3 12h2m14 0h2M12 3v2m0 14v2m-7.07-9.07l1.41 1.41m10.32 0l1.41-1.41M6.34 17.66l1.41-1.41m8.49 0l1.41 1.41" />
                </svg>
                AI Settings
              </Link>
              <Link href="/cms" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
                </svg>
                CMS
              </Link>
              <Link href="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </Link>
              <Link href="/system-health" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13h4l3 7 4-14 3 7h4" />
                </svg>
                System Health
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-h-0">
            <header className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Admin Dashboard</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                  <UserProfile />
                </div>
              </div>
            </header>
            
            <div className="flex-1 main-content p-6">
              {children}
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
