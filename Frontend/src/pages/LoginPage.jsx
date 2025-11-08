// import React, { useState } from "react";
// import * as yup from "yup";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/authContext";
// const Schema = yup.object().shape({
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email format"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });

// export const LoginPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { setauthUser, setIsAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(Schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log("✅ Form Submitted Data:", data);
//       setLoading(true);
//       const response = await axios.post("/api/auth/login", data);
//       console.log(response);

//       if (response.status !== 201) {
//         throw new Error("Backend Error");
//       }

//       console.log("Response", response.data);
//       reset();
//       localStorage.setItem("userinfo", JSON.stringify(response.data));
//       await setauthUser(JSON.parse(localStorage.getItem("userinfo")));
//       await setIsAuthenticated(true);
//       toast.success("Sucessfully");

//       navigate("/dashboard"); // redirect after successful login
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Sorry for inconvience");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[86vh] w-full flex justify-center items-center">
//       <div className=" min-w-md  bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-2 font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               {...register("email")}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="your.email@example.com"
//               autoComplete="email"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-2 font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               {...register("password")}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your password"
//               autoComplete="current-password"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
//           >
//             {loading ? "Loading" : "Login"}
//           </button>

//           {/* Register Link */}
//           <p className="text-center text-gray-600 text-sm">
//             Don’t have an account?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/register")}
//               className="text-indigo-600 hover:underline"
//             >
//               Register
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import * as yup from "yup";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/authContext";

// const Schema = yup.object().shape({
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email format"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });

// export const LoginPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { setauthUser, setIsAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(Schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log("✅ Form Submitted Data:", data);
//       setLoading(true);
//       const response = await axios.post("/api/auth/login", data);
//       console.log(response);

//       if (response.status !== 201) {
//         throw new Error("Backend Error");
//       }

//       console.log("Response", response.data);
//       reset();
//       localStorage.setItem("userinfo", JSON.stringify(response.data));
//       await setauthUser(JSON.parse(localStorage.getItem("userinfo")));
//       await setIsAuthenticated(true);
//       toast.success("Login successful!");

//       navigate("/dashboard"); // redirect after successful login
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Invalid credentials. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Left Section - Brand/App Info */}
//       <div className="hidden lg:flex lg:w-1/2 bg-green-600 text-white p-12 flex-col justify-between">
//         <div>
//           <div className="flex items-center mb-16">
//             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-6 h-6 text-green-600"
//               >
//                 <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
//                 <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.83.157l1.435-1.442a.75.75 0 00.1-.075c.255-.237.645-.418 1.086-.534.968-.25 1.687-1.11 1.687-2.068V10.61c0-1.505-1.125-2.811-2.664-2.94A49.204 49.204 0 0015.75 7.5z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold">ChatApp</h1>
//           </div>

//           <h2 className="text-4xl font-bold mt-24 mb-6">Welcome to ChatApp</h2>
//           <p className="text-xl opacity-90 max-w-md">
//             Connect with your friends and family through instant messaging.
//             Simple, secure, and reliable.
//           </p>
//         </div>

//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center mr-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//           <p className="text-sm opacity-80">
//             End-to-end encrypted. Your privacy is our priority.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Login Form */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile logo */}
//           <div className="flex items-center justify-center mb-10 lg:hidden">
//             <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mr-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-6 h-6 text-white"
//               >
//                 <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
//                 <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.83.157l1.435-1.442a.75.75 0 00.1-.075c.255-.237.645-.418 1.086-.534.968-.25 1.687-1.11 1.687-2.068V10.61c0-1.505-1.125-2.811-2.664-2.94A49.204 49.204 0 0015.75 7.5z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">ChatApp</h1>
//           </div>

//           <h2 className="text-3xl font-bold mb-2 text-gray-800">
//             Welcome back
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Sign in to continue to your account
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 {...register("email")}
//                 className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="your.email@example.com"
//                 autoComplete="email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 {...register("password")}
//                 className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>

//             {/* Register Link */}
//             <p className="text-center text-gray-600 text-sm mt-6">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/register")}
//                 className="text-green-600 hover:underline font-medium"
//               >
//                 Create account
//               </button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

const Schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("✅ Form Submitted Data:", data);
      setLoading(true);
      const response = await axios.post("/api/auth/login", data);
      console.log(response);

      if (response.status !== 201) {
        throw new Error("Backend Error");
      }

      console.log("Response", response.data);
      reset();
      localStorage.setItem("userinfo", JSON.stringify(response.data));
      await setauthUser(JSON.parse(localStorage.getItem("userinfo")));
      await setIsAuthenticated(true);
      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Left Section - Brand/App Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-blue-300 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-16">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-white/30">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              ChatConnect
            </h1>
          </div>

          <h2 className="text-4xl font-bold mt-24 mb-6 leading-tight">
            Welcome to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              ChatConnect
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-md leading-relaxed">
            Connect with your friends and family through instant messaging.
            Simple, secure, and reliable.
          </p>
        </div>

        <div className="flex items-center relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm opacity-80">
            End-to-end encrypted. Your privacy is our priority.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-6 lg:hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">ChatConnect</h1>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Welcome back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700 text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`pl-9 w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-700 text-sm"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`pl-9 w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-xs">
                <a
                  href="/forgotpass"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium flex items-center justify-center shadow-md hover:shadow-lg text-sm"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Sign in
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  New to ChatConnect?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                Create your account
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ChatConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
