# API Integration Guide for Admin Panel

## 🔌 Required APIs from Main Website

### **1. Authentication APIs**
```typescript
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/verify
POST /api/auth/refresh
```

### **2. User Management APIs**
```typescript
GET /api/users                    // Get all users with pagination
GET /api/users/{id}               // Get specific user details
PUT /api/users/{id}               // Update user information
PATCH /api/users/{id}/status      // Change user status (Active/Suspended)
DELETE /api/users/{id}            // Delete user account
POST /api/users/{id}/impersonate  // Login as user
```

### **3. Analytics & Metrics APIs**
```typescript
GET /api/analytics/overview       // Dashboard metrics
GET /api/analytics/users          // User statistics
GET /api/analytics/activity       // Recent activity
GET /api/analytics/health         // System health
GET /api/analytics/reports        // Generate reports
```

### **4. Content Management APIs**
```typescript
GET /api/skills                   // User skills data
GET /api/resumes                  // Resume information
GET /api/jobs                     // Job postings data
GET /api/companies               // Company information
```

### **5. Communication APIs**
```typescript
POST /api/messages/send           // Send message to user
GET /api/messages/history         // Message history
POST /api/notifications/send      // Send notifications
```

## 📊 Data Structure Requirements

### **User Object**
```typescript
interface User {
  id: string
  name: string
  email: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  status: 'Active' | 'Inactive' | 'Suspended'
  joinedDate: string
  lastActive: string
  skills: number
  resumes: number
  active: boolean
  avatar?: string
  company?: string
  location?: string
}
```

### **Analytics Object**
```typescript
interface Analytics {
  totalUsers: number
  activeUsers: number
  proUsers: number
  suspendedUsers: number
  totalSkills: number
  totalResumes: number
  totalJobs: number
  recentActivity: Activity[]
  systemHealth: HealthMetrics
}
```

## 🔗 Connection Setup

### **1. Environment Variables**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-main-website.com/api
NEXT_PUBLIC_API_KEY=your-api-key
NEXT_PUBLIC_WEBSITE_URL=https://your-main-website.com
```

### **2. API Client Setup**
```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = {
  users: {
    getAll: () => fetch(`${API_BASE}/users`),
    getById: (id: string) => fetch(`${API_BASE}/users/${id}`),
    update: (id: string, data: any) => fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  analytics: {
    getOverview: () => fetch(`${API_BASE}/analytics/overview`),
    getUsers: () => fetch(`${API_BASE}/analytics/users`)
  }
}
```

## 🎯 Implementation Steps

### **Step 1: Update API Calls**
Replace mock data in your admin panel with real API calls:

```typescript
// In users/page.tsx
useEffect(() => {
  const fetchUsers = async () => {
    const response = await fetch('/api/users')
    const data = await response.json()
    setUsers(data.users)
  }
  fetchUsers()
}, [])
```

### **Step 2: Add Error Handling**
```typescript
const handleApiCall = async (apiCall: () => Promise<Response>) => {
  try {
    const response = await apiCall()
    if (!response.ok) throw new Error('API call failed')
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    // Show user-friendly error message
  }
}
```

### **Step 3: Real-time Updates**
```typescript
// WebSocket connection for real-time data
useEffect(() => {
  const ws = new WebSocket('wss://your-website.com/ws')
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    // Update UI with real-time data
  }
}, [])
```

## 🔐 Security Requirements

### **1. API Authentication**
- JWT tokens for admin authentication
- Rate limiting on API endpoints
- CORS configuration for admin panel domain

### **2. Data Privacy**
- Encrypt sensitive user data
- Audit logs for admin actions
- Permission-based access control

## 📈 Performance Considerations

### **1. Caching Strategy**
```typescript
// Cache frequently accessed data
const cache = new Map()
const getCachedData = (key: string, fetcher: () => Promise<any>) => {
  if (cache.has(key)) return cache.get(key)
  const data = await fetcher()
  cache.set(key, data)
  return data
}
```

### **2. Pagination**
```typescript
// Implement pagination for large datasets
const getUsers = (page: number, limit: number) => 
  fetch(`${API_BASE}/users?page=${page}&limit=${limit}`)
```

## 🚀 Quick Start Implementation

### **1. Create API Client**
```typescript
// src/lib/apiClient.ts
class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    }

    const response = await fetch(url, { ...options, headers })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    return response.json()
  }

  // User methods
  async getUsers() {
    return this.request('/users')
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`)
  }

  async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // Analytics methods
  async getAnalytics() {
    return this.request('/analytics/overview')
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL!)
```

### **2. Update Users Page**
```typescript
// src/app/users/page.tsx
import { apiClient } from '@/lib/apiClient'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getUsers()
        setUsers(data.users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleSuspendUser = async (userId: string) => {
    try {
      await apiClient.updateUser(userId, { status: 'Suspended' })
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, status: 'Suspended' } : u
      ))
    } catch (error) {
      console.error('Failed to suspend user:', error)
    }
  }

  // ... rest of component
}
```

### **3. Update Dashboard**
```typescript
// src/app/page.tsx
import { apiClient } from '@/lib/apiClient'

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiClient.getAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      }
    }

    fetchAnalytics()
  }, [])

  // ... rest of component
}
```

## 🔧 Environment Setup

### **1. Add to .env.local**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-main-website.com/api
NEXT_PUBLIC_WEBSITE_URL=https://your-main-website.com
NEXT_PUBLIC_WS_URL=wss://your-main-website.com/ws
```

### **2. Update package.json**
```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.0"
  }
}
```

## 📋 Checklist

- [ ] Set up environment variables
- [ ] Create API client
- [ ] Update user management page
- [ ] Update dashboard with real data
- [ ] Add error handling
- [ ] Implement real-time updates
- [ ] Add authentication headers
- [ ] Test all API endpoints
- [ ] Add loading states
- [ ] Implement caching strategy

**This setup will connect your admin panel to the main website's APIs and provide all the real-time data and functionality you need.**

