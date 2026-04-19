import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const session = validateSession(token)
    if (!session) {
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      session,
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
