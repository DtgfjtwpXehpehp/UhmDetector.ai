// Email service utility for sending emails
// In production, this would integrate with services like SendGrid, Mailgun, or AWS SES

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const generateOTPEmail = (otp: string, userName?: string): EmailTemplate => {
  const subject = 'Password Reset Code - UhmDetector.ai';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Code</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .header-text { color: white; opacity: 0.9; margin: 0; }
        .content { padding: 40px 20px; }
        .otp-container { background-color: #f8fafc; border: 2px dashed #7c3aed; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 36px; font-weight: bold; color: #7c3aed; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .otp-label { color: #64748b; font-size: 14px; margin-bottom: 15px; }
        .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .button { display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎤 UhmDetector.ai</div>
          <p class="header-text">Password Reset Request</p>
        </div>
        
        <div class="content">
          <h1 style="color: #1e293b; margin-bottom: 20px;">Reset Your Password</h1>
          
          ${userName ? `<p>Hi ${userName},</p>` : '<p>Hello,</p>'}
          
          <p style="color: #475569; line-height: 1.6;">
            We received a request to reset your password for your UhmDetector.ai account. 
            Use the verification code below to complete the password reset process.
          </p>
          
          <div class="otp-container">
            <div class="otp-label">Your verification code is:</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> This code will expire in 10 minutes for security reasons.
          </div>
          
          <p style="color: #475569; line-height: 1.6;">
            If you didn't request this password reset, please ignore this email. 
            Your account remains secure and no changes have been made.
          </p>
          
          <p style="color: #475569; line-height: 1.6;">
            For security reasons, never share this code with anyone. Our team will never ask for your verification code.
          </p>
        </div>
        
        <div class="footer">
          <p>© 2024 UhmDetector.ai - Improve Your Communication Skills</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    UhmDetector.ai - Password Reset Code
    
    ${userName ? `Hi ${userName},` : 'Hello,'}
    
    We received a request to reset your password for your UhmDetector.ai account.
    
    Your verification code is: ${otp}
    
    This code will expire in 10 minutes.
    
    If you didn't request this password reset, please ignore this email.
    
    For security reasons, never share this code with anyone.
    
    © 2024 UhmDetector.ai
  `;
  
  return { subject, html, text };
};

export const generatePasswordResetConfirmationEmail = (userName?: string): EmailTemplate => {
  const subject = 'Password Reset Successful - UhmDetector.ai';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Successful</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #22c55e 0%, #06b6d4 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .header-text { color: white; opacity: 0.9; margin: 0; }
        .content { padding: 40px 20px; }
        .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
        .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .button { display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎤 UhmDetector.ai</div>
          <p class="header-text">Password Reset Successful</p>
        </div>
        
        <div class="content">
          <div class="success-icon">✅</div>
          <h1 style="color: #1e293b; margin-bottom: 20px; text-align: center;">Password Successfully Reset</h1>
          
          ${userName ? `<p>Hi ${userName},</p>` : '<p>Hello,</p>'}
          
          <p style="color: #475569; line-height: 1.6;">
            Your UhmDetector.ai account password has been successfully reset. You can now log in with your new password.
          </p>
          
          <div class="warning">
            <strong>🔒 Security Notice:</strong> If you didn't make this change, please contact our support team immediately.
          </div>
          
          <p style="color: #475569; line-height: 1.6;">
            For your security, we recommend:
          </p>
          
          <ul style="color: #475569; line-height: 1.6;">
            <li>Using a strong, unique password</li>
            <li>Enabling two-factor authentication if available</li>
            <li>Not sharing your login credentials with anyone</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="#" class="button">Log In to Your Account</a>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2024 UhmDetector.ai - Improve Your Communication Skills</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    UhmDetector.ai - Password Reset Successful
    
    ${userName ? `Hi ${userName},` : 'Hello,'}
    
    Your UhmDetector.ai account password has been successfully reset.
    You can now log in with your new password.
    
    If you didn't make this change, please contact our support team immediately.
    
    For your security, we recommend:
    - Using a strong, unique password
    - Enabling two-factor authentication if available
    - Not sharing your login credentials with anyone
    
    © 2024 UhmDetector.ai
  `;
  
  return { subject, html, text };
};

// Simulate email sending (in production, integrate with real email service)
export const sendEmail = async (to: string, template: EmailTemplate): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`📧 Email sent to ${to}:`);
  console.log(`Subject: ${template.subject}`);
  console.log(`Content: ${template.text}`);
  
  // In development, show the OTP in an alert for testing
  if (process.env.NODE_ENV === 'development' && template.subject.includes('Password Reset Code')) {
    const otpMatch = template.text.match(/(\d{6})/);
    if (otpMatch) {
      setTimeout(() => {
        alert(`🔑 Demo OTP: ${otpMatch[1]}\n\nIn production, this would be sent to your email.`);
      }, 500);
    }
  }
  
  return true;
};