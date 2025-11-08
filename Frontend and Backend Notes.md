# React + Vite + Tailwind + DaisyUI Setup & Best Practices

---

## 1️⃣ Project Setup

### Create Frontend folder & Vite project

```bash
npm create vite@latest .
```

- Downloads **template files**: `package.json`, `vite.config.js`, source files, etc.
- Dependencies are listed but **not installed yet**.

### Install dependencies

```bash
npm i
```

- Reads `package.json` and installs all dependencies into `node_modules`.

### Difference

- `npm init` → Creates a new `package.json`.
- `npm i` → Installs all dependencies listed in `package.json`.

---

## 2️⃣ Tailwind CSS + DaisyUI Setup + Shadcn UI

- Follow [Tailwind CSS docs for Vite](https://tailwindcss.com/docs/guides/vite).
- Follow [DaisyUI docs for Vite](https://daisyui.com/docs/install/).
- Follow [Shadcn docs for Vite](https://ui.shadcn.com/docs/installation/vite).
  **For this it will not create jsconfig.json file by itself we have to create it and we have to keep only this**

```javascript
{
  "files": [],
  "references": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Tech roles**

- **Vite** → Fast development & build tool
- **Tailwind CSS** → Utility-first styling
- **DaisyUI** → Ready-made Tailwind components & themes

---

## 3️⃣ React Hot Toast and Browser Router

- **npm i react-hot-toast**

```javascript
<Toaster
  position="top-center"
  toastOptions={{
    style: {
      fontSize: "15px",
      borderRadius: "12px",
      padding: "10px 16px",
      fontWeight: 500,
      color: "#fff",
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    },
    success: {
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #16a34a, #22c55e)", // deep professional green
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#16a34a",
      },
    },
    error: {
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #dc2626, #ef4444)", // elegant red
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#dc2626",
      },
    },
    loading: {
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #2563eb, #3b82f6)", // strong blue
      },
    },
  }}
