# Mubadala Investments - Quick Start Guide

Get the platform running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

## Step 1: Install Dependencies
```bash
pnpm install
```

## Step 2: Start Development Server
```bash
pnpm dev
```

The platform will be available at **http://localhost:3000**

## Step 3: Access the Platform

### Option A: Login as Admin
1. Go to http://localhost:3000/signin
2. Enter credentials:
   - Email: `admin@mubadala.com`
   - Password: `Admin@123456`
3. Click Sign In
4. You're now in the admin dashboard at `/admin/dashboard`

### Option B: Create a New Investor Account
1. Go to http://localhost:3000/signup
2. Fill in the registration form:
   - Full Name: John Investor
   - Email: investor@example.com
   - Password: Demo@12345 (min 8 chars)
   - Phone: +1-555-123-4567
   - Country: United States
3. Click Create Account
4. You'll see the investor dashboard
5. Your initial balance will be **$0.00**

## Admin Actions

### Create a New User Account
1. Login as admin
2. Click **Create User** button
3. Fill in the form:
   - Full Name: [Your name]
   - Email: [unique email]
   - Password: [8+ characters]
   - Phone: [phone number]
   - Country: [country]
   - Role: investor (or admin)
4. Click **Create User**
5. The system will display the credentials
6. New user account is created and KYC is auto-approved

### View All Users
- Admin dashboard shows all created users in a table
- See user details: Name, Email, Role, KYC Status, Balance

## User Dashboard

### New User Features
- **Account Balance**: Starts at $0.00
- **Portfolio Value**: 0 until user deposits funds
- **KYC Status**: Check approval status
- **Quick Actions**: 
  - "Deposit Now" → Opens deposit instructions
  - "View Guide" → Detailed deposit guide

### Deposit Process
1. Click "Deposit Now" or go to `/dashboard/deposit-guide`
2. Choose cryptocurrency (BTC or USDT)
3. Copy wallet address:
   - BTC: `1A1z7agoat2onSJFUQBogY4LMiQvZiEjQJ`
   - USDT: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
4. Send crypto from your wallet
5. Wait for confirmation (5-30 mins)
6. Balance updates automatically

## Project Structure

```
mubadala-investments/
├── app/
│   ├── page.tsx              # Landing page
│   ├── signup/               # Signup page
│   ├── signin/               # Signin page
│   ├── dashboard/            # User dashboard
│   │   ├── page.tsx         # Main dashboard
│   │   └── deposit-guide/   # Deposit instructions
│   ├── admin/
│   │   └── dashboard/       # Admin panel
│   └── api/auth/            # Auth APIs
├── components/              # React components
├── lib/
│   ├── auth.ts             # Authentication logic
│   └── supabase.ts         # Backend client
└── public/                 # Static assets
```

## Key File Locations

### Authentication
- **Auth Logic**: `lib/auth.ts`
- **Signup API**: `app/api/auth/signup/route.ts`
- **Signin API**: `app/api/auth/signin/route.ts`
- **Admin User Creation**: `app/api/admin/create-user/route.ts`

### Pages
- **Landing Page**: `app/page.tsx`
- **User Signup**: `app/signup/page.tsx`
- **User Signin**: `app/signin/page.tsx`
- **User Dashboard**: `app/dashboard/page.tsx`
- **Admin Dashboard**: `app/admin/dashboard/page.tsx`
- **Deposit Guide**: `app/dashboard/deposit-guide/page.tsx`

### Styling
- **Color Theme**: `app/globals.css`
- **Design System**: Uses shadcn/ui + Tailwind CSS

## Common Tasks

### Change Admin Password
Edit `lib/auth.ts`, find `initializeAdminUser()` function:
```typescript
createUser({
  email: 'admin@mubadala.com',
  password: 'NewPassword123', // Change this
  ...
})
```

### Add More Cryptocurrencies
Edit `app/dashboard/deposit-guide/page.tsx`:
```typescript
// Add new cryptocurrency card with address and details
```

### Customize Colors
Edit `app/globals.css`:
```css
--primary: oklch(0.52 0.167 188);  /* Turquoise Blue */
--secondary: oklch(0.48 0.15 190); /* Lighter Turquoise */
```

### Change Company Name
1. Update `app/layout.tsx` metadata
2. Update page headers and navigation
3. Search for "Mubadala" in codebase and update

## Available Routes

### Public Routes
- `/` - Landing page
- `/signup` - Create account
- `/signin` - Login

### Protected Routes (Login Required)
- `/dashboard` - User dashboard
- `/dashboard/markets` - Market overview
- `/dashboard/deposit-guide` - Deposit instructions

### Admin Routes (Admin Only)
- `/admin/dashboard` - User management & creation

## Troubleshooting

### "Port 3000 already in use"
Use a different port:
```bash
pnpm dev -- -p 3001
```

### "Module not found" errors
Reinstall dependencies:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Session not persisting
Clear browser cookies for localhost and login again

### Users not appearing in admin panel
Users are stored in-memory. Data is lost on server restart. For persistence:
1. Set up PostgreSQL database
2. Update `lib/auth.ts` to use database
3. Restart server

## Next Steps

1. **Customize Branding**
   - Update company name, logo, colors
   - Modify landing page content

2. **Add Real Database**
   - Set up PostgreSQL or Supabase
   - Update auth.ts to use real database

3. **Enable Real Deposits**
   - Integrate blockchain APIs
   - Set up wallet management

4. **Send Emails**
   - Add SendGrid or similar
   - Send confirmation emails

5. **Deploy**
   - Deploy to Vercel: `vercel deploy`
   - Or use Docker for self-hosting

## Support

For detailed documentation, see:
- `README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - Architecture details

## Production Checklist

Before deploying to production:

- [ ] Set up real database
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set up email service
- [ ] Configure blockchain integration
- [ ] Add rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Security audit completed
- [ ] Load testing performed
- [ ] Backup strategy in place

## Quick Demo Flow

1. **Start Server**
   ```bash
   pnpm dev
   ```

2. **Visit Homepage**
   - http://localhost:3000

3. **Create Test Account**
   - Go to /signup
   - Fill form with test data
   - See dashboard with $0.00 balance

4. **Login as Admin**
   - Go to /signin
   - Use: admin@mubadala.com / Admin@123456
   - Create more test users

5. **Test Deposit**
   - Go to /dashboard/deposit-guide
   - See Bitcoin and USDT wallet addresses
   - Copy addresses with click-to-copy buttons

That's it! You now have a fully functional investment platform running locally!
