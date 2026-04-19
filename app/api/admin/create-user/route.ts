import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByEmail, validateSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const token = request.cookies.get('session_token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const session = validateSession(token)
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      email,
      password,
      fullName,
      phoneNumber,
      country,
      role = 'investor',
    } = body

    // Validation
    if (!email || !password || !fullName || !phoneNumber || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user exists
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = createUser({
      email,
      password,
      fullName,
      phoneNumber,
      country,
      role,
    })

    // Auto-approve KYC if admin creating investor account
    if (role === 'investor') {
      user.kycStatus = 'approved'
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          kycStatus: user.kycStatus,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating user' },
      { status: 500 }
    )
  }
}
