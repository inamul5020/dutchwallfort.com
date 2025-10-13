import Mailjet from 'node-mailjet';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { emailConfig, validateEmailConfig } from '../config/email.config';

// Initialize Mailjet client
const mailjet = Mailjet.apiConnect(
  emailConfig.mailjet.apiKey,
  emailConfig.mailjet.secretKey
);

// Email templates directory
const templatesDir = path.join(process.cwd(), 'templates', 'email');

// Load and compile email templates
const loadTemplate = (templateName: string): HandlebarsTemplateDelegate => {
  const templatePath = path.join(templatesDir, `${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  return Handlebars.compile(templateSource);
};

// Register common helpers
Handlebars.registerHelper('formatDate', (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

Handlebars.registerHelper('formatCurrency', (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
});

// Email sending function using Mailjet
export const sendEmail = async (options: {
  to: string;
  subject: string;
  template: string;
  data: any;
}) => {
  // Check if email is configured
  if (!validateEmailConfig()) {
    console.warn('Email not configured, skipping email send');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const template = loadTemplate(options.template);
    const html = template(options.data);

    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: emailConfig.mailjet.fromEmail,
            Name: emailConfig.mailjet.fromName,
          },
          To: [
            {
              Email: options.to,
              Name: options.data.guestName || 'Guest',
            },
          ],
          Subject: options.subject,
          HTMLPart: html,
        },
      ],
    });

    const result = await request;
    console.log('Email sent successfully via Mailjet:', result.body);
    return { success: true, messageId: result.body.Messages[0].To[0].MessageID };
  } catch (error) {
    console.error('Error sending email via Mailjet:', error);
    return { success: false, error: error.message };
  }
};

// Specific email functions
export const sendBookingConfirmation = async (bookingData: {
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  roomName: string;
  guests: number;
  totalNights: number;
  estimatedPrice: number;
  message?: string;
  status?: string;
}) => {
  const isConfirmed = bookingData.status === 'confirmed';
  const subject = isConfirmed 
    ? `Booking Confirmed - ${emailConfig.property.name}` 
    : `Booking Request Received - ${emailConfig.property.name}`;

  return await sendEmail({
    to: bookingData.guestEmail,
    subject,
    template: isConfirmed ? 'booking-confirmed' : 'booking-confirmation',
    data: {
      ...bookingData,
      propertyName: emailConfig.property.name,
      propertyAddress: emailConfig.property.address,
      contactPhone: emailConfig.property.phone,
      contactEmail: emailConfig.property.email,
      website: emailConfig.property.website,
      isConfirmed,
    },
  });
};

export const sendBookingNotificationToAdmin = async (bookingData: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  roomName: string;
  guests: number;
  message?: string;
  status?: string;
}) => {
  return await sendEmail({
    to: emailConfig.adminEmail,
    subject: `New Booking Request - ${bookingData.guestName}`,
    template: 'booking-notification-admin',
    data: {
      ...bookingData,
      propertyName: emailConfig.property.name,
      adminDashboardUrl: `${emailConfig.frontendUrl}/admin/bookings`,
    },
  });
};

export const sendContactFormNotification = async (contactData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  return await sendEmail({
    to: emailConfig.adminEmail,
    subject: `New Contact Form Submission - ${contactData.subject}`,
    template: 'contact-notification',
    data: {
      ...contactData,
      propertyName: emailConfig.property.name,
      adminDashboardUrl: `${emailConfig.frontendUrl}/admin/messages`,
    },
  });
};
