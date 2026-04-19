import { NextRequest, NextResponse } from 'next/server'
import { getPendingKycUsers, approveKyc, rejectKyc, validateSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    const users = getPendingKycUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get KYC users error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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
    const { userId, status } = body

    if (!userId || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    let user
    if (status === 'approved') {
      user = approveKyc(userId)
    } else {
      user = rejectKyc(userId)
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `KYC ${status}`,
      user: {
        id: user.id,
        email: user.email,
        kycStatus: user.kycStatus,
      },
    })
  } catch (error) {
    console.error('Update KYC status error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
