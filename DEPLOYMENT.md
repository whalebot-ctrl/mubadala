# Deployment Guide - InvestHub

Complete guide for deploying InvestHub to production on Vercel.

## Pre-Deployment Checklist

### Code Quality
- [ ] All features tested locally
- [ ] No console errors in browser DevTools
- [ ] No unused imports or variables
- [ ] TypeScript compiles without errors
- [ ] All components have proper PropTypes
- [ ] Error handling implemented for API calls

### Environment & Security
- [ ] `.env.example` file created and up to date
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in code or comments
- [ ] API keys stored in environment variables only
- [ ] Password hashing configured (if using custom auth)
- [ ] CORS properly configured

### Database
- [ ] Supabase project created and tested
- [ ] All migrations applied successfully
- [ ] Row Level Security (RLS) policies enabled
- [ ] Database backups configured
- [ ] Indexes created for frequently queried fields
- [ ] Connection pooling configured

### Testing
- [ ] Signup/signin flow works end-to-end
- [ ] Dashboard loads and displays data
- [ ] Deposit/withdrawal modals function
- [ ] Admin dashboard accessible
- [ ] Market data API calls working
- [ ] Responsive design tested on mobile
- [ ] Performance tested with Lighthouse

### UI/UX
- [ ] All pages load without layout shifts
- [ ] Images optimized (use `next/image`)
- [ ] Loading states implemented
- [ ] Error messages are helpful
- [ ] Form validation works
- [ ] Accessibility standards met (WCAG 2.1)

## Step 1: Prepare for Deployment

### Update Package
```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies (optional)
pnpm update

# Build locally to catch errors
pnpm build
```

### Create Production Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new production project
3. Name it: `investhub-production`
4. Wait for project initialization
5. Run migrations: Copy `scripts/01_create_tables.sql` to SQL Editor
6. Note the project URL and keys

### Prepare Environment Variables
Collect all required variables:
```
NEXT_PUBLIC_SUPABASE_URL=        # Production Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Production Anon Key
ALPHA_VANTAGE_API_KEY=           # Stock data (optional)
```

## Step 2: Deploy to Vercel

### Option A: Using Git (Recommended)

#### 1. Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: InvestHub investment platform"
git branch -M main
git remote add origin https://github.com/your-username/investhub.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" framework (auto-detected)
5. Click "Deploy"

#### 3. Add Environment Variables
1. In Vercel, go to Settings → Environment Variables
2. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your production Supabase URL
   - Click "Add"
3. Repeat for each variable
4. **Important**: Variables starting with `NEXT_PUBLIC_` are public (safe to expose)

### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to connect account and deploy
```

### Option C: Deploy from GitHub (Simplest)
1. Go to Vercel
2. Click "New Project"
3. Connect GitHub account
4. Select repository
5. Vercel auto-deploys on every push to main

## Step 3: Post-Deployment Verification

### Check Build
- [ ] Deployment shows "Ready"
- [ ] All build logs show no errors
- [ ] Functions working correctly

### Test Live Site
1. Visit the Vercel deployment URL
2. Test signup flow
3. Verify Supabase connection works
4. Check market data loads
5. Verify database operations

### Performance Check
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Monitor initial page load
4. Test on slow 4G connection

## Step 4: Configure Production

### Custom Domain
1. In Vercel, go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps
4. Wait for SSL certificate (automatic)
5. Update Supabase CORS if needed

### Update Supabase Settings
1. Go to Supabase Project Settings
2. Update "App URL" to your domain
3. Add CORS origin to allowed list
4. Update password reset URLs if applicable

### Set Up Monitoring
1. Enable Vercel Analytics
2. Set up error tracking (Sentry, etc.)
3. Configure uptime monitoring
4. Set up log aggregation

## Step 5: Configure Features

### Email Notifications (Optional)
1. Choose email service (SendGrid, Mailgun, etc.)
2. Get API credentials
3. Add to environment variables
4. Update email templates in code

### Blockchain Integration (Optional)
1. Choose blockchain provider (Infura, Alchemy, etc.)
2. Get API key
3. Add to environment variables
4. Implement wallet integration

### Analytics (Optional)
1. Set up Vercel Analytics
2. Configure Google Analytics
3. Set up product metrics tracking
4. Create dashboards

## Step 6: Security Hardening

### Headers & CSP
Configure `next.config.mjs`:
```javascript
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]
```

### SSL/TLS
- [x] Automatic SSL via Vercel
- [ ] Set HSTS headers
- [ ] Force HTTPS redirects

### Database Security
- [x] Row Level Security enabled
- [ ] Regular backups enabled
- [ ] IP whitelist configured
- [ ] Backup retention set

### Authentication
- [ ] Email verification required
- [ ] Password reset secure
- [ ] Session expiry configured
- [ ] Rate limiting enabled

## Step 7: Monitoring & Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor database performance
- [ ] Review failed deployments

### Weekly
- [ ] Review analytics
- [ ] Check uptime status
- [ ] Update dependencies
- [ ] Run security audit

### Monthly
- [ ] Review database size
- [ ] Audit user access
- [ ] Update documentation
- [ ] Plan upcoming features

## Troubleshooting Deployment

### Build Fails
```bash
# Check build locally first
pnpm build

# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Import path issues
```

### Database Connection Fails
- Verify SUPABASE_URL is correct
- Check SUPABASE_ANON_KEY matches project
- Ensure migrations ran successfully
- Verify RLS policies allow queries

### Pages Return 404
- Check file paths are correct
- Verify routes exist
- Check `next.config.js` rewrites
- Rebuild and redeploy

### Performance Issues
- Optimize images with `next/image`
- Enable caching headers
- Use CDN for static assets
- Optimize database queries
- Implement pagination

## Scaling Considerations

### High Traffic
- Use Vercel Pro for additional concurrency
- Enable database connection pooling
- Implement caching strategies
- Set up CDN for static assets
- Consider database replicas

### Data Growth
- Monitor database size
- Implement data archiving
- Optimize queries and indexes
- Set up automated backups
- Plan database scaling

## Post-Launch

### User Support
- [ ] Set up email support
- [ ] Create help documentation
- [ ] Set up feedback form
- [ ] Monitor user issues

### Feature Development
- [ ] Plan next features
- [ ] Set up feature flags
- [ ] Plan API expansions
- [ ] Schedule maintenance windows

### Analytics & Insights
- [ ] Track user growth
- [ ] Monitor feature usage
- [ ] Analyze user behavior
- [ ] Plan improvements

## Production URLs

Keep these saved:
- Production App: `https://your-domain.com`
- Vercel Dashboard: `https://vercel.com/dashboard`
- Supabase Dashboard: `https://app.supabase.com`
- GitHub Repository: `https://github.com/your-username/investhub`

## Emergency Procedures

### Immediate Rollback
```bash
# If deployment breaks production
# Go to Vercel Dashboard → Deployments
# Click previous working deployment
# Click "Redeploy"
```

### Database Issues
1. Check Supabase status page
2. Review recent migrations
3. Check error logs in Supabase
4. Restore from backup if necessary

### Security Issues
1. Check CloudFlare/CDN logs
2. Review failed login attempts
3. Check database for suspicious queries
4. Rotate API keys if compromised

## Deployment Checklist (Final)

- [ ] Build passes locally
- [ ] All tests pass
- [ ] Environment variables set in Vercel
- [ ] Domain configured
- [ ] SSL certificate working
- [ ] Database connected
- [ ] Admin can verify
- [ ] Users can sign up
- [ ] Market data loads
- [ ] Deposit modal works
- [ ] No console errors
- [ ] Lighthouse score > 80
- [ ] Mobile responsive
- [ ] All links work
- [ ] Analytics configured
- [ ] Backup plan created
- [ ] Team notified
- [ ] Documentation updated

## Going Live

Once all checks pass:
1. Announce launch
2. Monitor closely first 24 hours
3. Respond to user feedback
4. Fix critical issues immediately
5. Plan next features based on feedback

## Success!

Your InvestHub platform is now live! 🚀

Monitor regularly and continue improving based on user feedback and analytics.

---

**Need Help?**
- Vercel Support: https://vercel.com/help
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
