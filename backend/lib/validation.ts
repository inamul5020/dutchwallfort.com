import { NextRequest } from 'next/server';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

export function sanitizeHTML(input: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
    .replace(/on\w+="[^"]*"/gi, ''); // Remove event handlers
}

export function validateRoomData(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 3 characters' });
  }

  if (data.price !== undefined && (typeof data.price !== 'number' || data.price < 0)) {
    errors.push({ field: 'price', message: 'Price must be a positive number' });
  }

  if (data.guests !== undefined && (typeof data.guests !== 'number' || data.guests < 1 || data.guests > 10)) {
    errors.push({ field: 'guests', message: 'Guests must be between 1 and 10' });
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }

  return errors;
}

export function validateBookingData(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.guestName || typeof data.guestName !== 'string' || data.guestName.trim().length < 2) {
    errors.push({ field: 'guestName', message: 'Guest name is required and must be at least 2 characters' });
  }

  if (!data.guestEmail || !validateEmail(data.guestEmail)) {
    errors.push({ field: 'guestEmail', message: 'Valid email is required' });
  }

  if (!data.checkIn || !isValidDate(data.checkIn)) {
    errors.push({ field: 'checkIn', message: 'Valid check-in date is required' });
  }

  if (!data.checkOut || !isValidDate(data.checkOut)) {
    errors.push({ field: 'checkOut', message: 'Valid check-out date is required' });
  }

  if (data.checkIn && data.checkOut && new Date(data.checkIn) >= new Date(data.checkOut)) {
    errors.push({ field: 'checkOut', message: 'Check-out date must be after check-in date' });
  }

  if (data.guests && (typeof data.guests !== 'number' || data.guests < 1 || data.guests > 10)) {
    errors.push({ field: 'guests', message: 'Number of guests must be between 1 and 10' });
  }

  return errors;
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export function sanitizeInput(data: any): any {
  if (typeof data === 'string') {
    return sanitizeString(data);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value);
      } else if (key === 'content' && typeof value === 'string') {
        // Special handling for HTML content
        sanitized[key] = sanitizeHTML(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  
  return data;
}
