import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"Dutch Wall Fort" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

export const sendBookingConfirmation = async (bookingData) => {
  const { guest_name, guest_email, check_in, check_out, room_id, guests, message } = bookingData;

  const subject = `Booking Inquiry Received - Dutch Wall Fort`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706;">Booking Inquiry Received</h2>
      <p>Dear ${guest_name},</p>

      <p>Thank you for your interest in staying at Dutch Wall Fort! We have received your booking inquiry and will get back to you within 24 hours.</p>

      <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #374151;">Booking Details:</h3>
        <p><strong>Guest Name:</strong> ${guest_name}</p>
        <p><strong>Email:</strong> ${guest_email}</p>
        <p><strong>Check-in:</strong> ${new Date(check_in).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(check_out).toLocaleDateString()}</p>
        <p><strong>Room ID:</strong> ${room_id}</p>
        <p><strong>Number of Guests:</strong> ${guests}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      </div>

      <p>We will contact you shortly to confirm availability and provide a quote.</p>

      <p>For urgent inquiries, you can also reach us at:</p>
      <ul>
        <li>Phone/WhatsApp: +94 76 572 1495</li>
        <li>Email: reservations@dutchwallfort.com</li>
      </ul>

      <p>Best regards,<br>The Dutch Wall Fort Team</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280;">
        Dutch Wall Fort<br>
        73 Church Street, Galle Fort, Sri Lanka<br>
        Phone: +94 76 572 1495 | Email: reservations@dutchwallfort.com
      </p>
    </div>
  `;

  return await sendEmail(guest_email, subject, html);
};

export const sendContactMessage = async (messageData) => {
  const { name, email, phone, subject, message } = messageData;

  // Send confirmation to the guest
  const guestSubject = `Message Received - Dutch Wall Fort`;
  const guestHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706;">Message Received</h2>
      <p>Dear ${name},</p>

      <p>Thank you for contacting Dutch Wall Fort! We have received your message and will get back to you within 24 hours.</p>

      <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #374151;">Your Message:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      </div>

      <p>We appreciate your interest in Dutch Wall Fort and look forward to assisting you.</p>

      <p>For immediate assistance:</p>
      <ul>
        <li>Phone/WhatsApp: +94 76 572 1495</li>
        <li>Email: reservations@dutchwallfort.com</li>
      </ul>

      <p>Best regards,<br>The Dutch Wall Fort Team</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280;">
        Dutch Wall Fort<br>
        73 Church Street, Galle Fort, Sri Lanka<br>
        Phone: +94 76 572 1495 | Email: reservations@dutchwallfort.com
      </p>
    </div>
  `;

  // Send notification to admin
  const adminSubject = `New Contact Message: ${subject}`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">New Contact Message</h2>

      <div style="background-color: #fef2f2; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #dc2626;">
        <h3 style="margin-top: 0; color: #374151;">Message Details:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <p>Please respond to this inquiry promptly.</p>

      <p><a href="mailto:${email}" style="background-color: #d97706; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to ${name}</a></p>
    </div>
  `;

  // Send both emails
  const guestResult = await sendEmail(email, guestSubject, guestHtml);
  const adminResult = await sendEmail(process.env.ADMIN_EMAIL || 'reservations@dutchwallfort.com', adminSubject, adminHtml);

  return { guestResult, adminResult };
};
