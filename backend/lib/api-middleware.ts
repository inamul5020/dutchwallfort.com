import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, AuthUser } from './auth';
import { rateLimit, RateLimitConfig } from './rate-limit';
import { validateRoomData, validateBookingData, sanitizeInput, ValidationError } from './validation';

export interface MiddlewareConfig {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  rateLimit?: RateLimitConfig;
  validateInput?: 'room' | 'booking' | 'contact' | 'blog' | 'service' | 'attraction';
  allowedMethods?: string[];
}

const defaultRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests, please try again later'
};

export function createSecureHandler(
  handler: (request: NextRequest, user?: AuthUser) => Promise<NextResponse>,
  config: MiddlewareConfig = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 200, 
        headers: {
          ...corsHeaders,
          'Allow': 'GET, POST, PUT, DELETE, OPTIONS'
        }
      });
    }

    // Check allowed methods
    if (config.allowedMethods && !config.allowedMethods.includes(request.method)) {
      return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405, headers: corsHeaders }
      );
    }

    // Rate limiting
    const rateLimitConfig = config.rateLimit || defaultRateLimit;
    const rateLimitCheck = rateLimit(rateLimitConfig)(request);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateLimitCheck.message },
        { status: 429, headers: corsHeaders }
      );
    }

    // Authentication
    let user: AuthUser | undefined;
    if (config.requireAuth || config.requireAdmin) {
      const authResult = requireAuth(config.requireAdmin ? 'admin' : 'user')(request);
      if ('error' in authResult) {
        return NextResponse.json(
          { success: false, error: authResult.error },
          { status: 401, headers: corsHeaders }
        );
      }
      user = authResult.user;
    }

    // Input validation
    if (config.validateInput && request.method !== 'GET') {
      try {
        const body = await request.json();
        const sanitizedBody = sanitizeInput(body);
        
        let validationErrors: ValidationError[] = [];
        
        switch (config.validateInput) {
          case 'room':
            validationErrors = validateRoomData(sanitizedBody);
            break;
          case 'booking':
            validationErrors = validateBookingData(sanitizedBody);
            break;
          case 'contact':
            if (!sanitizedBody.name || !sanitizedBody.email || !sanitizedBody.message) {
              validationErrors.push({ field: 'required', message: 'Name, email, and message are required' });
            }
            break;
          case 'blog':
            if (!sanitizedBody.title || !sanitizedBody.content) {
              validationErrors.push({ field: 'required', message: 'Title and content are required' });
            }
            break;
          case 'service':
            if (!sanitizedBody.name || !sanitizedBody.description) {
              validationErrors.push({ field: 'required', message: 'Name and description are required' });
            }
            break;
          case 'attraction':
            if (!sanitizedBody.name || !sanitizedBody.description) {
              validationErrors.push({ field: 'required', message: 'Name and description are required' });
            }
            break;
        }

        if (validationErrors.length > 0) {
          return NextResponse.json(
            { success: false, error: 'Validation failed', details: validationErrors },
            { status: 400, headers: corsHeaders }
          );
        }

        // Replace the request body with sanitized data
        request = new NextRequest(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(sanitizedBody)
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Invalid JSON in request body' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    try {
      // Call the actual handler
      const response = await handler(request, user);
      
      // Add CORS headers to response
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500, headers: corsHeaders }
      );
    }
  };
}

// Convenience functions for common configurations
export const publicHandler = (handler: (request: NextRequest) => Promise<NextResponse>) =>
  createSecureHandler(handler, { rateLimit: { windowMs: 15 * 60 * 1000, maxRequests: 200 } });

export const userHandler = (handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>) =>
  createSecureHandler(handler, { requireAuth: true, rateLimit: { windowMs: 15 * 60 * 1000, maxRequests: 100 } });

export const adminHandler = (handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>) =>
  createSecureHandler(handler, { requireAdmin: true, rateLimit: { windowMs: 15 * 60 * 1000, maxRequests: 50 } });

export const adminWriteHandler = (handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>, validateType?: string) =>
  createSecureHandler(handler, { 
    requireAdmin: true, 
    rateLimit: { windowMs: 15 * 60 * 1000, maxRequests: 30 },
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    validateInput: validateType as any
  });
