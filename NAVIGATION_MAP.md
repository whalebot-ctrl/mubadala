# Complete Navigation Map - Mubadala Investments

## Site Structure

```
mubadala-investments.com
│
├── PUBLIC PAGES
│   ├── Landing Page (/)
│   │   ├── Header Navigation
│   │   │   ├── Features → /features
│   │   │   ├── About → /about
│   │   │   └── Contact → /contact
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   └── Footer
│   │       ├── Product
│   │       │   ├── Features → /features
│   │       │   ├── FAQ → /faq
│   │       │   └── KYC Guide → /kyc-help
│   │       ├── Company
│   │       │   ├── About → /about
│   │       │   ├── Contact → /contact
│   │       │   └── Features → /features
│   │       └── Legal
│   │           ├── Privacy → /privacy
│   │           ├── Terms → /terms
│   │           └── Contact → /contact
│   │
│   ├── Features Page (/features)
│   │   ├── Back to Home
│   │   ├── Feature Cards
│   │   ├── Advanced Features
│   │   └── CTA: Create Account
│   │
│   ├── About Page (/about)
│   │   ├── Back to Home
│   │   ├── Company Overview
│   │   ├── Core Values (4 cards)
│   │   └── CTA: Get Started
│   │
│   ├── Contact Page (/contact)
│   │   ├── Back to Home
│   │   ├── Contact Information
│   │   ├── Contact Form
│   │   └── Support Links
│   │
│   ├── FAQ Page (/faq)
│   │   ├── Back to Home
│   │   ├── 10 Expandable Q&As
│   │   └── Contact Support CTA
│   │
│   ├── KYC Help Page (/kyc-help)
│   │   ├── Back to Home
│   │   ├── What is KYC
│   │   ├── 5-Step Process
│   │   ├── Required Documents
│   │   ├── Document Photo Tips
│   │   └── Common Rejection Reasons
│   │
│   ├── Privacy Policy (/privacy)
│   │   ├── Back to Home
│   │   ├── 6 Policy Sections
│   │   └── Contact Information
│   │
│   └── Terms of Service (/terms)
│       ├── Back to Home
│       ├── 9 Terms Sections
│       └── Governing Law Info
│
├── AUTHENTICATION PAGES
│   ├── Sign In Page (/signin)
│   │   ├── Email Input
│   │   ├── Password Input (with show/hide)
│   │   ├── Sign In Button
│   │   ├── Error Messages
│   │   ├── Success State
│   │   └── Sign Up Link
│   │
│   └── Sign Up Page (/signup)
│       ├── Full Name Input
│       ├── Email Input
│       ├── Phone Number Input
│       ├── Country Selector
│       ├── Password Input (with show/hide)
│       ├── Confirm Password Input (with show/hide)
│       ├── Sign Up Button
│       ├── Error Messages
│       ├── Success State
│       └── Sign In Link
│
├── INVESTOR DASHBOARD (Protected)
│   ├── Dashboard Main (/dashboard)
│   │   ├── Header
│   │   │   ├── Mubadala Logo
│   │   │   ├── User Name
│   │   │   ├── Portfolio Value (Toggle Show/Hide)
│   │   │   ├── Mobile Menu Toggle
│   │   │   └── Logout Button
│   │   ├── Navigation Sidebar
│   │   │   ├── Dashboard → /dashboard
│   │   │   ├── Markets → /dashboard/markets
│   │   │   ├── Deposit Guide → /dashboard/deposit-guide
│   │   │   └── KYC Status
│   │   ├── Portfolio Overview Card
│   │   │   └── Shows $0.00 for new users
│   │   ├── Portfolio Chart
│   │   ├── Holdings Table
│   │   ├── Action Buttons
│   │   │   ├── Deposit Button
│   │   │   └── Withdraw Button
│   │   └── Recent Activity Section
│   │
│   ├── Markets Page (/dashboard/markets)
│   │   ├── Back Button
│   │   ├── Cryptocurrency Section
│   │   │   ├── Bitcoin Chart
│   │   │   ├── Ethereum Chart
│   │   │   ├── Other Cryptos
│   │   │   └── Price Updates
│   │   ├── Stock Market Section
│   │   │   ├── Market Indices
│   │   │   ├── Popular Stocks
│   │   │   └── Charts & Data
│   │   └── Watchlist Option
│   │
│   ├── Deposit Guide (/dashboard/deposit-guide)
│   │   ├── Back Button
│   │   ├── Quick Overview (3 cards)
│   │   ├── Supported Cryptocurrencies
│   │   │   ├── Bitcoin Section
│   │   │   │   ├── Wallet Address
│   │   │   │   ├── Copy Button
│   │   │   │   └── Fee Information
│   │   │   └── USDT Section
│   │   │       ├── Wallet Address
│   │   │       ├── Copy Button
│   │   │       └── Fee Information
│   │   ├── How to Deposit (5 steps)
│   │   ├── Important Notes
│   │   └── Back to Dashboard Link
│   │
│   └── KYC Verification (/kyc-verification)
│       ├── KYC Status Display
│       ├── Pending/Approved/Rejected Status
│       ├── Upload Section (if pending)
│       ├── Information Form
│       └── Submit Button
│
├── ADMIN DASHBOARD (Protected - Admin Only)
│   └── Admin Dashboard (/admin/dashboard)
│       ├── Header with Admin Indicator
│       ├── Navigation
│       │   ├── Dashboard
│       │   ├── Users
│       │   ├── KYC Requests
│       │   └── Transactions
│       ├── Create User Section
│       │   ├── Email Input
│       │   ├── Generated Password Display
│       │   ├── Copy Password Button
│       │   └── Create Button
│       ├── Pending KYC Approvals
│       │   ├── User List
│       │   ├── View Documents
│       │   ├── Approve/Reject Buttons
│       │   └── Notes Field
│       ├── User Management
│       │   ├── User List Table
│       │   ├── Filter/Search
│       │   ├── Edit User Button
│       │   └── Suspend/Activate
│       ├── Transaction History
│       │   ├── Filter by Type
│       │   ├── Filter by Status
│       │   └── Export Option
│       └── Settings Link
│
└── OTHER PAGES
    ├── 404 Page
    ├── Error Page
    └── Loading Fallback
```

