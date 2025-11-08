// import React from "react";

// export const LandingPage = () => {
//   return <div className="text-black">LandingPage</div>;
// };

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "ChatConnect transformed how our remote team communicates. The encryption gives us peace of mind for sensitive discussions.",
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content:
        "The clean interface and real-time messaging make it my go-to app for both work and personal conversations.",
      avatar: "👨‍💻",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "Group chats and media sharing capabilities are exceptional. It's like having an office in your pocket!",
      avatar: "👩‍🎨",
    },
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-200 rounded-full opacity-10 animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-float delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg sm:text-xl">C</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ChatConnect
          </h1>
        </div>
        <div className="flex space-x-2 sm:space-x-4">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg text-indigo-600 hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center relative z-10">
        <div
          className={`md:w-1/2 mb-8 md:mb-0 transition-all duration-700 transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Connect with friends in a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              simple
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              secure
            </span>{" "}
            way
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            Experience seamless messaging with end-to-end encryption, group
            chats, media sharing, and more - all in a clean, intuitive
            interface.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
            <button className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-0.5">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        <div
          className={`md:w-1/2 md:ml-3 flex justify-center mt-8 md:mt-0 transition-all duration-700 transform ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-xl p-2 transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-gray-800 rounded-xl p-2 sm:p-3 flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center text-white text-xs sm:text-sm font-medium">
                chatconnect.com
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg p-3 sm:p-4 mt-2">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
                <div className="flex items-start mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-200 rounded-full mr-2 sm:mr-3"></div>
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <div className="h-3 sm:h-4 bg-gray-300 rounded w-24 sm:w-32 mb-1 sm:mb-2"></div>
                    <div className="h-2 sm:h-3 bg-gray-300 rounded w-32 sm:w-48"></div>
                  </div>
                </div>
                <div className="flex items-start justify-end mb-3 sm:mb-4">
                  <div className="bg-indigo-100 rounded-lg p-2 sm:p-3 mr-2 sm:mr-3">
                    <div className="h-3 sm:h-4 bg-indigo-300 rounded w-20 sm:w-24 mb-1 sm:mb-2"></div>
                    <div className="h-2 sm:h-3 bg-indigo-300 rounded w-24 sm:w-32"></div>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-200 rounded-full"></div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-200 rounded-full mr-2 sm:mr-3"></div>
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <div className="h-2 sm:h-3 bg-gray-300 rounded w-32 sm:w-40 mb-1 sm:mb-2"></div>
                    <div className="h-2 sm:h-3 bg-gray-300 rounded w-28 sm:w-36"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Why Choose ChatConnect?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover the features that make us different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "🔒",
              title: "Military-Grade Encryption",
              description:
                "Your conversations are protected with end-to-end encryption that even we can't access.",
            },
            {
              icon: "⚡",
              title: "Lightning Fast",
              description:
                "Real-time messaging with delivery receipts and read status for instant communication.",
            },
            {
              icon: "🌐",
              title: "Cross-Platform",
              description:
                "Seamlessly switch between your phone, tablet, and computer without missing a beat.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-white/20"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of satisfied users worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            See How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Watch our short demo to discover all the features that make
            ChatConnect the perfect messaging app for your daily communication.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
          <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Your demo video will be embedded here
              </p>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Play Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 sm:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 sm:mb-8 opacity-90 text-sm sm:text-base">
            Join thousands of users who are already enjoying seamless
            communication with ChatConnect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              className="px-6 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
            <button className="px-6 py-3 rounded-lg border border-white text-white font-medium hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-gray-600 text-sm sm:text-base relative z-10">
        <p>© {new Date().getFullYear()} ChatConnect. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="#"
            className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </footer>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
