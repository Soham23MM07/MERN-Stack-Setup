import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [googleMail, setGoogleMail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const handleSendCode = async () => {
    console.log("inside");
    await axios.post("/api/change/forgot-password", { email, googleMail });
    setDirection("forward");
    setStep(2);
  };

  const handleVerifyCode = async () => {
    await axios.post("/api/change/verify-code", { code });
    setDirection("forward");
    setStep(3);
  };

  const handleResetPassword = async () => {
    await axios.post("/api/change/reset-password", {
      email,
      newPassword,
    });
    alert("Password reset successful!");
    setDirection("forward");
    setStep(1);
    navigate("/login");
  };

  const goBack = () => {
    setDirection("backward");
    setStep(step - 1);
  };

  // Progress indicator steps
  const steps = [
    { number: 1, title: "Send Code" },
    { number: 2, title: "Verify Code" },
    { number: 3, title: "Reset Password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Progress Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= s.number
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-300 text-gray-500"
                  } font-medium text-sm`}
                >
                  {s.number}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    step >= s.number ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
            {/* Progress line */}
            <div className="absolute w-2/3 left-16 top-11 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sliding Container */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: "300%",
              transform: `translateX(-${((step - 1) / 3) * 100}%)`,
            }}
          >
            {/* Step 1: Send Code */}
            <div className="w-1/3 px-6 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Forgot Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="googleMail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enter Your Google Mail where we'll send the verification
                    code
                  </label>
                  <input
                    id="googleMail"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
                    type="email"
                    placeholder="Enter your Google Mail"
                    value={googleMail}
                    onChange={(e) => setGoogleMail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSendCode}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
                >
                  Send Code
                </button>
              </div>
            </div>

            {/* Step 2: Verify Code */}
            <div className="w-1/3 px-6 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Verify Code
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    id="code"
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none"
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={goBack}
                    className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyCode}
                    className="w-2/3 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Reset Password */}
            <div className="w-1/3 px-6 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Reset Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="resetEmail"
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 outline-none"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={goBack}
                    className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="w-2/3 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
