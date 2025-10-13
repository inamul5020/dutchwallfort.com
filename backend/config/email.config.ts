// Email configuration
export const emailConfig = {
  // Mailjet Configuration
  mailjet: {
    apiKey: process.env.MAILJET_API_KEY || '',
    secretKey: process.env.MAILJET_SECRET_KEY || '',
    fromEmail: process.env.MAILJET_FROM_EMAIL || 'noreply@dutchwallfort.com',
    fromName: process.env.MAILJET_FROM_NAME || 'Dutch Wall Fort',
  },
  
  // SMTP Configuration (fallback)
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
  
  // Email addresses
  adminEmail: process.env.ADMIN_EMAIL || 'admin@dutchwallfort.com',
  
  // URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Property information
  property: {
    name: 'Dutch Wall Fort',
    address: 'Church Street, Galle Fort, Sri Lanka',
    phone: '+94 76 572 1495',
    email: 'info@dutchwallfort.com',
    website: 'https://dutchwallfort.com',
  }
};

// Validation function
export const validateEmailConfig = () => {
  // Check for Mailjet configuration first
  const mailjetRequired = ['MAILJET_API_KEY', 'MAILJET_SECRET_KEY', 'MAILJET_FROM_EMAIL'];
  const mailjetMissing = mailjetRequired.filter(key => !process.env[key]);
  
  if (mailjetMissing.length === 0) {
    console.log('Mailjet email configuration found');
    return true;
  }
  
  // Fallback to SMTP
  const smtpRequired = ['SMTP_USER', 'SMTP_PASS'];
  const smtpMissing = smtpRequired.filter(key => !process.env[key]);
  
  if (smtpMissing.length > 0) {
    console.warn(`Missing email configuration: ${[...mailjetMissing, ...smtpMissing].join(', ')}`);
    console.warn('Email notifications will be disabled. Please set the required environment variables.');
    return false;
  }
  
  console.log('SMTP email configuration found (fallback)');
  return true;
};