/>
```

- **npm i react-router-dom**

---

## 3️⃣ Folder Structure

```javascript
{
  "files": [],
  "references": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 3️⃣ Clerk Authentication

- Follow [Clerk docs for Vite](https://clerk.com/docs/react/getting-started/quickstart).

```javascript
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
```

---

## 3️⃣ React Routing {Nesting}

```javascript
//All Routes File
export const AllRoutes = () => {
  return (
    <Routes>
      `{/* Protected / Nested Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Default (index) route */}
        <Route index element={<Profile />} />
        {/* Nested child routes */}
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      {/* Optional 404 Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  // Dashboard File
  import { Outlet, Link } from "react-router-dom";
  export const Dashboard = () => {
    return (
      <div>
        Dashboard
        <nav>
          <Link to="profile">Profile</Link>
          <Link to="settings">Settings</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    );
  };
};
```

---

## 3️⃣ VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** → Faster React component & hook snippets

---

## 4️⃣ Naming Conventions

- **Folder names:** small letters → `frontend`, `components`
- **File names:** PascalCase → `LoginForm.jsx`

---

## 5️⃣ Forms in React

### Install libraries

```bash
npm install react-hook-form yup @hookform/resolvers
```

- `yup` → Schema validation
- `@hookform/resolvers` → Connect `yup` with `react-hook-form`

### Yup schema example

```javascript
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required").min(5),
  userName: yup.string().required("Username is required").min(5),
  email: yup.string().required("Email is required").email(),
  gender: yup.string().required("Gender is required"),
  password: yup.string().required("Password is required").min(6),
});
```

### React Hook Form setup

```javascript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  resolver: yupResolver(schema),
});
```

### Example input field

```jsx
<div>
  <label htmlFor="fullName">Full Name</label>
  <input
    id="fullName"
    type="text"
    {...register("fullName")}
    className={`border ${
      errors.fullName ? "border-red-500" : "border-gray-300"
    }`}
  />
  {errors.fullName && <p>{errors.fullName.message}</p>}
</div>
```

> ⚠️ Hooks must be **called inside a function component**, not outside or conditionally.

---

## 6️⃣ Vite Config for API Proxy

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

---

## 7️⃣ React Context API

- Avoid **prop drilling** → share state globally.

```javascript
import { createContext, useContext, useState } from "react";

//create a context
export const AuthContext = createContext();

// export the context
export const useAuth = () => useContext(AuthContext);

// context provider transfer
export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("userinfo") || null)
  );

  return (
    <AuthContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 8️⃣ React State Update Tips

- `setState` is **asynchronous**

```javascript
const handleuserSelection = (user) => {
  setselectedConversation(user);
  console.log(selectedConversation); // old value
};
```

- Updated value is available **after re-render**.

---

## 9️⃣ Date Formatting in JSX

```jsx
{
  new Date(e?.createdAt).toLocaleDateString("en-IN");
}
{
  new Date(e?.createdAt).toLocaleDateString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });
}
```

---

## 🔹 Other Tips

1. **Never render objects directly** inside a `<div>`
2. **BSON cast errors** → usually due to **duplicate/matching routes**

# 📂 Cloudinary & Multer Full Setup

This document contains all the code required to configure **Cloudinary**, **Multer**, and upload images either from a frontend upload or from a remote URL (e.g., Discord attachments).

```js
// -------------------- Imports --------------------
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";
import multer from "multer";
import fetch from "node-fetch";

dotenv.config({ path: "./.env" });

// -------------------- Cloudinary Setup --------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

// Upload buffer to Cloudinary
export const uploadBufferToCloudinary = (buffer, filename = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "bindspace",
        public_id: filename,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Delete file from Cloudinary
export const deletefromcloudniary = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Cloudinary file deleted:", result);
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error.message);
    return null;
  }
};

// -------------------- Multer Setup --------------------
// Memory storage (no disk write)

import multer from "multer";
const storage = multer.memoryStorage();

// File filter (only images)

const fileFilter = (req, file, cb) => {
  // Allow images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  }
  // Allow videos
  else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  }
  // Allow documents
  else if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "text/plain"
  ) {
    cb(null, true);
  }
  // Allow audio files
  else if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  }
  // Reject other file types
  else {
    cb(
      new Error(
        "Unsupported file type! Only images, videos, documents, and audio files are allowed."
      ),
      false
    );
  }
};

// Multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Multer Upload Video
export const uploadvideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
});
export const uploaddoc = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
});

// -------------------- Upload Image for uploading buffer to cloudinary -----------------
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.files?.profilepic?.[0]; // ✅ must match the field name in multer config
    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );

    console.log("Result", result.secure_url);

    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Image upload failed:", error.message);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};

// -------------------- Upload from Remote URL --------------------
export async function downloadImageBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Example usage: Upload remote image to Cloudinary
export async function uploadRemoteImage(imageUrl, userId) {
  try {
    const buffer = await downloadImageBuffer(imageUrl);
    const publicId = `user_${userId}_img${Date.now()}`;
    const cloudinaryResult = await uploadBufferToCloudinary(buffer, publicId);
    console.log("Uploaded to Cloudinary:", cloudinaryResult.secure_url);
    return cloudinaryResult.secure_url;
  } catch (err) {
    console.error("Error uploading remote image:", err);
    return null;
  }
}
```

# 📌 Context API

```js
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useAuth } from "./authContext";

// Create Context
const SocketContext = createContext();

// Export Context
export const useSocketContext = () => {
return useContext(SocketContext);
};

// Export Context Provider

export const SocketContextProvider = ({ children }) => {
const [socket, setSocket] = useState(null);
const [onlineUser, setOnlineUser] = useState([]);
const { authUser } = useAuth();

useEffect(() => {
if (authUser) {
const socket = io("http://localhost:8000", {
query: {
userId: authUser?.\_id,
},
});
socket.on("getOnlineUsers", (users) => {
console.log("SocketContextApi", users);
setOnlineUser(users);
});
setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

}, [authUser]);
return (
<SocketContext.Provider value={{ socket, onlineUser }}>
{children}
</SocketContext.Provider>
);
};

```

# 📌 Zustand Store: User Conversation

This is a simple **Zustand store** for managing user conversations and messages in a React app.

---

```js
import { create } from "zustand";

const userConversation = create((set) => ({
  selectedConversation: null,
  setselectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default userConversation;
```

# Difference Between Zustand and Context API

## 1. Common Purpose

- Both **Context API** and **Zustand** are used to avoid **prop drilling** —  
  i.e., passing props manually through multiple nested components.

---

## 2. State Management Behavior

- **Context API**:

  - When context value changes, **all components consuming that context re-render**.
  - Can cause unnecessary renders if data is large or frequently updated.

- **Zustand**:
  - State updates are **selective**.
  - Only components that subscribe to the specific part of the state will re-render.
  - More efficient for performance.

---

## 3. Data Handling

- **Context API**:

  - Good for **small to medium state** (e.g., theme, auth user, language settings).
  - Not ideal for heavy or frequently changing data.

- **Zustand**:
  - Designed for **large or heavy state** (e.g., dashboards, chats, e-commerce carts).
  - Can manage complex stores with ease.

---

## 4. Ease of Use

- **Context API**:

  - Built into React (no extra dependency).
  - Requires `Provider` and `useContext` everywhere.

- **Zustand**:
  - External lightweight library.
  - Cleaner API → `create` store, then directly `useStore` in any component (no provider nesting).

---

## 5. Performance

- **Context API**:

  - Every consumer re-renders when value changes.
  - Can become a bottleneck with big or deeply nested apps.

- **Zustand**:
  - Very efficient — only re-renders the components that use the updated slice of state.
  - Suitable for performance-critical apps.

---

## 6. Features

- **Context API**:

  - Simple global state sharing.
  - Limited to what React provides.

- **Zustand**:
  - Advanced features (middlewares, persistence, devtools, async actions).
  - More flexible for large-scale state management.

---

## 📌 Summary

- Both solve **prop drilling**.
- Use **Context API** → For small, simple, rarely-changing global state (like theme, user auth, localization).
- Use **Zustand** → For larger, complex, frequently-changing, or performance-sensitive state.

# React Router Setup with Auth Guard

This snippet demonstrates how to use **React Router v6** with authentication checks.

```javascript
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../context/authContext";
// In Case of Clerk
import { useUser } from "@clerk/clerk-react";
const { isLoaded, isSignedIn } = useUser();
// Clerk

export const AllRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Registration route */}
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
        }
        // In Case of Clerk
        element={
          !isLoaded ? null : isSignedIn ? (
            <CreateResume
              template={template}
              setTemplate={setTemplate}
              updateData={updateData}
              setUpdateData={setUpdateData}
              resumeData={resumeData}
              update={update}
              setUpdate={setUpdate}
            />
          ) : (
            <Navigate to="/" />
          )
        } // In Case of Clerk
      />

      {/* Login route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {/* Dashboard route (protected) */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Landing page (home) */}
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard /> : <LandingPage />}
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
```

# Important Things About useEffect

1. **Purpose**

   - `useEffect` is used to handle side effects in React components.
   - Side effects often depend on **state** or **props** (anything that changes with time).

2. **Structure**  
   `useEffect` consists of three main parts:

   - **Effect function** → Defines what should happen when the effect runs.
   - **Dependency array** → Determines when the effect should re-run.
     - It must include all **states/props used inside the effect** to avoid bugs or stale values.
   - **Cleanup function (return)** → Runs when the component unmounts or before the effect re-runs, used to clean up resources (e.g., remove event listeners, clear intervals).

3. **Self-destruction (Cleanup)**

   - If a cleanup function is provided, `useEffect` automatically handles destroying/unsubscribing from previous effects before running again.

4. **Execution**

   - `useEffect` always runs **at least once** after the component mounts.
   - After that, it runs again whenever the values in the **dependency array** change.

5. **Unmounting**

   - The cleanup function helps detect and handle when the component is unmounted.
   - Prevents memory leaks and stale subscriptions.

6. **Dependency Array Rule**
   - Always include every **state or prop** that is used inside the effect.
   - This ensures the effect has the latest values and behaves predictably.

# Important Things About useRef

1. **Purpose**

   - `useRef` is used to create a **mutable reference** that persists across renders.
   - It does **not** cause re-renders when its value changes.

2. **Accessing the DOM**

   - Commonly used to directly access **DOM elements** (e.g., focus an input, play/pause a video).
   - Example:

     ```jsx
     const inputRef = useRef(null);

     useEffect(() => {
       inputRef.current.focus();
     }, []);

     return <input ref={inputRef} />;
     ```

3. **Storing Values**

   - Can store any value (like a variable that survives re-renders).
   - Useful for storing previous values, counters, or timers/interval IDs.

4. **Difference from useState**

   - **useState:** Updating state causes a re-render, and updates are applied on the next render cycle.
     Most Essential Point -- State updates are asynchronous. You won’t see new values inside the same function call.But on the next render, your JSX sees the fresh value and updates the DOM.

- **useRef:** Changing `.current` does **not** trigger a re-render.
- Unlike `useState`, `useRef` can **change its value within the same render** without waiting for the next render.

5. **Not for Printing UI State**

   - Since ref updates don’t trigger re-renders, they should not be used to display or print dynamic UI values.

6. **When to Use**
   - To access or manipulate DOM elements.
   - To keep track of values that should persist without causing re-renders (e.g., previous state, counters, IDs).

# Important Things About useCallback

1. **Purpose**

   - `useCallback` memoizes a function so its **reference stays the same** between renders.
   - Prevents unnecessary re-creations of the same function.

2. **Dependency Array**

   - Works just like in `useEffect`.
   - The function is only re-created when one of the dependencies changes.
   - Example:
     ```jsx
     const memoizedFn = useCallback(() => {
       // logic
     }, [dependency1, dependency2]);
     ```

3. **Why It's Needed**

   - Functions in React are **re-created on every render**.
   - If such a function is used in a `useEffect` dependency array → the effect would re-run every render.
   - By wrapping the function with `useCallback`, the reference only changes when dependencies change, so `useEffect` runs only when necessary.

4. **Use Cases**

   - Sharing a stable function reference in a `useEffect` dependency array.
   - Passing event handlers (`onClick`, `onChange`) to child components to prevent unnecessary re-renders.
   - Performance optimization in lists or heavy components.

5. **Comparison With useMemo**
   - `useCallback` → memoizes a **function reference**.
   - `useMemo` → memoizes a **computed value (result of a function)**.

# Important Things About Socket.IO

1. **Purpose**

   - Socket.IO is a library that enables **real-time, bidirectional communication** between client and server.
   - It upgrades the normal **HTTP protocol** (request → response) into **WebSocket** (persistent connection where both client and server can send messages anytime).

2. **How It Works**

   - Uses **WebSockets** primarily, but can fall back to other techniques (like long polling) if WebSockets aren’t supported.
   - Maintains a persistent connection between client and server.
   - Both sides can send/receive data at any time.

3. **Why Socket.IO**

   - HTTP: Client must request → Server responds (one-way).
   - WS (via Socket.IO): Server can **push data** to client without waiting for request.
   - Enables **real-time updates**.

4. **Use Cases**

   - Chat applications (messages delivered instantly).
   - Live notifications (e.g., social media, dashboards).
   - Real-time collaboration tools (Google Docs style editing).
   - Multiplayer games.

5. **Example**

   ```js
   // server.js
   const io = require("socket.io")(3000);

   io.on("connection", (socket) => {
     console.log("User connected");
     socket.on("message", (msg) => {
       console.log(msg);
       io.emit("message", msg); // broadcast to all
     });
   });
   ```

# Socket.IO Flow

## What is Socket.IO?

Socket.IO is a library used to upgrade the **HTTP protocol** (which is strictly request → response) to **WebSocket protocol**, enabling **bi-directional real-time communication** between client and server.

---

## Flow of Socket.IO

1. **Client Initialization**

   - Client imports and connects to the server using `io("server-url")`.
   - Example:
     ```js
     const socket = io("http://localhost:5000");
     ```

2. **Handshake / Upgrade**

   - The client first connects over **HTTP**.
   - Socket.IO upgrades the connection to **WebSocket** for persistent communication.

3. **Event-based Communication**

   - Communication is based on **events**:
     - Client emits an event → Server listens.
     - Server emits an event → Client listens.

   Example:

   ```js
   // Client side
   socket.emit("sendMessage", { text: "Hello Server" });

   // Server side
   socket.on("sendMessage", (data) => {
     console.log("Message from client:", data);
   });
   ```

4. **Bi-directional Communication**

   - Unlike HTTP, both client and server can initiate communication without waiting for a request.

5. **Disconnection**
   - If the client disconnects, the server detects it via the `disconnect` event.

---

## Summary

- HTTP → one-way communication (client → server).
- Socket.IO → two-way communication (client ↔ server).
- Uses events for sending/receiving data.
- Enables real-time apps like **chat apps, notifications, live updates**.

# Backend Setup Guide

## 1. Express App

- Use **Express.js** to create the backend server.
- Middleware like `cors`, `express.json()` are configured.
- Server listens on a given port.

## 2. MongoDB Connection

- Use **Mongoose** to connect with MongoDB.
- Connection string is usually stored in `.env` file for security.

## 3. Authentication

- Passwords are hashed using `bcryptjs`.
- JWT (JSON Web Tokens) are used for authentication.

## 4. Middleware

- Auth middleware verifies the JWT token before allowing access to protected routes.

## 5. Multer (File Uploads)

- Used to handle `multipart/form-data`.
- Helps upload and access files in form of objects.

## 6. Socket.IO

- Upgrades HTTP protocol (request → response) to WebSocket (bi-directional).
- Enables **real-time communication** between server and client.

### Socket.IO Flow

1. Client sends request to connect.
2. Server upgrades the request from HTTP to WS.
3. Both server & client can now communicate without waiting for requests.

---

## Example: Conversation Schema

```javascript
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
```

# Password Reset Email Sender (Node.js)

A simple Node.js utility to send password reset codes via Gmail SMTP using [Nodemailer](https://nodemailer.com/).

## Features

- Send password reset codes to users via email.
- Uses Gmail SMTP with secure connection.
- Easy integration into Node.js applications.

## Prerequisites

- Node.js installed
- A Gmail account with [App Password](https://support.google.com/accounts/answer/185833?hl=en) if 2FA is enabled
- npm or yarn for package management

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/password-reset-email.git
cd password-reset-email
```

