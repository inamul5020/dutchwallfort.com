import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
}

export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest): { allowed: boolean; message?: string } => {
    const ip = getClientIP(request);
    const now = Date.now();
    const key = `${ip}:${request.nextUrl.pathname}`;
    
    const entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return { allowed: true };
    }
    
    if (entry.count >= config.maxRequests) {
      return { 
        allowed: false, 
        message: config.message || 'Too many requests, please try again later' 
      };
    }
    
    entry.count++;
    return { allowed: true };
  };
}

function getClientIP(request: NextRequest): string {
  // Try various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback to a default IP (in production, this should never happen)
  return 'unknown';
}

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);
