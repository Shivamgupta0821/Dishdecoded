import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { saveUserData } from "../utils/userDataManager";

import { 
  Eye, 
  EyeOff, 
  Apple, 
  Mail, 
  Utensils, 
  Sparkles, 
  Shield, 
  Zap,
  Chrome,
  Check,
  X,
  AlertCircle
} from "lucide-react";

interface AuthFormProps {
  onAuthComplete: () => void;
}

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
const getPasswordStrength = (password: string) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  if (checks.length) strength++;
  if (checks.uppercase) strength++;
  if (checks.lowercase) strength++;
  if (checks.number) strength++;
  if (checks.special) strength++;
  
  return { strength, checks };
};

export function AuthForm({ onAuthComplete }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Form validation states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    
    // Validate email
    if (!isValidEmail(loginEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    // Validate password is not empty
    if (loginPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete();
    }, 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    
    // Validate email
    if (!isValidEmail(signupEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    // Validate password strength
    const { strength, checks } = getPasswordStrength(signupPassword);
    if (strength < 3) {
      setPasswordError("Password is too weak. Please meet at least 3 requirements.");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      saveUserData({ name: signupName, email: signupEmail });
      onAuthComplete();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete();
    }, 1000);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Simplified background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-slate-800/50 shadow-2xl border border-slate-700/50">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-xl">Reset Password</CardTitle>
              <CardDescription className="text-white/70">
                Enter your email to receive reset instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-white/90">Email</Label>
                  <Input 
                    id="reset-email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Simplified decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🍽️
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Branding */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto mb-4 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-30"
              />
              <span className="text-white text-3xl relative z-10">🍽️</span>
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            DishDecoded
          </h1>
          <p className="text-white/70 font-medium">Your AI nutrition companion</p>
          
          <div className="flex justify-center gap-4 mt-4 text-xs text-white/50">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Instant
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="bg-slate-800/50 shadow-2xl border border-slate-700/50">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 border border-white/20">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-white/70"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-white/70"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-white/90">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 focus:ring-green-500/20"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          setEmailError("");
                        }}
                        required 
                      />
                      {emailError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {emailError}
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-white/90">Password</Label>
                      <div className="relative">
                        <Input 
                          id="login-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 focus:ring-green-500/20 pr-10"
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            setPasswordError("");
                          }}
                          required 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/60 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {passwordError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {passwordError}
                        </motion.div>
                      )}
                    </div>

                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto text-sm text-green-400 hover:text-green-300"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </Button>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Signing in...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-white/90">Full Name</Label>
                      <Input 
                        id="signup-name" 
                        type="text" 
                        placeholder="Enter your full name" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 focus:ring-green-500/20"
                        value={signupName}
                        onChange={(e) => {
                          setSignupName(e.target.value);
                        }}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white/90">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 focus:ring-green-500/20"
                        value={signupEmail}
                        onChange={(e) => {
                          setSignupEmail(e.target.value);
                          setEmailError("");
                        }}
                        required 
                      />
                      {emailError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {emailError}
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white/90">Password</Label>
                      <div className="relative">
                        <Input 
                          id="signup-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 focus:ring-green-500/20 pr-10"
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value);
                            setPasswordError("");
                          }}
                          required 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/60 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      {/* Password strength indicator */}
                      {signupPassword && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2 mt-2"
                        >
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => {
                              const { strength } = getPasswordStrength(signupPassword);
                              return (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded-full transition-all ${
                                    level <= strength
                                      ? strength <= 2
                                        ? "bg-red-500"
                                        : strength <= 3
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                      : "bg-white/10"
                                  }`}
                                />
                              );
                            })}
                          </div>
                          
                          <div className="space-y-1">
                            {(() => {
                              const { checks } = getPasswordStrength(signupPassword);
                              return (
                                <>
                                  <PasswordRequirement
                                    met={checks.length}
                                    text="At least 8 characters"
                                  />
                                  <PasswordRequirement
                                    met={checks.uppercase}
                                    text="One uppercase letter"
                                  />
                                  <PasswordRequirement
                                    met={checks.lowercase}
                                    text="One lowercase letter"
                                  />
                                  <PasswordRequirement
                                    met={checks.number}
                                    text="One number"
                                  />
                                  <PasswordRequirement
                                    met={checks.special}
                                    text="One special character"
                                  />
                                </>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                      
                      {passwordError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {passwordError}
                        </motion.div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Separator className="my-4 bg-white/20" />
                <p className="text-center text-sm text-white/60 mb-4">Or continue with</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <Chrome className="h-4 w-4" />
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <Apple className="h-4 w-4" />
                    Apple
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Password requirement indicator component
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? "text-green-400" : "text-white/50"}`}>
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );
}