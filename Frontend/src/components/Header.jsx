import React from "react";

export const Header = ({}) => {
  return (
    <header
      className="min-h-[55px] w-[100%] px-0 py-[24px] flex justify-center items-center sticky top-0 z-[1000]  "
      style={{
        background: "linear-gradient(90deg, #1e3a8a, #2563eb)", // darker blue gradient
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "'Poppins', sans-serif",
        zIndex: 1000,
      }}
    >
      Header
    </header>
  );
};
