import nodemailer from 'nodemailer';
import type { ContactSubmission } from '@shared/schema';

// Create reusable transporter object using ProofPoint SMTP
const transporter = nodemailer.createTransport({
  host: process.env.PROOFPOINT_SMTP_HOST,
  port: parseInt(process.env.PROOFPOINT_SMTP_PORT || '587'),
  secure: process.env.PROOFPOINT_SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.PROOFPOINT_SMTP_USER,
    pass: process.env.PROOFPOINT_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendContactNotification(submission: ContactSubmission) {
  const subject = submission.type === 'visit' 
    ? `New Visit Scheduled - ${submission.name}`
    : `New Website Contact Inquiry - ${submission.name}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
        ${submission.type === 'visit' ? 'New Visit Scheduled' : 'New Website Contact Inquiry'}
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${submission.phone}">${submission.phone}</a></p>
        
        ${submission.type === 'visit' ? `
          <p><strong>Preferred Date:</strong> ${submission.preferredDate || 'Not specified'}</p>
          <p><strong>Preferred Time:</strong> ${submission.preferredTime || 'Not specified'}</p>
          ${submission.floorPlan ? `<p><strong>Floor Plan Interest:</strong> ${submission.floorPlan}</p>` : ''}
        ` : ''}
      </div>
      
      ${submission.message ? `
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${submission.message}</p>
        </div>
      ` : ''}
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Bicycle Club Apartments website contact form<br>
          Submitted on ${new Date(submission.createdAt).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })} at ${new Date(submission.createdAt).toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })} CST
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Bicycle Club Apartments" <${process.env.PROOFPOINT_SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || 'kkohorst@everestproperties.com', // Default to correct recipient
    replyTo: `"Bicycle Club Apartments" <${process.env.PROOFPOINT_SMTP_USER}>`,
    subject,
    html: htmlContent,
    text: `
${submission.type === 'visit' ? 'New Visit Scheduled' : 'New Website Contact Inquiry'}

Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone}
${submission.type === 'visit' ? `Preferred Date: ${submission.preferredDate || 'Not specified'}` : ''}
${submission.type === 'visit' ? `Preferred Time: ${submission.preferredTime || 'Not specified'}` : ''}
${submission.floorPlan ? `Floor Plan Interest: ${submission.floorPlan}` : ''}

${submission.message ? `Message:\n${submission.message}` : ''}

Submitted on ${new Date(submission.createdAt).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })} at ${new Date(submission.createdAt).toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })} CST
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

export async function sendConfirmationEmail(submission: ContactSubmission) {
  const subject = submission.type === 'visit' 
    ? 'Visit Request Received - Bicycle Club Apartments'
    : 'Thank You for Your Inquiry - Bicycle Club Apartments';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Bicycle Club Apartments</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Luxury Living in Kansas City, MO</p>
      </div>
      
      <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #059669; margin-top: 0;">
          ${submission.type === 'visit' ? 'Visit Request Received!' : 'Thank You for Your Inquiry!'}
        </h2>
        
        <p>Dear ${submission.name},</p>
        
        <p>${submission.type === 'visit' 
          ? 'Thank you for your interest in scheduling a visit to Bicycle Club Apartments. We have received your request and will contact you soon to confirm your visit details.'
          : 'Thank you for your interest in Bicycle Club Apartments. We have received your inquiry and will respond to you as soon as possible.'
        }</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Submission Details</h3>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Phone:</strong> ${submission.phone}</p>
          
          ${submission.type === 'visit' ? `
            <p><strong>Preferred Date:</strong> ${submission.preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${submission.preferredTime || 'Not specified'}</p>
            ${submission.floorPlan ? `<p><strong>Floor Plan Interest:</strong> ${submission.floorPlan}</p>` : ''}
          ` : ''}
        </div>
        
        <div style="background-color: #e6f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>A member of our leasing team will contact you within 24 hours</li>
            ${submission.type === 'visit' ? '<li>We will confirm your visit date and time</li>' : ''}
            <li>We'll answer any questions you may have about our community</li>
            <li>Feel free to call us at (816) 741-3018 if you have immediate questions</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #059669; font-weight: bold; margin: 0;">We look forward to welcoming you home!</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            <strong>Bicycle Club Apartments</strong><br>
            8800 N Oak Trafficway<br>
            Kansas City, MO 64155<br>
            Phone: (816) 741-3018<br>
            Email: leasing@bicycleclubapts.com
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Bicycle Club Apartments" <${process.env.PROOFPOINT_SMTP_USER}>`,
    to: submission.email,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Confirmation email sending failed:', error);
    return { success: false, error: error.message };
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('ProofPoint SMTP connection verified successfully');
    return { success: true };
  } catch (error) {
    console.error('ProofPoint SMTP connection failed:', error);
    return { success: false, error: error.message };
  }
}