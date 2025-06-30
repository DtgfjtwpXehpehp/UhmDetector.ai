// Email template generators for UhmDetector.ai

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
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          margin: 0; 
          padding: 0; 
          background-color: #f8fafc; 
          line-height: 1.6;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: white; 
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); 
          padding: 40px 20px; 
          text-align: center; 
        }
        .logo { 
          color: white; 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 10px; 
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .header-text { 
          color: white; 
          opacity: 0.9; 
          margin: 0; 
          font-size: 16px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .greeting {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 20px;
        }
        .otp-container { 
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 3px solid #7c3aed; 
          border-radius: 16px; 
          padding: 30px; 
          text-align: center; 
          margin: 30px 0; 
          position: relative;
        }
        .otp-container::before {
          content: '🔐';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0 10px;
          font-size: 24px;
        }
        .otp-code { 
          font-size: 42px; 
          font-weight: bold; 
          color: #7c3aed; 
          letter-spacing: 12px; 
          font-family: 'Courier New', monospace; 
          margin: 10px 0;
          text-shadow: 2px 2px 4px rgba(124, 58, 237, 0.1);
        }
        .otp-label { 
          color: #64748b; 
          font-size: 14px; 
          margin-bottom: 15px; 
          font-weight: 500;
        }
        .warning { 
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b; 
          padding: 20px; 
          margin: 25px 0; 
          border-radius: 8px;
          position: relative;
        }
        .warning::before {
          content: '⚠️';
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 20px;
        }
        .warning-content {
          margin-left: 35px;
        }
        .security-tips {
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
        }
        .security-tips h3 {
          color: #1e293b;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 16px;
        }
        .security-tips ul {
          margin: 0;
          padding-left: 20px;
          color: #475569;
        }
        .security-tips li {
          margin-bottom: 8px;
        }
        .footer { 
          background-color: #f8fafc; 
          padding: 30px 20px; 
          text-align: center; 
          color: #64748b; 
          font-size: 14px; 
          border-top: 1px solid #e2e8f0;
        }
        .footer-logo {
          font-weight: bold;
          color: #7c3aed;
          margin-bottom: 10px;
        }
        .social-links {
          margin: 15px 0;
        }
        .social-links a {
          color: #7c3aed;
          text-decoration: none;
          margin: 0 10px;
        }
        @media (max-width: 600px) {
          .container { margin: 10px; }
          .content { padding: 30px 20px; }
          .otp-code { font-size: 36px; letter-spacing: 8px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            🎤 UhmDetector.ai
          </div>
          <p class="header-text">Secure Password Reset</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            ${userName ? `Hi ${userName}! 👋` : 'Hello! 👋'}
          </div>
          
          <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">
            We received a request to reset your password for your UhmDetector.ai account. 
            Use the verification code below to complete the password reset process.
          </p>
          
          <div class="otp-container">
            <div class="otp-label">Your verification code is:</div>
            <div class="otp-code">${otp}</div>
            <div style="color: #64748b; font-size: 12px; margin-top: 10px;">
              Valid for 10 minutes
            </div>
          </div>
          
          <div class="warning">
            <div class="warning-content">
              <strong>Important Security Notice:</strong><br>
              This code will expire in 10 minutes for your security. Never share this code with anyone.
            </div>
          </div>
          
          <div class="security-tips">
            <h3>🛡️ Security Tips</h3>
            <ul>
              <li>Our team will never ask for your verification code</li>
              <li>Always verify the sender's email address</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Consider using a password manager for better security</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 14px; margin-top: 30px;">
            If you're having trouble with the password reset process, please contact our support team.
          </p>
        </div>
        
        <div class="footer">
          <div class="footer-logo">🎤 UhmDetector.ai</div>
          <p>Improve Your Communication Skills</p>
          <div class="social-links">
            <a href="#">Help Center</a> • 
            <a href="#">Privacy Policy</a> • 
            <a href="#">Contact Support</a>
          </div>
          <p style="margin-top: 15px; font-size: 12px;">
            © 2024 UhmDetector.ai. All rights reserved.<br>
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
🎤 UhmDetector.ai - Password Reset Code

${userName ? `Hi ${userName}!` : 'Hello!'}

We received a request to reset your password for your UhmDetector.ai account.

Your verification code is: ${otp}

⚠️ IMPORTANT:
- This code will expire in 10 minutes
- Never share this code with anyone
- Our team will never ask for your verification code

If you didn't request this password reset, please ignore this email.

For security reasons, always verify the sender's email address and consider using a password manager.

If you need help, contact our support team.

© 2024 UhmDetector.ai - Improve Your Communication Skills
This is an automated message, please do not reply to this email.
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
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          margin: 0; 
          padding: 0; 
          background-color: #f8fafc; 
          line-height: 1.6;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: white; 
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #22c55e 0%, #06b6d4 100%); 
          padding: 40px 20px; 
          text-align: center; 
        }
        .logo { 
          color: white; 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 10px; 
        }
        .header-text { 
          color: white; 
          opacity: 0.9; 
          margin: 0; 
          font-size: 16px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .success-container {
          text-align: center;
          margin: 30px 0;
        }
        .success-icon { 
          font-size: 64px; 
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .success-title {
          color: #22c55e;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .warning { 
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b; 
          padding: 20px; 
          margin: 25px 0; 
          border-radius: 8px;
        }
        .security-recommendations {
          background-color: #f0fdf4;
          border: 1px solid #22c55e;
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
        }
        .security-recommendations h3 {
          color: #15803d;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 16px;
        }
        .security-recommendations ul {
          margin: 0;
          padding-left: 20px;
          color: #166534;
        }
        .security-recommendations li {
          margin-bottom: 8px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          margin: 25px 0;
          box-shadow: 0 4px 6px rgba(34, 197, 94, 0.2);
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer { 
          background-color: #f8fafc; 
          padding: 30px 20px; 
          text-align: center; 
          color: #64748b; 
          font-size: 14px; 
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 600px) {
          .container { margin: 10px; }
          .content { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎤 UhmDetector.ai</div>
          <p class="header-text">Password Reset Successful</p>
        </div>
        
        <div class="content">
          <div class="success-container">
            <div class="success-icon">✅</div>
            <div class="success-title">Password Successfully Reset!</div>
          </div>
          
          <p style="color: #475569; font-size: 16px;">
            ${userName ? `Hi ${userName}!` : 'Hello!'}
          </p>
          
          <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">
            Great news! Your UhmDetector.ai account password has been successfully reset. 
            You can now log in with your new password and continue improving your communication skills.
          </p>
          
          <div style="text-align: center;">
            <a href="#" class="cta-button">🚀 Log In to Your Account</a>
          </div>
          
          <div class="warning">
            <strong>🔒 Security Alert:</strong><br>
            If you didn't make this change, please contact our support team immediately at support@uhmdetector.ai
          </div>
          
          <div class="security-recommendations">
            <h3>🛡️ Security Recommendations</h3>
            <ul>
              <li>Use a strong, unique password that you haven't used elsewhere</li>
              <li>Consider enabling two-factor authentication when available</li>
              <li>Never share your login credentials with anyone</li>
              <li>Log out from shared or public computers</li>
              <li>Regularly update your password every 3-6 months</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 14px; margin-top: 30px;">
            Thank you for using UhmDetector.ai to improve your communication skills! 
            If you have any questions or need assistance, our support team is here to help.
          </p>
        </div>
        
        <div class="footer">
          <div style="font-weight: bold; color: #7c3aed; margin-bottom: 10px;">
            🎤 UhmDetector.ai
          </div>
          <p>Improve Your Communication Skills</p>
          <div style="margin: 15px 0;">
            <a href="#" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">Help Center</a> • 
            <a href="#" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">Privacy Policy</a> • 
            <a href="#" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">Contact Support</a>
          </div>
          <p style="margin-top: 15px; font-size: 12px;">
            © 2024 UhmDetector.ai. All rights reserved.<br>
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
🎤 UhmDetector.ai - Password Reset Successful

${userName ? `Hi ${userName}!` : 'Hello!'}

✅ Great news! Your UhmDetector.ai account password has been successfully reset.

You can now log in with your new password and continue improving your communication skills.

🔒 SECURITY ALERT:
If you didn't make this change, please contact our support team immediately at support@uhmdetector.ai

🛡️ SECURITY RECOMMENDATIONS:
- Use a strong, unique password
- Consider enabling two-factor authentication
- Never share your login credentials
- Log out from shared computers
- Update your password regularly

Thank you for using UhmDetector.ai!

© 2024 UhmDetector.ai - Improve Your Communication Skills
This is an automated message, please do not reply to this email.
  `;
  
  return { subject, html, text };
};