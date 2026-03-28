# 🔐 Supabase Setup Guide for Google Authentication

## 🚀 Quick Fix: Create Real Supabase Project

The current URL `ztyqhqbskrcjjbidkogx.supabase.co` appears to be invalid/placeholder.

### Step 1: Create Supabase Project
1. **Go to**: https://supabase.com
2. **Click**: "Start your project"
3. **Sign in**: with GitHub or Google
4. **Create new project**:
   - Organization: Your name
   - Project name: `electronics-store`
   - Database password: Create strong password
   - Region: Choose nearest to you

### Step 2: Get Your Credentials
1. **Go to**: Project Settings → API
2. **Copy**:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Configure Google OAuth
1. **Go to**: Authentication → Providers
2. **Enable Google provider**
3. **Get Google OAuth credentials**:
   - Go to: https://console.cloud.google.com
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
4. **Enter Google credentials** in Supabase

### Step 4: Update Environment Variables
```env
# Replace with your actual Supabase credentials
REACT_APP_SUPABASE_URL=https://your-actual-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-actual-anon-key
```

## 🔧 Temporary Fix: Use Mock Authentication

If you want to test without Supabase setup, I can create a mock auth system.

## 🚨 Important Notes

- The current URL `ztyqhqbskrcjjbidkogx.supabase.co` is invalid
- You need a real Supabase project URL
- Google OAuth requires proper setup in both Google Console and Supabase
- The anon key must match your actual project

## ✅ Test Your Setup

After creating Supabase project:
1. Update .env with real credentials
2. Restart your frontend
3. Try Google signup
4. Check browser console for errors

## 🛟 Common Issues

- **Invalid URL**: Supabase project doesn't exist
- **Wrong key**: Anon key doesn't match project
- **OAuth not configured**: Google provider not enabled
- **Redirect URI mismatch**: Check Google Console settings

---

## 🎯 Quick Solution

### Option 1: Create Real Supabase (Recommended)
1. Go to https://supabase.com
2. Create new project
3. Enable Google auth
4. Update .env file

### Option 2: Use Email/Password Only
1. Disable Google auth temporarily
2. Use traditional signup
3. Add Google auth later

### Option 3: Mock Authentication
1. I can create a temporary mock system
2. Test functionality without real auth
3. Replace with real auth later

Which option would you prefer?
