// Node.js Backend Client for Mubadala Investments
// Custom backend API client (replaces Supabase)

class MubadalaClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? '' : ''
  }

  async signUp(email: string, password: string, userData: {
    fullName: string
    phoneNumber: string
    country: string
  }) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        confirmPassword: password,
        ...userData,
      }),
    })
    return response.json()
  }

  async signIn(email: string, password: string) {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  }

  async signOut() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })
    return response.json()
  }

  async getMe() {
    const response = await fetch('/api/auth/me')
    return response.json()
  }
}

export const supabase = new MubadalaClient()

export type Tables = {
  profiles: {
    Row: {
      id: string
      email: string
      full_name: string
      country: string
      phone_number: string | null
      date_of_birth: string
      id_document_type: string
      id_document_number: string
      kyc_status: 'pending' | 'approved' | 'rejected'
      kyc_approval_date: string | null
      kyc_verified_by: string | null
      account_type: 'investor' | 'admin'
      created_at: string
      updated_at: string
    }
    Insert: Omit<Tables['profiles']['Row'], 'created_at' | 'updated_at'>
    Update: Partial<Tables['profiles']['Row']>
  }
  wallets: {
    Row: {
      id: string
      user_id: string
      cryptocurrency: 'BTC' | 'USDT'
      wallet_address: string
      is_active: boolean
      created_at: string
      updated_at: string
    }
    Insert: Omit<Tables['wallets']['Row'], 'id' | 'created_at' | 'updated_at'>
    Update: Partial<Tables['wallets']['Row']>
  }
  deposits: {
    Row: {
      id: string
      user_id: string
      cryptocurrency: string
      amount: string
      usd_value: string
      transaction_hash: string | null
      status: 'pending' | 'confirmed' | 'failed'
      confirmations: number
      created_at: string
      confirmed_at: string | null
    }
    Insert: Omit<Tables['deposits']['Row'], 'id' | 'created_at' | 'confirmed_at' | 'confirmations'>
    Update: Partial<Tables['deposits']['Row']>
  }
  investments: {
    Row: {
      id: string
      user_id: string
      symbol: string
      asset_type: 'stock' | 'crypto'
      quantity: string
      buy_price: string
      current_price: string
      invested_amount: string
      current_value: string
      gain_loss: string
      gain_loss_percentage: string
      purchased_at: string
      updated_at: string
    }
    Insert: Omit<Tables['investments']['Row'], 'id' | 'gain_loss' | 'gain_loss_percentage' | 'updated_at'>
    Update: Partial<Tables['investments']['Row']>
  }
  withdrawals: {
    Row: {
      id: string
      user_id: string
      cryptocurrency: string
      amount: string
      usd_value: string
      withdrawal_address: string
      status: 'pending' | 'processing' | 'completed' | 'failed'
      requested_at: string
      processing_at: string | null
      completed_at: string | null
      transaction_hash: string | null
      notes: string | null
    }
    Insert: Omit<Tables['withdrawals']['Row'], 'id' | 'requested_at' | 'processing_at' | 'completed_at'>
    Update: Partial<Tables['withdrawals']['Row']>
  }
  transactions: {
    Row: {
      id: string
      user_id: string
      transaction_type: 'deposit' | 'withdrawal' | 'investment' | 'sell'
      asset: string | null
      amount: string | null
      usd_value: string | null
      status: string
      description: string | null
      reference_id: string | null
      created_at: string
    }
    Insert: Omit<Tables['transactions']['Row'], 'id' | 'created_at'>
    Update: Partial<Tables['transactions']['Row']>
  }
}
