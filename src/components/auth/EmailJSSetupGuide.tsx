import React, { useState } from 'react';
import { X, ExternalLink, Copy, CheckCircle, Mail, Settings, Code } from 'lucide-react';

interface EmailJSSetupGuideProps {
  onClose: () => void;
}

const EmailJSSetupGuide: React.FC<EmailJSSetupGuideProps> = ({ onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const templateCode = `
// OTP Email Template
Subject: {{subject}}

Hi {{email}},

Your UhmDetector.ai verification code is: {{otp_code}}

This code will expire in 10 minutes.

If you didn't request this password reset, please ignore this email.

Best regards,
The UhmDetector.ai Team
  `.trim();

  const configuredCredentials = `
✅ ALREADY CONFIGURED!

Service ID: service_ymgxdep
Template ID: template_wrws1vf
User ID: ETLxVd3JhYNFJ_dzj

Your EmailJS is ready to send real emails!
  `.trim();

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full mx-4 relative animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Mail className="h-8 w-8 text-success-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">EmailJS Status</h2>
          </div>
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-success-600 mr-3" />
              <div>
                <h3 className="font-semibold text-success-900">EmailJS is Configured!</h3>
                <p className="text-success-700">Your credentials are set up and ready to send real emails.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Configuration */}
          <div className="border border-success-200 rounded-lg p-6 bg-success-50">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-success-600 mr-3" />
              <h3 className="text-lg font-semibold text-success-900">Current Configuration</h3>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard(configuredCredentials, 1)}
                className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                title="Copy credentials"
              >
                {copiedStep === 1 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{configuredCredentials}</code>
              </pre>
            </div>
          </div>

          {/* Template Verification */}
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-slate-900">Verify Your Template</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Make sure your EmailJS template matches this format exactly:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard(templateCode, 2)}
                className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                title="Copy template"
              >
                {copiedStep === 2 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{templateCode}</code>
              </pre>
            </div>
            <div className="mt-4 bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="font-medium text-primary-900 mb-2">Required Variables:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><code className="bg-primary-100 px-2 py-1 rounded">{"{{email}}"}</code> - Recipient email</div>
                <div><code className="bg-primary-100 px-2 py-1 rounded">{"{{subject}}"}</code> - Email subject</div>
                <div><code className="bg-primary-100 px-2 py-1 rounded">{"{{otp_code}}"}</code> - OTP code</div>
              </div>
            </div>
          </div>

          {/* Testing Instructions */}
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-warning-600 mr-3" />
              <h3 className="text-lg font-semibold text-slate-900">Test Your Setup</h3>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600">
                Your EmailJS is configured and ready! Test the password reset functionality:
              </p>
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <h4 className="font-medium text-warning-900 mb-2">Testing Steps:</h4>
                <ol className="text-sm text-warning-800 space-y-1 list-decimal list-inside">
                  <li>Go to the login page</li>
                  <li>Click "Forgot your password?"</li>
                  <li>Enter your email address</li>
                  <li>Check your email for the OTP code</li>
                  <li>Enter the code to reset your password</li>
                </ol>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 mb-2">Troubleshooting:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Check spam/junk folders if emails don't arrive</li>
                  <li>• Verify your EmailJS template has the correct variables</li>
                  <li>• Ensure your email service is properly connected in EmailJS</li>
                  <li>• Check the browser console for any error messages</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ExternalLink className="h-6 w-6 text-slate-600 mr-3" />
              <h3 className="text-lg font-semibold text-slate-900">Additional Resources</h3>
            </div>
            <div className="space-y-3">
              <a
                href="https://www.emailjs.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                EmailJS Documentation
              </a>
              <a
                href="https://dashboard.emailjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors ml-3"
              >
                <Settings className="h-4 w-4 mr-2" />
                EmailJS Dashboard
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Perfect, let's test it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailJSSetupGuide;