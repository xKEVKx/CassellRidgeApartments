import nodemailer from 'nodemailer';
import type { ContactSubmission } from '@shared/schema';

// Create reusable transporter object using Postmark SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.postmarkapp.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.POSTMARK_SERVER_TOKEN,
    pass: process.env.POSTMARK_SERVER_TOKEN,
  },
});

// Escape user-controlled values before interpolating into HTML email bodies
// to prevent HTML/markup injection in outgoing emails.
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatEligibility(metadata: any) {
  const incomeNum = Number(metadata.income);
  const hasIncome =
    metadata.income !== null &&
    metadata.income !== undefined &&
    metadata.income !== '' &&
    Number.isFinite(incomeNum);
  const income = hasIncome
    ? `$${incomeNum.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    : 'Not provided';
  const limitNum = Number(metadata.incomeLimit);
  const limit = metadata.incomeLimit != null && Number.isFinite(limitNum)
    ? `$${limitNum.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    : 'Not specified';
  const householdNum = Number(metadata.householdSize);
  const householdSize = Number.isFinite(householdNum) ? String(householdNum) : 'Not specified';
  const estimate = !hasIncome
    ? 'Not calculated (no income provided)'
    : metadata.qualifies
      ? 'Within income limit — may qualify'
      : 'Above income limit';
  return { income, limit, estimate, householdSize };
}

export async function sendContactNotification(submission: ContactSubmission) {
  const metadata = submission.metadata as any || {};
  const subject = submission.type === 'visit' 
    ? `New Visit Scheduled - ${submission.name}`
    : submission.type === 'eligibility'
      ? `New Eligibility Inquiry - ${submission.name}`
      : `New Website Contact Inquiry - ${submission.name}`;
  const headerTitle = submission.type === 'visit'
    ? 'New Visit Scheduled'
    : submission.type === 'eligibility'
      ? 'New Eligibility Inquiry'
      : 'New Website Contact Inquiry';
  const elig = formatEligibility(metadata);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8b4513; border-bottom: 2px solid #8b4513; padding-bottom: 10px;">
        ${headerTitle}
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${encodeURIComponent(submission.email)}">${escapeHtml(submission.email)}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${encodeURIComponent(submission.phone)}">${escapeHtml(submission.phone)}</a></p>
        
        ${submission.type === 'visit' ? `
          <p><strong>Preferred Date:</strong> ${escapeHtml(metadata.preferredDate || 'Not specified')}</p>
          <p><strong>Preferred Time:</strong> ${escapeHtml(metadata.preferredTime || 'Not specified')}</p>
          ${metadata.floorPlan ? `<p><strong>Floor Plan Interest:</strong> ${escapeHtml(metadata.floorPlan)}</p>` : ''}
        ` : ''}
      </div>

      ${submission.type === 'eligibility' ? `
        <div style="background-color: #f8f5f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Eligibility Pre-Check</h3>
          <p><strong>Household Size:</strong> ${elig.householdSize}</p>
          <p><strong>Annual Income:</strong> ${elig.income}</p>
          <p><strong>Income Limit (max):</strong> ${elig.limit}</p>
          <p><strong>Estimate:</strong> ${elig.estimate}</p>
        </div>
      ` : ''}
      
      ${submission.message ? `
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(submission.message)}</p>
        </div>
      ` : ''}
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Cassell Ridge Apartments website contact form<br>
          Submitted on ${submission.createdAt ? new Date(submission.createdAt).toLocaleDateString('en-US', { timeZone: 'America/New_York' }) : 'Unknown date'} at ${submission.createdAt ? new Date(submission.createdAt).toLocaleTimeString('en-US', { timeZone: 'America/New_York' }) : 'Unknown time'} EST
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Cassell Ridge Apartments" <no-reply@cassellridgeapts.com>`,
    to: process.env.NOTIFICATION_EMAIL || 'cassellridge@elmingtonpm.com', // Default to correct recipient
    replyTo: `"Cassell Ridge Apartments" <cassellridge@elmingtonpm.com>`,
    subject,
    html: htmlContent,
    text: `
${headerTitle}

Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone}
${submission.type === 'visit' ? `Preferred Date: ${metadata.preferredDate || 'Not specified'}` : ''}
${submission.type === 'visit' ? `Preferred Time: ${metadata.preferredTime || 'Not specified'}` : ''}
${metadata.floorPlan ? `Floor Plan Interest: ${metadata.floorPlan}` : ''}
${submission.type === 'eligibility' ? `Household Size: ${elig.householdSize}
Annual Income: ${elig.income}
Income Limit (max): ${elig.limit}
Estimate: ${elig.estimate}` : ''}

${submission.message ? `Message:\n${submission.message}` : ''}

Submitted on ${submission.createdAt ? new Date(submission.createdAt).toLocaleDateString('en-US', { timeZone: 'America/New_York' }) : 'Unknown date'} at ${submission.createdAt ? new Date(submission.createdAt).toLocaleTimeString('en-US', { timeZone: 'America/New_York' }) : 'Unknown time'} EST
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function sendConfirmationEmail(submission: ContactSubmission) {
  const metadata = submission.metadata as any || {};
  const subject = submission.type === 'visit' 
    ? 'Visit Request Received - Cassell Ridge Apartments'
    : 'Thank You for Your Inquiry - Cassell Ridge Apartments';
  const elig = formatEligibility(metadata);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #8b4513 0%, #654321 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Cassell Ridge Apartments</h1>
      </div>
      
      <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #8b4513; margin-top: 0;">
          ${submission.type === 'visit' ? 'Visit Request Received!' : 'Thank You for Your Inquiry!'}
        </h2>
        
        <p>Dear ${escapeHtml(submission.name)},</p>
        
        <p>${submission.type === 'visit' 
          ? 'Thank you for your interest in scheduling a visit to Cassell Ridge Apartments. We have received your request and will contact you soon to confirm your visit details.'
          : 'Thank you for your interest in Cassell Ridge Apartments. We have received your inquiry and will respond to you as soon as possible.'
        }</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Submission Details</h3>
          <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
          
          ${submission.type === 'visit' ? `
            <p><strong>Preferred Date:</strong> ${escapeHtml(metadata.preferredDate || 'Not specified')}</p>
            <p><strong>Preferred Time:</strong> ${escapeHtml(metadata.preferredTime || 'Not specified')}</p>
            ${metadata.floorPlan ? `<p><strong>Floor Plan Interest:</strong> ${escapeHtml(metadata.floorPlan)}</p>` : ''}
          ` : ''}
          ${submission.type === 'eligibility' ? `
            <p><strong>Household Size:</strong> ${elig.householdSize}</p>
            <p><strong>Annual Income:</strong> ${elig.income}</p>
            <p><strong>Income Limit (max):</strong> ${elig.limit}</p>
            <p><strong>Eligibility Estimate:</strong> ${elig.estimate}</p>
          ` : ''}
        </div>
        
        <div style="background-color: #e6f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>A member of our leasing team will contact you within 24 hours</li>
            ${submission.type === 'visit' ? '<li>We will confirm your visit date and time</li>' : ''}
            <li>We'll answer any questions you may have about our community</li>
            <li>Feel free to call us at (865) 344-2490 if you have immediate questions</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #8b4513; font-weight: bold; margin: 0;">We look forward to welcoming you home!</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Contact Information</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 15px;">
            <div style="flex: 1; min-width: 200px;">
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                <strong style="color: #8b4513;">📞 Phone</strong><br>
                <a href="tel:(865) 344-2490" style="color: #8b4513; text-decoration: none;">(865) 344-2490</a>
              </p>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                <strong style="color: #8b4513;">✉️ Email</strong><br>
                <a href="mailto:cassellridge@elmingtonpm.com" style="color: #8b4513; text-decoration: none;">Email Us</a>
              </p>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
              <strong style="color: #8b4513;">📍 Address</strong><br>
              1230 Cassell Valley Way<br>
              Knoxville, TN 37912
            </p>
          </div>
          <div style="margin-top: 15px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              <strong style="color: #8b4513;">🕒 Office Hours</strong><br>
              Monday-Friday: 8AM to 5PM<br>
              Saturday: 10AM to 2PM<br>
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Cassell Ridge Apartments" <no-reply@cassellridgeapts.com>`,
    replyTo: `"Cassell Ridge Apartments" <cassellridge@elmingtonpm.com>`,
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
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('Postmark SMTP connection verified successfully');
    return { success: true };
  } catch (error) {
    console.error('Postmark SMTP connection failed:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}