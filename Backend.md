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

1> create Backend folder {command : npm init for package.json}

2>create src file --> containing "CCCMRU" folders and three files 1> app.js 2>server.js 3>.env

3>In app.js get express // write all middleware // it will also include all the routes // export app

4>In server.js import app from app.js // connect mongodb // and then app.listen

5>Create Model user schema // export mongoose.model("Conversation{captial and singular}",conversationSchema)//

6>Use express.Router() in routes file // router.post("/registerUser",registerUser) //export default router // create function registerUser with try catch block in controller folder

7>In app.js create a middleware app.use("/api",router) // always focus on flow
// app.js --> router --> controllers

8> Remember is mongodb commands

// Create user
await User.create({ name: "Bob", email: "bob@example.com" });

best if using JWT  
const newuser=new User({});
if(newUser)
{
await newUser.save()
jwtoken(newUser.\_id,res)
}

// Find user by field
await User.findOne({ email,username });

// Find by Id
await User.findById("user_id_here");

// Find all users:
await User.find(
Code is generally used in find // and to ensure both the conditions are includes that $or and \_id // $or for either userName or FullName
![alt text](image.png)
);

9> For profile images and all you can use this following link `https://avatar.iran.liara.run/public/boy?username=${username}`; username is for uniquness // for hashing the password use bcrypt js // const hashPassword = bcryptjs.hashSync(password, 10)

10> once you created the user res.send some important details

11> check your api on postman

12>jwt token code

13> login ---> token ---> cookie set {same with registration}

14> for authentication that user is logged in or not verify the token
//
use jwt once new user is created and after the login is completed{basically after password check}
import jwt from "jsonwebtoken";

export const jwtToken = (userId, res) => {
const token = jwt.sign({ userId }, process.env.JWT*TOKEN, {
expiresIn: "30d",
});
res.cookie("jwt", token, {
maxAge: 30 * 24 _ 60 _ 60 \_ 1000,
httpOnly: true,
sameSite: "strict",
secure: process.env.SECURE !== "devlopment",
});
};
//
10> if required is true for any field in models and if default="" true value will overwirte it so that field you need to provide ultimately

11> array methods

{
some --> boolean
every --> boolean
includes --> boolean
indexOf(val) --> number/-1
lastIndexOf(val) --> number/-1
find --> object,number,undefined
reduce((ids,conversation)) -->
map --> new array
flatmap --> new array
filter --> new array
reverse() --> mutate old array
sort() --> mutate old array
forEach --> iteration

spreading of the array

const a=[1,2,3]
const b=[3,5,4]
const c=[...a,...b] --> [1,2,3,3,5,4s]
}
