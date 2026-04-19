# Quick Start Guide - InvestHub

Get your InvestHub investment platform up and running in minutes!

## 5-Minute Setup

### Step 1: Clone or Download the Project
```bash
git clone <repository-url>
cd investhub
pnpm install
```

### Step 2: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Wait for project to initialize (2-3 minutes)
4. Go to Settings → API
5. Copy `Project URL` and `anon public key`

### Step 3: Set Environment Variables
Create `.env.local` file in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Create Database
1. In Supabase, go to SQL Editor
2. Create new query
3. Copy entire contents of `scripts/01_create_tables.sql`
4. Paste and run the query
5. Wait for tables to be created

### Step 5: Run Locally
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Test the Platform

### 1. Create Account
- Go to `/signup`
- Fill in all KYC details
- Use test email: `test@example.com`
- Password: `TestPassword123!`

### 2. Sign In
- Go to `/signin`
- Use same email and password
- You'll redirect to `/kyc-verification`

### 3. View Dashboard
- Go to `/dashboard`
- See mock portfolio data
- Try deposit and withdrawal modals

### 4. Browse Markets
- Go to `/dashboard/markets`
- View real crypto prices (CoinGecko)
- Mock stock data available
- Click assets to see detailed charts

### 5. Admin Panel
- Go to `/admin/dashboard`
- See pending KYC and withdrawals
- Try approving KYC submissions

## Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| Sign Up | `/signup` | Create account |
| Sign In | `/signin` | Login |
| Dashboard | `/dashboard` | User portfolio |
| Markets | `/dashboard/markets` | Asset browsing |
| Deposit Guide | `/dashboard/deposit-guide` | How to deposit |
| KYC Status | `/kyc-verification` | Verification status |
| Admin | `/admin/dashboard` | Admin controls |

## Important Notes

### Using Demo Data
- All pages show mock data by default
- Market data uses real CoinGecko API (free, no key needed)
- Stock prices use mock data (add API key to use real prices)
- Portfolio data is hardcoded for demonstration

### Using Real Supabase
- Authentication works immediately
- Add real wallet addresses in deposit modal
- Real KYC status will be 'pending' until approved
- Withdrawal requests will show in admin dashboard

### No Real Transactions
- This is a demo - no real money transfers
- Add blockchain integration for real deposits
- Add payment processor for real withdrawals

## Next Steps

### Option 1: Test & Explore (5 mins)
```bash
pnpm dev
# Visit all pages and test features
```

### Option 2: Customize Branding (15 mins)
- Update app name in layout.tsx
- Change colors in Tailwind config
- Update logo and favicon in public/
- Modify copy text throughout

### Option 3: Add Real Features (1-2 hours)
- Connect real crypto wallets
- Add blockchain transaction monitoring
- Integrate payment processor
- Set up email notifications

### Option 4: Deploy to Production (30 mins)
- Connect GitHub to Vercel
- Add environment variables
- Deploy with one click
- Configure custom domain

## Troubleshooting

### "Connection Refused"
- Check Supabase URL and key are correct
- Verify `.env.local` file exists
- Make sure Supabase project is active
- Restart dev server: `pnpm dev`

### "Tables Don't Exist"
- SQL migration not run
- Go to Supabase → SQL Editor
- Paste and run `scripts/01_create_tables.sql`
- Refresh page after running

### "Auth Not Working"
- Clear browser cookies
- Check email is confirmed in Supabase Auth
- Verify auth settings in Supabase
- Check browser console for errors

### "Market Data Not Showing"
- CoinGecko should work (free, no auth)
- Stock data uses mock data by default
- To use real stock data, add Alpha Vantage key
- Check browser console for API errors

## Development Tips

### Hot Reload
Changes auto-reload - just save files!

### Debug Mode
Open browser DevTools (F12) to see logs

### Database Changes
Edit `scripts/01_create_tables.sql` and re-run in Supabase

### Component Development
Add new components in `/components/` directory

### Styling
Use Tailwind classes - no CSS files needed

## File Locations to Customize

```
Key Files to Modify:
├── app/page.tsx          # Landing page content
├── components/           # All UI components
├── app/layout.tsx        # Global settings
├── tailwind.config.ts    # Colors and theme
└── public/              # Images and favicon
```

## API Endpoints (if needed)

```
POST /api/auth/signup    # Create account
POST /api/auth/signin    # Login
```

Both require JSON body with user credentials and KYC info.

## Learn More

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **Recharts**: https://recharts.org
- **shadcn/ui**: https://ui.shadcn.com

## Getting Help

1. Check README.md for detailed docs
2. See PROJECT_SUMMARY.md for architecture
3. Review code comments in files
4. Check browser console for errors
5. Verify .env variables are set

## Ready to Go!

Your investment platform is ready to use. Start with `pnpm dev` and explore! 🚀
