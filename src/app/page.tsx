"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }
  }, [user, authLoading, router])

  const handleGenerateReport = () => {
    // Generate comprehensive analytics report
    const reportData = {
      title: 'SkillGraph AI - Comprehensive Analytics Report',
      generatedAt: new Date().toISOString(),
      period: "Last 30 Days",
      appVersion: '1.0.0',
      environment: 'production',
      summary: {
        totalUsers: 1234,
        activeUsers: 567,
        totalResumes: 2456,
        totalJobs: 890,
        revenue: 12345,
        userSatisfaction: 94
      },
      metrics: {
        userGrowth: {
          current: 1234,
          previous: 1100,
          growth: 12.2
        },
        revenue: {
          current: 12345,
          previous: 10800,
          growth: 14.3
        },
        systemHealth: {
          aiProcessing: 98,
          database: 95,
          apiResponse: 87,
          userSatisfaction: 94
        }
      },
      activities: [
        { type: "User Registration", count: 45, timestamp: "2 hours ago" },
        { type: "Resume Upload", count: 23, timestamp: "3 hours ago" },
        { type: "Skill Analysis", count: 89, timestamp: "4 hours ago" },
        { type: "Job Recommendations", count: 156, timestamp: "5 hours ago" }
      ],
      recommendations: [
        "Consider optimizing API response times to improve user experience",
        "AI processing performance is excellent - maintain current configuration",
        "User satisfaction is high - continue current engagement strategies",
        "Revenue growth is strong - consider expanding premium features"
      ]
    }

    // Create and download the report
    const reportContent = generateReportContent(reportData)
    downloadReport(reportContent, 'skillgraph-analytics-report.html')
  }

  const generateReportContent = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
        .header h1 { color: #1f2937; margin: 0; font-size: 2.5em; }
        .header p { color: #6b7280; margin: 10px 0 0 0; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .metric-card { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .metric-card h3 { margin: 0 0 10px 0; color: #374151; font-size: 1.1em; }
        .metric-card .value { font-size: 2em; font-weight: bold; color: #3b82f6; margin: 0; }
        .metric-card .growth { color: #10b981; font-size: 0.9em; margin-top: 5px; }
        .section { margin: 30px 0; }
        .section h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .activity-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f9fafb; margin: 10px 0; border-radius: 6px; }
        .recommendation { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 10px 0; border-radius: 6px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.title}</h1>
            <p>Generated on ${new Date(data.generatedAt).toLocaleDateString()} at ${new Date(data.generatedAt).toLocaleTimeString()}</p>
            <p>Analysis Period: ${data.period}</p>
        </div>

        <div class="summary-grid">
            <div class="metric-card">
                <h3>Total Users</h3>
                <p class="value">${data.summary.totalUsers.toLocaleString()}</p>
                <p class="growth">+${data.metrics.userGrowth.growth}% from last period</p>
            </div>
            <div class="metric-card">
                <h3>Active Users</h3>
                <p class="value">${data.summary.activeUsers.toLocaleString()}</p>
                <p class="growth">Active engagement</p>
            </div>
            <div class="metric-card">
                <h3>Total Resumes</h3>
                <p class="value">${data.summary.totalResumes.toLocaleString()}</p>
                <p class="growth">Resume uploads</p>
            </div>
            <div class="metric-card">
                <h3>Revenue</h3>
                <p class="value">$${data.summary.revenue.toLocaleString()}</p>
                <p class="growth">+${data.metrics.revenue.growth}% growth</p>
            </div>
        </div>

        <div class="section">
            <h2>System Health Metrics</h2>
            <div class="summary-grid">
                <div class="metric-card">
                    <h3>AI Processing</h3>
                    <p class="value">${data.metrics.systemHealth.aiProcessing}%</p>
                </div>
                <div class="metric-card">
                    <h3>Database Performance</h3>
                    <p class="value">${data.metrics.systemHealth.database}%</p>
                </div>
                <div class="metric-card">
                    <h3>API Response</h3>
                    <p class="value">${data.metrics.systemHealth.apiResponse}%</p>
                </div>
                <div class="metric-card">
                    <h3>User Satisfaction</h3>
                    <p class="value">${data.metrics.systemHealth.userSatisfaction}%</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Recent Activity</h2>
            ${data.activities.map((activity: any) => `
                <div class="activity-item">
                    <div>
                        <strong>${activity.type}</strong>
                        <p style="margin: 5px 0 0 0; color: #6b7280;">${activity.count} events</p>
                    </div>
                    <span style="color: #6b7280;">${activity.timestamp}</span>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Strategic Recommendations</h2>
            ${data.recommendations.map((rec: any) => `
                <div class="recommendation">
                    <p style="margin: 0; color: #1f2937;">${rec}</p>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>This report was generated automatically by ${data.title}</p>
            <p>Version: ${data.appVersion} | Environment: ${data.environment}</p>
            <p>For questions or support, contact the development team</p>
        </div>
    </div>
</body>
</html>
    `
  }

  const downloadReport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Welcome back, {user.name}! ({user.role})
            </p>
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            SkillGraph AI Admin Panel
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity Section */}
          <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Recent Activity</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6">Latest platform activities and user interactions.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[var(--border)]/30 rounded-lg">
                <div className="w-10 h-10 bg-[var(--accent)]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-primary)] font-medium">User Registration</span>
                    <span className="text-xs text-[var(--text-secondary)]">2 hours ago</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">45 events</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--border)]/30 rounded-lg">
                <div className="w-10 h-10 bg-[var(--accent)]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-primary)] font-medium">Resume Upload</span>
                    <span className="text-xs text-[var(--text-secondary)]">3 hours ago</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">23 events</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--border)]/30 rounded-lg">
                <div className="w-10 h-10 bg-[var(--accent)]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-primary)] font-medium">Skill Analysis</span>
                    <span className="text-xs text-[var(--text-secondary)]">4 hours ago</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">89 events</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--border)]/30 rounded-lg">
                <div className="w-10 h-10 bg-[var(--accent)]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-primary)] font-medium">Job Recommendations</span>
                    <span className="text-xs text-[var(--text-secondary)]">5 hours ago</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">156 events</div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Section */}
          <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">System Health</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6">Real-time performance metrics.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-primary)] font-medium">AI Processing</span>
                  <span className="text-sm text-[var(--success)] font-medium">98%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div className="bg-[var(--accent)] h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-primary)] font-medium">Database</span>
                  <span className="text-sm text-[var(--success)] font-medium">95%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div className="bg-[var(--accent)] h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-primary)] font-medium">API Response</span>
                  <span className="text-sm text-[var(--warning)] font-medium">87%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div className="bg-[var(--accent)] h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-primary)] font-medium">User Satisfaction</span>
                  <span className="text-sm text-[var(--success)] font-medium">94%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div className="bg-[var(--accent)] h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Quick Actions</h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Frequently used admin tasks.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/users" className="block p-4 bg-[var(--border)]/30 rounded-lg hover:bg-[var(--border)]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-[var(--text-primary)] font-medium">View All Users</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Manage user accounts</p>
            </a>

            <a href="/ai-settings" className="block p-4 bg-[var(--border)]/30 rounded-lg hover:bg-[var(--border)]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-[var(--text-primary)] font-medium">AI Settings</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Configure algorithms</p>
            </a>

            <button 
              onClick={handleGenerateReport}
              className="block w-full p-4 bg-[var(--border)]/30 rounded-lg hover:bg-[var(--border)]/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[var(--text-primary)] font-medium">Generate Report</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Export analytics</p>
            </button>

            <a href="/system-health" className="block p-4 bg-[var(--border)]/30 rounded-lg hover:bg-[var(--border)]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13h4l3 7 4-14 3 7h4" />
                </svg>
                <span className="text-[var(--text-primary)] font-medium">System Health</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Check performance</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}