
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

type AuthMode = 'login' | 'register' | 'otp-choice' | 'otp-verify';
type OTPMethod = 'email' | 'phone';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [otpMethod, setOtpMethod] = useState<OTPMethod>('email');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const user = {
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
      };
      
      login(user);
      
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to dashboard...",
      });
      
      // Redirect to home
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object and auto-login after registration
      const user = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
      };
      
      login(user);
      
      toast({
        title: "Registration Successful",
        description: "Account created successfully! Redirecting to home...",
      });
      
      // Redirect to home
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    
    try {
      // Simulate OTP send API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${otpMethod}`,
      });
      setMode('otp-verify');
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const contactValue = otpMethod === 'email' ? formData.email : formData.phone;
      const user = {
        id: Date.now().toString(),
        name: contactValue.split('@')[0] || 'User',
        email: otpMethod === 'email' ? formData.email : `${formData.phone}@phone.com`,
      };
      
      login(user);
      
      toast({
        title: "Verification Successful",
        description: "Welcome! Redirecting to home...",
      });
      
      // Redirect to home
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your WanderNestle account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="link"
              onClick={() => setMode('otp-choice')}
              className="text-sm"
            >
              Sign in with OTP instead
            </Button>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                type="button"
                variant="link"
                onClick={() => setMode('register')}
                className="p-0 h-auto font-medium text-primary"
              >
                Create one
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderRegisterForm = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>Join WanderNestle today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button
              type="button"
              variant="link"
              onClick={() => setMode('login')}
              className="p-0 h-auto font-medium text-primary"
            >
              Sign in
            </Button>
          </p>
        </form>
      </CardContent>
    </Card>
  );

  const renderOTPChoice = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Secure Login
        </CardTitle>
        <CardDescription>Choose your preferred verification method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button
            variant={otpMethod === 'email' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => setOtpMethod('email')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send OTP to Email
          </Button>
          <Button
            variant={otpMethod === 'phone' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => setOtpMethod('phone')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Send OTP to Phone
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact">
            {otpMethod === 'email' ? 'Email Address' : 'Phone Number'}
          </Label>
          <Input
            id="contact"
            name={otpMethod}
            type={otpMethod === 'email' ? 'email' : 'tel'}
            placeholder={otpMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
            value={otpMethod === 'email' ? formData.email : formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <Button onClick={handleSendOTP} className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Verification Code'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setMode('login')}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Password Login
        </Button>
      </CardContent>
    </Card>
  );

  const renderOTPVerify = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Enter Verification Code</CardTitle>
        <CardDescription>
          We sent a 6-digit code to your {otpMethod === 'email' ? 'email' : 'phone number'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-center block">Verification Code</Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
          
          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="link"
              onClick={handleSendOTP}
              className="text-sm"
              disabled={isLoading}
            >
              Didn't receive code? Resend
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMode('otp-choice')}
              className="w-full text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change verification method
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="w-full max-w-md">
          {mode === 'login' && renderLoginForm()}
          {mode === 'register' && renderRegisterForm()}
          {mode === 'otp-choice' && renderOTPChoice()}
          {mode === 'otp-verify' && renderOTPVerify()}
        </div>
      </div>
    </div>
  );
}
