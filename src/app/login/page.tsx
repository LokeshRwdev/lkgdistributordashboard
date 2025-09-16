"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  login,
  sendPasswordReset,
  forgotUsername as forgotUsernameAPI,
} from "../../../lib/api/auth";
import { toast, Toaster } from "sonner";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Multi-step login state
  const [step, setStep] = useState(1); // 1 for username, 2 for password

  // Forgot password/username states
  const [showForgotUsername, setShowForgotUsername] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [forgotUsername, setForgotUsername] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const router = useRouter();

  // Step 1: Username submission
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    setError("");
    setStep(2); // Move to password step
  };

  // Step 2: Password submission and login
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ username, password });

      if (response.success && response.data) {
        // Login successful - redirect to dashboard
        console.log("Login successful:", response.data);
        toast.success("Login successful!");
        router.push("/");
      } else {
        // Login failed - show error
        setError(response.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to username step
  const goBackToUsername = () => {
    setStep(1);
    setPassword("");
    setError("");
  };

  // Forgot username API integration
  const handleForgotUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) {
      toast.error("Please enter your mobile number");
      return;
    }

    setIsForgotLoading(true);
    try {
      const response = await forgotUsernameAPI(mobileNumber);

      if (response.success && response.data) {
        toast.success(`Username: ${response.data.username}`);
        setShowForgotUsername(false);
        setMobileNumber("");
      } else {
        toast.error(response.error || "Failed to retrieve username");
      }
    } catch (err) {
      console.error("Forgot username error:", err);
      toast.error("Failed to send username. Please try again.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  // Forgot password API integration
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotUsername) {
      toast.error("Please enter your username");
      return;
    }

    setIsForgotLoading(true);
    try {
      const response = await sendPasswordReset(forgotUsername);

      if (response.success) {
        // Toast success is already handled in the API function
        setShowForgotPassword(false);
        setForgotUsername("");
      } else {
        toast.error(response.error || "Failed to send reset link");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const resetStates = () => {
    setShowForgotUsername(false);
    setShowForgotPassword(false);
    setMobileNumber("");
    setForgotUsername("");
    setError("");
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md flex items-center justify-center">
          {/* Layered shadow effect - only at bottom */}
          <div
            className="absolute inset-0 bg-[#ced4da] rounded-3xl transform translate-y-4 z-20"
            style={{
              width: "94%",
              margin: "auto",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-[#dee2e680] rounded-3xl transform translate-y-8 z-10"
            style={{
              width: "84%",
              margin: "auto",
            }}
          ></div>
          {/* <div className="absolute inset-0 bg-blue-600 rounded-3xl transform translate-y-9 z-20"></div> */}

          {/* Main login card */}
          <div className="relative bg-white rounded-3xl p-10 shadow-2xl z-30">
            {/* Logo */}
            <div className="text-center mb-8">
              <img
                src="https://rucards.app/assets/images/lkg_logo_wide.png"
                alt="Logo"
                className="mx-auto"
              />
            </div>

            {/* Conditional Header Text */}
            <div className="text-center mb-6">
              {showForgotUsername ? (
                <>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Forgot Username?
                  </div>
                  <p className="font-medium text-gray-600">
                    Enter your mobile number to recover username
                  </p>
                </>
              ) : showForgotPassword ? (
                <>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Forgot Password?
                  </div>
                  <p className="font-medium text-gray-600">
                    Enter your username to reset password
                  </p>
                </>
              ) : step === 1 ? (
                <>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome
                  </div>
                  <p className="font-medium text-gray-600">
                    Sign in to continue!
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Hi, {username}!
                  </div>
                  <p className="font-medium text-gray-600">
                    Enter your password to continue
                  </p>
                </>
              )}
            </div>

            {/* Error Message */}
            {error && !showForgotUsername && !showForgotPassword && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Conditional Forms */}
            {showForgotUsername ? (
              /* Forgot Username Form */
              <form onSubmit={handleForgotUsername} className="space-y-6">
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm text-gray-600 mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={resetStates}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading || !mobileNumber}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 font-semibold py-3 px-4 rounded-lg transition-transform duration-150 transform active:scale-95"
                  >
                    {isForgotLoading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>
            ) : showForgotPassword ? (
              /* Forgot Password Form */
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label
                    htmlFor="forgotUsernameInput"
                    className="block text-sm text-gray-600 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="forgotUsernameInput"
                    value={forgotUsername}
                    onChange={(e) => setForgotUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={resetStates}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading || !forgotUsername}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 font-semibold py-3 px-4 rounded-lg transition-transform duration-150 transform active:scale-95"
                  >
                    {isForgotLoading ? "Sending..." : "Send ResetLink"}
                  </button>
                </div>
              </form>
            ) : (
              /* Main Login Form - Multi-step */
              <>
                {step === 1 ? (
                  /* Step 1: Username Input */
                  <form onSubmit={handleUsernameSubmit} className="space-y-6">
                    <div className="relative">
                      <label
                        htmlFor="username"
                        className="absolute left-4 top-3 text-xs text-gray-500 pointer-events-none"
                      >
                        Your email or username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 pt-8 pb-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-gray-50 text-gray-800"
                      />
                      <div className="mt-2 text-sm">
                        <button
                          type="button"
                          onClick={() => setShowForgotUsername(true)}
                          className="text-blue-600 hover:underline"
                        >
                          Forgot username?
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !username}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-150 transform active:scale-95"
                    >
                      Continue
                    </button>
                  </form>
                ) : (
                  /* Step 2: Password Input */
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="relative">
                      <label
                        htmlFor="password"
                        className="absolute left-4 top-3 text-xs text-gray-500 pointer-events-none"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 pt-8 pb-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-gray-50 text-gray-800"
                      />
                      <div className="mt-2 text-sm">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-blue-600 hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={goBackToUsername}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-150 transform active:scale-95"
                      >
                        {isLoading ? "Signing in..." : "Login"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
