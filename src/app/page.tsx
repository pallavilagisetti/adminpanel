"use client"
import Link from 'next/link'

export default function HomePage() {
  const generateReport = () => {
    // Generate overall admin panel status report
    const reportData = {
      timestamp: new Date().toISOString(),
      totalUsers: 12847,
      activeUsers: 11523,
      totalResumes: 8492,
      skillsAnalyzed: 45320,
      monthlyRevenue: 89420,
      systemHealth: {
        aiProcessing: 98,
        database: 95,
        apiResponse: 87,
        userSatisfaction: 94
      },
      recentActivity: [
        { action: 'User Registration', count: 45, time: '2 hours ago' },
        { action: 'Resume Upload', count: 23, time: '3 hours ago' },
        { action: 'Skill Analysis', count: 89, time: '4 hours ago' },
        { action: 'Job Recommendations', count: 156, time: '5 hours ago' }
      ]
    }
    
    // Create downloadable report
    const reportContent = `
ADMIN PANEL STATUS REPORT
Generated: ${new Date().toLocaleString()}

OVERVIEW:
- Total Users: ${reportData.totalUsers.toLocaleString()}
- Active Users: ${reportData.activeUsers.toLocaleString()} (${Math.round((reportData.activeUsers/reportData.totalUsers)*100)}%)
- Active Resumes: ${reportData.totalResumes.toLocaleString()}
- Skills Analyzed: ${reportData.skillsAnalyzed.toLocaleString()}
- Monthly Revenue: $${reportData.monthlyRevenue.toLocaleString()}

SYSTEM HEALTH:
- AI Processing: ${reportData.systemHealth.aiProcessing}%
- Database: ${reportData.systemHealth.database}%
- API Response: ${reportData.systemHealth.apiResponse}%
- User Satisfaction: ${reportData.systemHealth.userSatisfaction}%

RECENT ACTIVITY:
${reportData.recentActivity.map(activity => `- ${activity.action}: ${activity.count} events (${activity.time})`).join('\n')}

STATUS: All systems operational
    `
    
    // Download the report
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admin-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <section className="card p-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-[var(--text-secondary)] mt-1">Monitor your SkillGraph AI platform performance and analytics</p>
      </section>

      {/* KPIs */}
      <section className="grid md:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="metric-card p-6 bg-green-600/15 border-green-600/30">
          <div className="text-sm text-[var(--text-secondary)]">Total Users</div>
          <div className="mt-2 text-3xl font-bold">12,847</div>
          <div className="mt-1 text-xs text-green-400">+12.5% vs last month</div>
        </div>
        {/* Active Resumes */}
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Active Resumes</div>
          <div className="mt-2 text-3xl font-bold">8,492</div>
          <div className="mt-1 text-xs text-green-400">+8.2% vs last month</div>
        </div>
        {/* Skills Analyzed */}
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Skills Analyzed</div>
          <div className="mt-2 text-3xl font-bold">45,320</div>
          <div className="mt-1 text-xs text-green-400">+15.8% vs last month</div>
        </div>
        {/* Monthly Revenue */}
        <div className="metric-card p-6 bg-green-600/15 border-green-600/30">
          <div className="text-sm text-[var(--text-secondary)]">Monthly Revenue</div>
          <div className="mt-2 text-3xl font-bold">$89,420</div>
          <div className="mt-1 text-xs text-green-400">+12.1% vs last month</div>
        </div>
      </section>

      {/* Activity + Health */}
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <p className="text-[var(--text-secondary)] text-sm">Latest platform activities and user interactions</p>
          <div className="mt-4 space-y-3">
            {['User Registration', 'Resume Upload', 'Skill Analysis', 'Job Recommendations'].map((t, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-md px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">⚡</div>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{[2,3,4,5][i]} hours ago</div>
                  </div>
                </div>
                <div className="text-xs text-[var(--text-secondary)]">{[45, 23, 89, 156][i]} events</div>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6">
          <h2 className="text-xl font-semibold">System Health</h2>
          <p className="text-[var(--text-secondary)] text-sm">Real-time performance metrics</p>
          <div className="mt-4 space-y-4">
            {[
              { label: 'AI Processing', pct: 98 },
              { label: 'Database', pct: 95 },
              { label: 'API Response', pct: 87 },
              { label: 'User Satisfaction', pct: 94 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-[var(--text-secondary)]">{m.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{m.pct}%</div>
                </div>
                <div className="h-2 rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-[var(--accent)]" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-[var(--text-secondary)] text-sm">Frequently used admin tasks</p>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          <Link href="/users" className="bg-white/5 border border-white/10 rounded-md p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group">
            <div className="font-medium group-hover:text-[var(--accent)] transition-colors">View All Users</div>
            <div className="text-xs text-[var(--text-secondary)]">Manage user accounts</div>
          </Link>
          <Link href="/ai-settings" className="bg-white/5 border border-white/10 rounded-md p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group">
            <div className="font-medium group-hover:text-[var(--accent)] transition-colors">AI Settings</div>
            <div className="text-xs text-[var(--text-secondary)]">Configure algorithms</div>
          </Link>
          <button onClick={generateReport} className="bg-white/5 border border-white/10 rounded-md p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group text-left">
            <div className="font-medium group-hover:text-[var(--accent)] transition-colors">Generate Report</div>
            <div className="text-xs text-[var(--text-secondary)]">Export analytics</div>
          </button>
          <Link href="/system-health" className="bg-white/5 border border-white/10 rounded-md p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group">
            <div className="font-medium group-hover:text-[var(--accent)] transition-colors">System Health</div>
            <div className="text-xs text-[var(--text-secondary)]">Check performance</div>
          </Link>
        </div>
      </section>
    </div>
  )
}

