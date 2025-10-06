"use client"
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome,</p>
              <p className="font-medium">Admin User</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-400">1,234</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-400">567</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-yellow-400">$12,345</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="space-y-2">
              <p><span className="font-medium">Status:</span> Connected</p>
              <p><span className="font-medium">Server:</span> Running</p>
              <p><span className="font-medium">Authentication:</span> Working</p>
              <p><span className="font-medium">Database:</span> Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
