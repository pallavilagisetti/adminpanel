# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCJuqxgezKMgTRx6ypBULDMJ62qbkLdBrs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=adminpanel-d743c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=adminpanel-d743c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=adminpanel-d743c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=974180139335
NEXT_PUBLIC_FIREBASE_APP_ID=1:974180139335:web:3a5c3a41a73ae037168c62
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-H2CGZSV3CG

# Application Configuration
NEXT_PUBLIC_APP_NAME=SkillGraph AI Admin Panel
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_ENVIRONMENT=development
```

## Steps to Set Up:

1. **Create `.env.local` file** in the project root
2. **Copy the above content** into the file
3. **Update Firebase credentials** with your actual values
4. **Add `.env.local` to `.gitignore`** (already included)
5. **Commit and push** to GitHub safely

## Security Notes:

- ✅ `.env.local` is already in `.gitignore`
- ✅ No sensitive data will be committed to GitHub
- ✅ Environment variables are properly prefixed with `NEXT_PUBLIC_`
- ✅ Firebase credentials are now externalized

## For Production:

When deploying to production, set these environment variables in your hosting platform:
- Vercel: Add in Project Settings > Environment Variables
- Netlify: Add in Site Settings > Environment Variables
- Other platforms: Follow their environment variable setup guide
