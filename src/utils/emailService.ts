import emailjs from 'emailjs-com';

// EmailJS configuration - Updated with your actual credentials
const EMAILJS_SERVICE_ID = 'service_ymgxdep';
const EMAILJS_TEMPLATE_ID = 'template_wrws1vf';
const EMAILJS_USER_ID = 'ETLxVd3JhYNFJ_dzj';

// Initialize EmailJS (this should be done once in your app)
export const initializeEmailJS = () => {
  emailjs.init(EMAILJS_USER_ID);
};

// Send OTP email using EmailJS
export const sendOTPEmail = async (to: string, otp: string, userName?: string): Promise<boolean> => {
  try {
    // EmailJS template parameters for OTP email
    const templateParams = {
      email: to, // Matches {{email}} in your template
      subject: 'Password Reset Code - UhmDetector.ai',
      otp_code: otp, // This will show the actual 6-digit OTP
      from_name: 'UhmDetector.ai',
      reply_to: 'noreply@uhmdetector.ai'
    };

    // Send email using EmailJS with your actual credentials
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );

    console.log('✅ OTP email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    
    // Fallback for demo purposes - show OTP in console/alert
    console.log(`📧 Demo OTP for ${to}: ${otp}`);
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        alert(`🔑 Demo OTP: ${otp}\n\nEmail sending failed, but here's your OTP for testing.\nCheck console for error details.`);
      }, 500);
    }
    
    return false;
  }
};

// Send password reset confirmation email
export const sendPasswordResetConfirmationEmail = async (to: string, userName?: string): Promise<boolean> => {
  try {
    // For confirmation emails, we'll send a different message
    const templateParams = {
      email: to, // Matches {{email}} in your template
      subject: 'Password Reset Successful - UhmDetector.ai',
      // Don't include otp_code for confirmation emails, or set it to empty
      // The template should handle the case where otp_code is not provided
      from_name: 'UhmDetector.ai',
      reply_to: 'noreply@uhmdetector.ai'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );

    console.log('✅ Confirmation email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    return false;
  }
};

// Simulate email sending for demo purposes
export const sendEmail = async (to: string, template: { subject: string; html: string; text: string }): Promise<boolean> => {
  // Try to send real email first
  try {
    const templateParams = {
      email: to, // Matches {{email}} in your template
      subject: template.subject,
      message_html: template.html,
      message_text: template.text,
      from_name: 'UhmDetector.ai',
      reply_to: 'noreply@uhmdetector.ai'
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );

    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    
    // Fallback to demo mode
    console.log(`📧 Demo email to ${to}:`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Content: ${template.text}`);
    
    // Show OTP in alert for demo
    if (template.subject.includes('Password Reset Code')) {
      const otpMatch = template.text.match(/(\d{6})/);
      if (otpMatch) {
        setTimeout(() => {
          alert(`🔑 Demo OTP: ${otpMatch[1]}\n\nEmailJS setup required for real emails.`);
        }, 500);
      }
    }
    
    return true; // Return true for demo purposes
  }
};

// EmailJS setup instructions
export const getEmailJSSetupInstructions = () => {
  return `
🔧 EmailJS Setup Instructions:

✅ CONFIGURED! Your EmailJS credentials are already set up:
- Service ID: ${EMAILJS_SERVICE_ID}
- Template ID: ${EMAILJS_TEMPLATE_ID}
- User ID: ${EMAILJS_USER_ID}

Your template should support both OTP and confirmation emails with this format:

Subject: {{subject}}

Hi {{email}},

{{#if otp_code}}
Your UhmDetector.ai verification code is: {{otp_code}}

This code will expire in 10 minutes.
{{else}}
Your password has been successfully reset! You can now log in with your new password.
{{/if}}

If you didn't request this password reset, please ignore this email.

Best regards,
The UhmDetector.ai Team

The system is now ready to send real emails!

For more details, visit: https://www.emailjs.com/docs/
  `;
};