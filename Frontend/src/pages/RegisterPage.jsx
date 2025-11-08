// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/authContext";
// const schema = yup.object().shape({
//   fullName: yup
//     .string()
//     .required("Full Name is required")
//     .min(5, "Full Name must be at least 5 characters"),
//   userName: yup
//     .string()
//     .required("User Name is required")
//     .min(3, "User Name must be at least 3 characters"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email format"),
//   gender: yup.string().required("Gender is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
//   profilepic: yup
//     .mixed()
//     .required("Profile picture is required")
//     .test("fileSize", "File size too large", (value) => {
//       return value && value[0] && value[0].size <= 5 * 1024 * 1024;
//     })
//     .test("fileType", "Unsupported file format", (value) => {
//       return (
//         value &&
//         value[0] &&
//         ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
//       );
//     }),
// });

// export const RegisterPage = () => {
//   const { setauthUser, setIsAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log("✅ Form Submitted Data:", data);
//       setLoading(true);
//       console.log("Soham");

//       const formData = new FormData();
//       console.log("profilepic", data.profilepic[0]);

//       formData.append("profilepic", data.profilepic[0]);
//       console.log("formData", formData);

//       const image = await axios.post("/api/image/profileupload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Image", image);

//       const response = await axios.post("/api/auth/register", {
//         fullName: data.fullName,
//         gender: data.gender,
//         email: data.email,
//         userName: data.userName,
//         password: data.password,
//         profilepic: image.data.imageUrl, // ✅ sending as plain string
//       });

//       if (response.status !== 201) {
//         throw new Error("Backend Error");
//       }

//       console.log("req", response.data);

//       localStorage.setItem("userReginfo", JSON.stringify(response.data));
//       await setauthUser(JSON.parse(localStorage.getItem("userReginfo")));
//       toast.success("Register Successfully");
//       reset();
//       navigate("/login");
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlelogin = () => {
//     console.log("Navigate to login page");
//     navigate("/login");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-[20px]">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
//         User Registration
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
//         {/* Full Name */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Profile Picture
//           </label>
//           <input
//             type="file"
//             {...register("profilepic")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.profilepic ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.profilepic && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.profilepic.message}
//             </p>
//           )}
//           <label
//             htmlFor="fullName"
//             className="block mb-2 font-medium text-gray-700"
//           >
//             Full Name
//           </label>
//           <input
//             id="fullName"
//             type="text"
//             {...register("fullName")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//               errors.fullName ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter your full name"
//             autoComplete="name"
//           />
//           {errors.fullName && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.fullName.message}
//             </p>
//           )}
//         </div>

//         {/* User Name */}
//         <div>
//           <label
//             htmlFor="userName"
//             className="block mb-2 font-medium text-gray-700"
//           >
//             User Name
//           </label>
//           <input
//             id="userName"
//             type="text"
//             {...register("userName")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//               errors.userName ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Choose a username"
//             autoComplete="username"
//           />
//           {errors.userName && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.userName.message}
//             </p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label
//             htmlFor="email"
//             className="block mb-2 font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="your.email@example.com"
//             autoComplete="email"
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Gender */}
//         <div>
//           <label
//             htmlFor="gender"
//             className="block mb-2 font-medium text-gray-700"
//           >
//             Gender
//           </label>
//           <select
//             id="gender"
//             {...register("gender")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 ${
//               errors.gender ? "border-red-500" : "border-gray-300"
//             }`}
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Select your gender
//             </option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && (
//             <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div>
//           <label
//             htmlFor="password"
//             className="block mb-2 font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register("password")}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
//               errors.password ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Create a password"
//             autoComplete="new-password"
//           />
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
//         >
//           {loading ? "Loading" : "Submit"}
//         </button>
//         <div className="text-center text-gray-600 text-sm">
//           Already Have Account ?{" "}
//           <button
//             type="button"
//             onClick={handlelogin}
//             className="text-indigo-600 underline"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(5, "Full Name must be at least 5 characters"),
  userName: yup
    .string()
    .required("User Name is required")
    .min(3, "User Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  profilepic: yup
    .mixed()
    .required("Profile picture is required")
    .test("fileSize", "File size too large", (value) => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
});

export const RegisterPage = () => {
  const { setauthUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("✅ Form Submitted Data:", data);
      setLoading(true);

      const formData = new FormData();
      formData.append("profilepic", data.profilepic[0]);

      const image = await axios.post("/api/image/profileupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await axios.post("/api/auth/register", {
        fullName: data.fullName,
        gender: data.gender,
        email: data.email,
        userName: data.userName,
        password: data.password,
        profilepic: image.data.imageUrl,
      });

      if (response.status !== 201) {
        throw new Error("Backend Error");
      }

      localStorage.setItem("userReginfo", JSON.stringify(response.data));
      await setauthUser(JSON.parse(localStorage.getItem("userReginfo")));
      toast.success("Registration successful!");
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlelogin = () => {
    navigate("/login");
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
            Join Our <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              Community
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-md leading-relaxed">
            Create your account and start connecting with friends and family
            through secure, instant messaging.
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
            Your privacy is protected with end-to-end encryption.
          </p>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-3 sm:p-4">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-4 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-2 shadow-md">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">ChatConnect</h1>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-600 text-xs">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Profile Picture */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-xs">
                Profile Picture
              </label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    {...register("profilepic")}
                    className={`w-full px-2 py-1.5 text-xs text-gray-700 font-semibold border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      errors.profilepic ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.profilepic && (
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
                      {errors.profilepic.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 font-medium text-gray-700 text-xs"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className={`pl-7 w-full px-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
                    errors.fullName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              {errors.fullName && (
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
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* User Name */}
            <div>
              <label
                htmlFor="userName"
                className="block mb-1 font-medium text-gray-700 text-xs"
              >
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </div>
                <input
                  id="userName"
                  type="text"
                  {...register("userName")}
                  className={`pl-7 w-full px-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
                    errors.userName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
              </div>
              {errors.userName && (
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
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700 text-xs"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 text-gray-400"
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
                  className={`pl-7 w-full px-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
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

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block mb-1 font-medium text-gray-700 text-xs"
              >
                Gender
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm4 6a3 3 0 01-3 3h-2a3 3 0 01-3-3v-1h8v1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <select
                  id="gender"
                  {...register("gender")}
                  className={`pl-7 w-full px-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 ${
                    errors.gender ? "border-red-500" : "border-gray-200"
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && (
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
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700 text-xs"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg
                    className="h-3 w-3 text-gray-400"
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
                  className={`pl-7 w-full px-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Create a password"
                  autoComplete="new-password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium flex items-center justify-center shadow-sm hover:shadow text-xs"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
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
                  Creating account...
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Create Account
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500 text-xs">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={handlelogin}
                className="w-full inline-flex justify-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                Sign in to your account
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ChatConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