## Navigation Flows

### User Signup Flow
1. Landing Page (/) → "Get Started"
2. → Sign Up Page (/signup)
3. → Fill form with all details
4. → Click "Sign Up"
5. → Success state shows
6. → Auto redirect to Dashboard (/dashboard)
7. → Dashboard loads with $0.00 balance

### User Signin Flow
1. Landing Page (/) → "Sign In"
2. → Sign In Page (/signin)
3. → Enter email & password
4. → Click "Sign In"
5. → Redirect to Dashboard (/dashboard) OR Admin Dashboard (/admin/dashboard)

### Investor Portfolio Management Flow
1. Dashboard (/dashboard)
2. → "View Markets" → Markets (/dashboard/markets)
3. → "Deposit" → Deposit Guide (/dashboard/deposit-guide)
4. → Copy wallet address
5. → Send crypto to address
6. → Back to Dashboard to see portfolio
7. → "Withdraw" → Enter amount & address
8. → Confirm withdrawal

### Admin User Creation Flow
1. Admin Dashboard (/admin/dashboard)
2. → Fill "Create User" form
3. → System generates secure password
4. → Copy password and share with user
5. → New user can sign in with email & password
6. → User taken to dashboard

### Admin KYC Approval Flow
1. Admin Dashboard (/admin/dashboard)
2. → "Pending KYC" section
3. → View user documents
4. → Review information
5. → Approve or Reject
6. → User notified of decision
7. → Approved users can deposit

### Customer Learning Flow
1. Landing Page (/) 
2. → Footer: "Features" → /features
3. → Footer: "FAQ" → /faq
4. → Footer: "KYC Guide" → /kyc-help
5. → Footer: "About" → /about
6. → Footer: "Contact" → /contact
7. → Footer: "Privacy" → /privacy
8. → Footer: "Terms" → /terms

## Button Actions Summary

| Button | Location | Action |
|--------|----------|--------|
| Get Started | Hero, Nav, CTA | → /signup |
| Sign In | Nav | → /signin |
| Sign Up | Form footer | → /signup |
| Learn More | Hero | → /features |
| Deposit | Dashboard | Modal opens |
| Withdraw | Dashboard | Modal opens |
| View Markets | Dashboard | → /markets |
| Deposit Guide | Dashboard | → /deposit-guide |
| KYC Status | Dashboard | → /kyc-verification |
| Logout | Dashboard | Logout & → /signin |
| Create User | Admin | Create new account |
| Approve KYC | Admin | Approve request |
| Reject KYC | Admin | Reject request |
| Back | All pages | Go to previous |
| Copy Address | Deposit Guide | Copy to clipboard |

## Mobile Navigation

- All pages are fully responsive
- Mobile menu toggle on small screens
- Touch-friendly button sizes
- Readable text on mobile devices
- Proper spacing and padding for touch targets
- Smooth transitions and animations

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Color contrast meets WCAG standards
- Keyboard navigation support
- Focus indicators on interactive elements
- Screen reader compatible

---

**Total Pages: 18**
- Public Pages: 7
- Auth Pages: 2
- Investor Dashboard: 4
- Admin Dashboard: 1
- Layout Components: Multiple

**All pages linked and functional with proper navigation structure.**
