import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'investor' | 'admin';
  fullName: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  phoneNumber: string;
  country: string;
  accountBalance: number;
  createdAt: Date;
  lastLogin: Date | null;
}

export interface Session {
  userId: string;
  email: string;
  role: 'investor' | 'admin';
  expiresAt: Date;
}

// Simple in-memory database (in production, use actual database)
export const users: Map<string, User> = new Map();
export const sessions: Map<string, Session> = new Map();

// Hash password using Node's crypto
export function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, 'mubadala-salt-key', 1000, 64, 'sha512')
    .toString('hex');
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  const hashOfInput = crypto
    .pbkdf2Sync(password, 'mubadala-salt-key', 1000, 64, 'sha512')
    .toString('hex');
  return hashOfInput === hash;
}

// Generate session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create user
export function createUser(userData: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  role?: 'investor' | 'admin';
}): User {
  const id = crypto.randomUUID();
  const user: User = {
    id,
    email: userData.email,
    passwordHash: hashPassword(userData.password),
    role: userData.role || 'investor',
    fullName: userData.fullName,
    kycStatus: 'pending',
    phoneNumber: userData.phoneNumber,
    country: userData.country,
    accountBalance: 0, // Always start at 0
    createdAt: new Date(),
    lastLogin: null,
  };

  users.set(id, user);
  return user;
}

// Find user by email
export function findUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Find user by ID
export function findUserById(id: string): User | undefined {
  return users.get(id);
}

// Update user
export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const user = users.get(id);
  if (!user) return undefined;

  const updated = { ...user, ...updates };
  users.set(id, updated);
  return updated;
}

// Get all users (for admin)
export function getAllUsers(): User[] {
  return Array.from(users.values());
}

// Get pending KYC users (for admin)
export function getPendingKycUsers(): User[] {
  return Array.from(users.values()).filter(u => u.kycStatus === 'pending');
}

// Approve KYC
export function approveKyc(userId: string): User | undefined {
  return updateUser(userId, { kycStatus: 'approved' });
}

// Reject KYC
export function rejectKyc(userId: string): User | undefined {
  return updateUser(userId, { kycStatus: 'rejected' });
}

// Create session
export function createSession(user: User): { token: string; session: Session } {
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry

  const session: Session = {
    userId: user.id,
    email: user.email,
    role: user.role,
    expiresAt,
  };

  sessions.set(token, session);
  updateUser(user.id, { lastLogin: new Date() });

  return { token, session };
}

// Validate session
export function validateSession(token: string): Session | null {
  const session = sessions.get(token);
  if (!session) return null;

  if (new Date() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

// Logout
export function logout(token: string): void {
  sessions.delete(token);
}

// Initialize with sample admin user
export function initializeAdminUser() {
  const existingAdmin = Array.from(users.values()).find(u => u.role === 'admin');
  if (!existingAdmin) {
    createUser({
      email: 'admin@mubadala.com',
      password: 'Admin@123456',
      fullName: 'Admin User',
      phoneNumber: '+971501234567',
      country: 'United Arab Emirates',
      role: 'admin',
    });
  }
}

const demoInvestors = [
  // Real investor account — edit accountBalance here to change available cash.
  { email: 'squadbeta130@gmail.com', fullName: 'Jordan  Belfort', password: 'Ilovefaithful1$', accountBalance: 25000 },
  { email: 'sahowe716@gmail.com', fullName: 'Rochelle Howe', password: 'user2026$', accountBalance: 650 },

  { email: 'rochellehowe@gmail.com', fullName: 'Rochelle Howe', password: 'user2026$', accountBalance: 0 },
  { email: 'ava.morgan@gmail.com', fullName: 'Ava Morgan', password: 'Funds101$', accountBalance: 26400 },
  { email: 'liam.carter@gmail.com', fullName: 'Liam Carter', password: 'Funds101$', accountBalance: 28750 },
  { email: 'sommerwilliams90@gmail.com', fullName: 'Sommer Williams', password: 'Ilovefaithful1$', accountBalance: 12000 },
  { email: 'noah.williams@gmail.com', fullName: 'Noah Williams', password: 'Funds101$', accountBalance: 24950 },
  { email: 'emma.thompson@gmail.com', fullName: 'Emma Thompson', password: 'Funds101$', accountBalance: 215600 },
] as const;

export function initializeDemoInvestors() {
  for (const investor of demoInvestors) {
    if (findUserByEmail(investor.email)) continue;

    const user = createUser({
      email: investor.email,
      password: investor.password,
      fullName: investor.fullName,
      phoneNumber: '+1 555 010 0100',
      country: 'United States',
      role: 'investor',
    });

    updateUser(user.id, {
      kycStatus: 'approved',
      accountBalance: investor.accountBalance,
    });
  }
}

// Call on module load
initializeAdminUser();
initializeDemoInvestors();
