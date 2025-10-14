import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user'
    };
  } catch (error) {
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie as fallback
  const token = request.cookies.get('auth-token')?.value;
  return token || null;
}

export function requireAuth(requiredRole: 'admin' | 'user' = 'user') {
  return (request: NextRequest): { user: AuthUser } | { error: string } => {
    const token = extractTokenFromRequest(request);
    
    if (!token) {
      return { error: 'Authentication required' };
    }

    const user = verifyToken(token);
    if (!user) {
      return { error: 'Invalid or expired token' };
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
      return { error: 'Admin access required' };
    }

    return { user };
  };
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}
