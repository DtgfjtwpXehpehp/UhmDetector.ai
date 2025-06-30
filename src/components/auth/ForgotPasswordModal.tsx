import React, { useState } from 'react';
import { X, Send, ArrowLeft, Mail, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'password' | 'success';

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [lastOTPRequest, setLastOTPRequest] = useState<number>(0);
  const { requestPasswordReset, verifyOTP, resetPasswordWithOTP, isLoading } = useAuthStore();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await requestPasswordReset(email.trim());
      setLastOTPRequest(Date.now());
      setOtp(''); // Clear any previous OTP input
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOTP = otp.trim().replace(/\s/g, ''); // Remove all whitespace
    
    if (cleanOTP.length !== 6 || !/^\d{6}$/.test(cleanOTP)) {
      setError('Please enter a valid 6-digit OTP (numbers only)');
      return;
    }

    try {
      await verifyOTP(email.trim(), cleanOTP);
      setStep('password');
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setError(err.message || 'Invalid OTP');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const cleanOTP = otp.trim().replace(/\s/g, '');
      await resetPasswordWithOTP(email.trim(), cleanOTP, newPassword);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');
    
    try {
      await requestPasswordReset(email.trim());
      setLastOTPRequest(Date.now());
      setOtp(''); // Clear the OTP input when resending
      setError(''); // Clear any previous errors
      // Show success message briefly
      setError('New OTP sent successfully! Please check your email for the latest code.');
      setTimeout(() => setError(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 6 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const renderEmailStep = () => (
    <>
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Your Password</h2>
        <p className="text-slate-600">
          Enter your email address and we'll send you a 6-digit verification code.
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary flex-1"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Verification Code
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );

  const renderOTPStep = () => (
    <>
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Key className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Enter Verification Code</h2>
        <p className="text-slate-600">
          We've sent a 6-digit code to <strong>{email}</strong>. Please check your email and enter the code below.
        </p>
      </div>

      <form onSubmit={handleOTPSubmit} className="space-y-6">
        {error && (
          <div className={`px-4 py-3 rounded-lg text-sm flex items-start gap-2 ${
            error.includes('successfully') 
              ? 'bg-success-50 border border-success-200 text-success-700'
              : 'bg-error-50 border border-error-200 text-error-700'
          }`}>
            {error.includes('successfully') ? (
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            )}
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOTPChange}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-center text-2xl font-mono tracking-widest"
            placeholder="000000"
            maxLength={6}
            pattern="[0-9]{6}"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Enter the 6-digit code from your email (numbers only)</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            {isResending ? 'Sending new code...' : 'Send New Code'}
          </button>
          {lastOTPRequest > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              Make sure to use the most recent code from your email
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="btn btn-primary flex-1"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Verify Code'
            )}
          </button>
          <button
            type="button"
            onClick={() => setStep('email')}
            className="btn btn-outline flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </form>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Key className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New Password</h2>
        <p className="text-slate-600">
          Enter your new password below. Make sure it's secure and easy to remember.
        </p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary flex-1"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Reset Password'
            )}
          </button>
          <button
            type="button"
            onClick={() => setStep('otp')}
            className="btn btn-outline flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </form>
    </>
  );

  const renderSuccessStep = () => (
    <div className="text-center">
      <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-success-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Password Reset Successful!</h2>
      <p className="text-slate-600 mb-6">
        Your password has been successfully reset. You can now log in with your new password.
      </p>
      <button
        onClick={onClose}
        className="btn btn-primary w-full"
      >
        Continue to Login
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'email' && renderEmailStep()}
        {step === 'otp' && renderOTPStep()}
        {step === 'password' && renderPasswordStep()}
        {step === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;