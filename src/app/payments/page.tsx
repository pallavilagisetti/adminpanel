export default function PaymentsPage() {
  return (
    <div className="grid gap-6">
      <section className="card p-6">
        <h1 className="text-3xl font-bold">Payments & Subscriptions</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage billing, subscriptions, and financial analytics</p>
      </section>

      {/* KPI tiles */}
      <section className="grid md:grid-cols-4 gap-4">
        <div className="metric-card p-6 bg-green-600/15 border-green-600/30">
          <div className="text-sm text-[var(--text-secondary)]">Monthly Revenue</div>
          <div className="mt-2 text-3xl font-bold">$89,420</div>
          <div className="mt-1 text-xs text-green-400">+23.1% from last month</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Active Subscriptions</div>
          <div className="mt-2 text-3xl font-bold">3,847</div>
          <div className="mt-1 text-xs text-green-400">+12.5% from last month</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Conversion Rate</div>
          <div className="mt-2 text-3xl font-bold">29.8%</div>
          <div className="mt-1 text-xs text-green-400">+3.2% from last month</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Churn Rate</div>
          <div className="mt-2 text-3xl font-bold">4.2%</div>
          <div className="mt-1 text-xs text-red-400">-0.8% from last month</div>
        </div>
      </section>

      {/* Tabs */}
      <div className="card p-2">
        <div className="grid grid-cols-3 gap-2">
          <button className="px-3 py-2 rounded-md text-sm bg-white/10 border border-white/10">Subscriptions</button>
          <button className="px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 text-white/80">Transactions</button>
          <button className="px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 text-white/80">Revenue Analytics</button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <input placeholder="Search by user name or email..." className="input-field w-full max-w-md" />
          <select className="input-field ml-4">
            <option>All Status</option>
            <option>Active</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3">User</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Next Billing</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{u:'Alice Johnson',e:'alice@example.com',plan:'Pro',status:'Active',amt:'$19.99',next:'2024-04-15'},{u:'Bob Smith',e:'bob@example.com',plan:'Enterprise',status:'Active',amt:'$99.99',next:'2024-04-20'},{u:'Carol Davis',e:'carol@example.com',plan:'Pro',status:'Cancelled',amt:'$19.99',next:'-'}].map((r, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.u}</div>
                    <div className="text-xs text-white/60">{r.e}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-400/30">{r.plan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3">{r.amt}</td>
                  <td className="px-4 py-3">{r.next}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end text-white/80">
                      <button className="btn-secondary text-xs">View</button>
                      <button className="btn-secondary text-xs">Refresh</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


``