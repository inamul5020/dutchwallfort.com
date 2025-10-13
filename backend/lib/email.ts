import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { emailConfig, validateEmailConfig } from '../config/email.config';

// Email configuration
const transporter = nodemailer.createTransporter(emailConfig.smtp);

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

// Email sending function
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

    const mailOptions = {
      from: `"${emailConfig.property.name}" <${emailConfig.fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
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
}) => {
  return await sendEmail({
    to: bookingData.guestEmail,
    subject: `Booking Confirmation - ${emailConfig.property.name}`,
    template: 'booking-confirmation',
    data: {
      ...bookingData,
      propertyName: emailConfig.property.name,
      propertyAddress: emailConfig.property.address,
      contactPhone: emailConfig.property.phone,
      contactEmail: emailConfig.property.email,
      website: emailConfig.property.website,
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
}) => {
  return await sendEmail({
    to: emailConfig.adminEmail,
    subject: `New Booking Inquiry - ${bookingData.guestName}`,
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
