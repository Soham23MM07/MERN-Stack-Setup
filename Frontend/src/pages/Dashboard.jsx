import { useAuth } from "../context/authContext";
import { Sidebar } from "../components/Sidebar";
import { Message } from "../components/Message";
import userConversation from "../zustand/userConversation";
import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
export const Dashboard = () => {
  const {
    setMessages,
    messages,
    setselectedConversation,
    selectedConversation,
  } = userConversation();
  const [mobileView, setIsMobile] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full h-full">
      <div
        className={
          mobileView
            ? selectedConversation
              ? "hidden"
              : "w-full h-full"
            : "w-[20%] h-full"
        }
      >
        <Sidebar />
      </div>
      <div
        className={
          mobileView
            ? selectedConversation
              ? "w-full h-full"
              : "hidden"
            : "w-[80%] h-full"
        }
      >
        <Message />
      </div>
    </div>
  );
};
