# Mubadala Investments - Professional Investment Platform

A modern, professional investment platform for trading stocks and cryptocurrencies with real-time market data, user authentication, and portfolio management.

## Features

### User Features
- **Professional Authentication** - Secure signup and signin with password hashing
- **KYC Verification** - User profiles with verification status tracking
- **Portfolio Dashboard** - Real-time portfolio overview with zero initial balance for new users
- **Market Data Integration** - Live stock and crypto prices from CoinGecko and Alpha Vantage
- **Crypto Deposits** - Support for BTC and USDT deposits with unique wallet addresses
- **Withdrawal System** - 24-hour withdrawal processing with custom wallet addresses
- **Responsive Design** - Beautiful UI optimized for mobile and desktop with turquoise/white color scheme

### Admin Features
- **User Management** - Create new investor and admin accounts with login credentials
- **KYC Approval** - Review and approve/reject user KYC submissions
- **Admin Dashboard** - Monitor all users, transactions, and system activity
- **User Account Creation** - Admin panel to generate user accounts with passwords

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js (custom backend, no Supabase required)
- **Authentication**: Custom JWT-based session management
- **Database**: In-memory with localStorage (ready for database integration)
- **Market Data**: CoinGecko API, Alpha Vantage API
- **Charts**: Recharts for beautiful financial visualizations

## Color Scheme

- **Primary**: Turquoise Blue (#3ECCC8)
- **Secondary**: Light Gray/Off-white
- **Background**: Pure White
- **Accents**: Various shades of turquoise for consistency

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mubadala-investments
```

2. Install dependencies
```bash
pnpm install
```

3. Create environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

### Admin Account (Pre-created)
- **Email**: admin@mubadala.com
- **Password**: Admin@123456
- **Role**: Admin
- **Access**: Admin dashboard at `/admin/dashboard`

### Creating Test Accounts
1. Go to `/admin/dashboard`
2. Sign in with admin credentials
3. Click "Create User" button
4. Fill in user details and set a password
5. New users will have:
   - KYC Status: Auto-approved
   - Account Balance: $0.00
   - Full access to investor dashboard

## Project Structure

```
mubadala-investments/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── signup/                  # Signup page
│   ├── signin/                  # Signin page
│   ├── dashboard/               # User dashboard
│   │   ├── page.tsx            # Main dashboard
│   │   ├── markets/            # Market overview
│   │   └── deposit-guide/      # Deposit instructions
│   ├── admin/
│   │   └── dashboard/          # Admin panel
│   ├── api/
│   │   └── auth/               # Authentication APIs
│   └── layout.tsx              # Root layout
├── components/
│   ├── auth/                   # Auth forms
│   ├── dashboard/              # Dashboard components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── auth.ts                 # Auth logic & session management
│   ├── supabase.ts             # Backend API client
│   └── market-data.ts          # Market data utilities
└── public/                     # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/logout` - Sign out user
- `GET /api/auth/me` - Get current user session

### Admin
- `POST /api/admin/create-user` - Create new user (admin only)
- `GET /api/admin/kyc` - Get pending KYC users (admin only)
- `PATCH /api/admin/kyc` - Approve/reject KYC (admin only)

## User Flow

### New Investor
1. Visit landing page at `/`
2. Click "Get Started" or "Sign Up"
3. Fill signup form with personal details
4. Account created with KYC status: "Pending"
5. Account balance starts at $0.00
6. Redirect to dashboard
7. View deposit guide at `/dashboard/deposit-guide`
8. Wait for admin KYC approval
9. Once approved, can deposit BTC or USDT

### Admin
1. Sign in with admin@mubadala.com / Admin@123456
2. Access admin dashboard at `/admin/dashboard`
3. Create new user accounts with preset passwords
4. Review pending KYC submissions
5. Approve or reject accounts
6. Monitor user balances and transactions

## Deposit Addresses

**Note**: These are demo addresses. In production, generate unique addresses per user.

### Bitcoin (BTC)
Address: `1A1z7agoat2onSJFUQBogY4LMiQvZiEjQJ`
Network: Bitcoin Mainnet

### Tether (USDT)
Address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
Network: Ethereum (ERC-20)

## Session Management

- Sessions are stored as HTTP-only cookies
- Expiry: 7 days from login
- Automatic session validation on protected routes
- Session data stored in-memory (uses localStorage for demo)

## Key Features Details

### Zero Balance for New Users
- All new user accounts start with $0.00
- Users must deposit funds to begin trading
- Portfolio value calculated from holdings
- Returns calculated from entry price vs current price

### Admin User Creation
- Admins can create user accounts directly
- Each user gets unique email and password
- Auto-approved KYC for admin-created users
- Users can immediately access dashboard

### Professional UI/UX
- Clean, institutional design
- Turquoise/white color scheme throughout
- Responsive design for all devices
- Smooth transitions and hover effects
- Proper error and success messaging

## Future Enhancements

1. **Real Database Integration**
   - Replace in-memory storage with PostgreSQL
   - Add Supabase or Neon for production

2. **Blockchain Integration**
   - Real Bitcoin and USDT deposit processing
   - Automated wallet generation per user
   - Transaction verification on blockchain

3. **Trading Engine**
   - Real-time order execution
   - Order history and analytics
   - Advanced charting tools

4. **Email Notifications**
   - Deposit confirmations
   - KYC approval/rejection
   - Withdrawal notifications
   - Transaction alerts

5. **Enhanced Security**
   - Two-factor authentication
   - IP whitelisting
   - Withdrawal address whitelisting
   - Audit logs

## Production Deployment

### Before Going Live
1. Set up actual database (PostgreSQL recommended)
2. Configure real blockchain wallet integration
3. Set environment variables for production
4. Enable HTTPS
5. Set up proper email service
6. Implement rate limiting
7. Add comprehensive logging
8. Security audit and testing

### Environment Variables Required
```
NEXT_PUBLIC_API_URL=https://yourdomain.com
DATABASE_URL=postgresql://...
ENCRYPTION_KEY=...
SESSION_SECRET=...
```

## Support & Documentation

For more information about Mubadala Investment Company, visit:
- Official Website: [mubadala.com](https://www.mubadala.com)
- Assets Under Management: $330 Billion+
- Active in 50+ Countries

## License

This project is confidential and proprietary to Mubadala Investment Company.

## Contact

For support and inquiries, contact the development team.
# mubadala
