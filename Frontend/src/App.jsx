// import { useState } from "react";
// import "./App.css";
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
// import { AllRoutes } from "./allRoutes/AllRoutes";
// import { Toaster } from "react-hot-toast";

// function App() {
//   return (
//     <main className="w-screen h-screen">
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: {
//             fontSize: "16px",
//             borderRadius: "8px",
//             color: "#fff",
//             padding: "8px 10px",
//           },
//           success: {
//             duration: 4000,
//             style: {
//               background: "green",
//             },
//           },
//           error: {
//             duration: 4000,
//             style: {
//               background: "red",
//             },
//           },
//         }}
//       />
//       <AllRoutes />
//     </main>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AllRoutes } from "./allRoutes/AllRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="w-screen h-screen">
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
      <AllRoutes />
    </main>
  );
}

export default App;