2. Install dependencies:

```bash
npm install nodemailer dotenv
# or
yarn add nodemailer dotenv
```

3. Create a `.env` file in the project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Usage

Create a JavaScript file (e.g., `sendEmail.js`) with the following code:

```javascript
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configure transporter
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send password reset code
async function sendPasswordResetCode(googleMail, code) {
  try {
    await transporter.sendMail({
      to: googleMail,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    });
    console.log("Password reset email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usage
sendPasswordResetCode("user@example.com", "123456");
```

## Notes

- Make sure to use an **App Password** if your Gmail account has 2FA enabled.
- The `secure: true` option ensures the connection uses SSL on port `465`.

# File Download Flow in Node.js + Express + Axios

This guide explains how to implement a file download system using **Node.js**, **Express.js**, **Axios**, and MongoDB (with Mongoose).  
The server acts as a **proxy**, fetching the file from a remote location (e.g., Cloudinary) and streaming it to the browser.

---

## 🔄 Flow

1. **Frontend (React / Browser)**

   - User clicks a "Download" button.
   - This triggers a request to your backend endpoint:

   ```js
   const handleDownload = (messageId) => {
     window.location.href = `/api/download/${messageId}`;
   };
   ```

2. **Backend Route**

   - In Express, create a route for `/api/download/:id`:

   ```js
   import express from "express";
   import { downloadFile } from "../controllers/downloadController.js";
   import { requireAuth } from "../middleware/auth.js"; // optional auth middleware

   const router = express.Router();
   router.get("/download/:id", requireAuth, downloadFile);
   export default router;
   ```

