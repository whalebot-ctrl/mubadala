import { NextRequest, NextResponse } from 'next/server'
import {
  createUser,
  findUserByEmail,
  createSession,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      country,
    } = body

    // Validation
    if (!email || !password || !confirmPassword || !fullName || !phoneNumber || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
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
      role: 'investor',
    })

    // Create session
    const { token } = createSession(user)

    // Set session cookie
    const response = NextResponse.json(
      {
        success: true,
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

    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
