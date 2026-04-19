-- Create profiles table (extended user data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  country TEXT NOT NULL,
  phone_number TEXT,
  date_of_birth DATE NOT NULL,
  id_document_type TEXT NOT NULL, -- passport, driver_license, national_id
  id_document_number TEXT NOT NULL UNIQUE,
  kyc_status TEXT DEFAULT 'pending', -- pending, approved, rejected
  kyc_approval_date TIMESTAMP,
  kyc_verified_by UUID REFERENCES auth.users(id),
  account_type TEXT DEFAULT 'investor', -- investor, admin
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create wallets table (user crypto deposit addresses)
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cryptocurrency TEXT NOT NULL, -- BTC, USDT
  wallet_address TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, cryptocurrency)
);

-- Create deposits table
CREATE TABLE IF NOT EXISTS deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cryptocurrency TEXT NOT NULL, -- BTC, USDT
  amount DECIMAL(20, 8) NOT NULL,
  usd_value DECIMAL(20, 2) NOT NULL,
  transaction_hash TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, failed
  confirmations INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL, -- AAPL, BTC, ETH, etc
  asset_type TEXT NOT NULL, -- stock, crypto
  quantity DECIMAL(20, 8) NOT NULL,
  buy_price DECIMAL(20, 2) NOT NULL,
  current_price DECIMAL(20, 2) NOT NULL,
  invested_amount DECIMAL(20, 2) NOT NULL,
  current_value DECIMAL(20, 2) NOT NULL,
  gain_loss DECIMAL(20, 2) GENERATED ALWAYS AS (current_value - invested_amount) STORED,
  gain_loss_percentage DECIMAL(10, 2) GENERATED ALWAYS AS (((current_value - invested_amount) / invested_amount) * 100) STORED,
  purchased_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cryptocurrency TEXT NOT NULL, -- BTC, USDT
  amount DECIMAL(20, 8) NOT NULL,
  usd_value DECIMAL(20, 2) NOT NULL,
  withdrawal_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  requested_at TIMESTAMP DEFAULT NOW(),
  processing_at TIMESTAMP,
  completed_at TIMESTAMP,
  transaction_hash TEXT,
  notes TEXT
);

-- Create transactions table (audit log)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- deposit, withdrawal, investment, sell
  asset TEXT,
  amount DECIMAL(20, 8),
  usd_value DECIMAL(20, 2),
  status TEXT DEFAULT 'completed',
  description TEXT,
  reference_id UUID, -- links to deposits, withdrawals, investments
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_profiles_kyc_status ON profiles(kyc_status);
CREATE INDEX idx_profiles_account_type ON profiles(account_type);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_deposits_user_id ON deposits(user_id);
CREATE INDEX idx_deposits_status ON deposits(status);
CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_investments_symbol ON investments(symbol);
CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

-- RLS Policies for wallets
CREATE POLICY "Users can view own wallets"
  ON wallets FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own wallets"
  ON wallets FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for deposits
CREATE POLICY "Users can view own deposits"
  ON deposits FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all deposits"
  ON deposits FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

-- RLS Policies for investments
CREATE POLICY "Users can view own investments"
  ON investments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own investments"
  ON investments FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own investments"
  ON investments FOR UPDATE
  USING (user_id = auth.uid());

-- RLS Policies for withdrawals
CREATE POLICY "Users can view own withdrawals"
  ON withdrawals FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create withdrawal requests"
  ON withdrawals FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all withdrawals"
  ON withdrawals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

CREATE POLICY "Admins can update withdrawal status"
  ON withdrawals FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());