3. **Backend Controller**

   - The controller fetches file info from MongoDB, validates access, then streams it to the client.

   ```js
   import axios from "axios";
   import { Message } from "../models/messageModel.js";

   export const downloadFile = async (req, res) => {
     try {
       const userId = req.user._id; // authenticated user
       const messageId = req.params.id;

       // Find the message in DB
       const message = await Message.findById(messageId);
       if (!message) return res.status(404).send("File not found");

       // Pick the first available file (document, video, image)
       const fileUrl = message.document || message.video || message.image;
       if (!fileUrl) return res.status(400).send("No file attached");

       // Fetch from Cloudinary (or other storage)
       const response = await axios.get(fileUrl, { responseType: "stream" });

       // Set headers for download
       res.setHeader(
         "Content-Disposition",
         `attachment; filename="${fileUrl.split("/").pop()}"`
       );

       // Stream to client
       response.data.pipe(res);
     } catch (err) {
       console.error(err);
       res.status(500).send("Download failed");
     }
   };
   ```

4. **Browser Behavior**
   - When the browser receives `Content-Disposition: attachment`, it **forces a download** instead of opening the file inline.

---

## 📌 Example Flow Visualization

```
[Frontend User Clicks Download]
        |
        v
[Your Backend /download/:id]
        |
        v
[Axios fetches file from Cloudinary]
        |
 (stream chunks)
        |
        v
[Backend pipes chunks to browser response]
        |
        v
[Browser receives stream + headers]
        |
        v
[File is saved on user's computer]
```

---

✅ This creates a secure, authenticated file download system using Express and Axios streaming.

CLI (Command Line Interface) -
CLI stands for Command Line Interface Example - Command Prompt
It’s a text-based tool that lets you interact with a program or framework by typing commands in your terminal or command prompt — instead of clicking buttons in a GUI (Graphical User Interface).
