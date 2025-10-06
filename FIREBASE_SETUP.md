# Firebase Authentication Setup

## Required Firebase Credentials

To complete the Firebase authentication setup, you need to provide the following credentials from your Firebase project:

### 1. Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 2. How to get these credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app icon (`</>`) or add a new web app
6. Copy the config values from the `firebaseConfig` object

### 3. Enable Authentication:

1. In Firebase Console, go to "Authentication"
2. Click on "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Add admin users in the "Users" tab

### 4. Test Credentials:

You can create test admin users with:
- Email: `admin@skillgraph.ai`
- Password: `admin123`

## Features Implemented:

✅ **Firebase Authentication Integration**
✅ **Login Page** (`/login`)
✅ **Protected Routes** (redirects to login if not authenticated)
✅ **User Profile Display** (shows user credentials in header)
✅ **Logout Functionality**
✅ **User Information Display** (email, UID, last sign-in, account creation date)

## User Credentials Display:

The user profile dropdown in the header shows:
- Email address
- User UID
- Last sign-in time
- Account creation date
- Email verification status
- Sign out option

## Security Features:

- All admin routes are protected
- Automatic redirect to login page if not authenticated
- Secure logout functionality
- User session management
