export default function HomePage() {
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
          {[
            { title: 'View All Users', desc: 'Manage user accounts' },
            { title: 'AI Settings', desc: 'Configure algorithms' },
            { title: 'Generate Report', desc: 'Export analytics' },
            { title: 'System Health', desc: 'Check performance' },
          ].map((a, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-md p-4">
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-[var(--text-secondary)]">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

