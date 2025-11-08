import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../context/authContext";

const Chatbot = () => {
  const { authUser } = useAuth();
  const userName = authUser?.fullName || "User";
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello ${userName}! I am your assistant for this chatting app. How can I help you?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const clientRef = useRef(null);

  // Initialize Gemini client once
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      console.error(
        "Google API key is missing. Please set VITE_GOOGLE_API_KEY in your .env file."
      );
      return;
    }
    clientRef.current = new GoogleGenerativeAI(apiKey);
  }, []);

  const systemPrompt = `
You are a helpful assistant for ${userName} in a chatting application website.
The website allows users to register, login, send real-time messages, share files, and manage conversations.
Answer user questions about the website features, usage, and troubleshooting.
Be friendly and concise.
`;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      if (!clientRef.current) {
        throw new Error("Gemini client not initialized.");
      }

      const model = clientRef.current.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent(userMessage);
      const botReply = result.response.text().trim();

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error generating response:", error);
      let errorMessage = "Sorry, I am having trouble responding right now.";
      if (error.message === "Gemini client not initialized.") {
        errorMessage =
          "Please set your Google API key in the .env file as VITE_GOOGLE_API_KEY.";
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Drawer toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-7 right-0 z-60 bg-blue-600 text-white rounded-l-full p-2 shadow-lg hover:bg-blue-700 focus:outline-none transform -translate-y-1/2 flex items-center justify-center space-x-2"
        aria-label="Open chat drawer"
        title="Open Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
          />
        </svg>
        <span className="text-sm font-semibold select-none">Chat</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg rounded-l-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat drawer"
      >
        <div className="flex items-center justify-between  p-2 border-b border-gray-300">
          <div className="flex items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQFzaQ1iVcdeNg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716191281269?e=1759968000&v=beta&t=KbCS13Jadpp6OP8UjZP9Q6JG1u_GpZtMhCrTU4mWZ5g"
              alt="Soham Ghag"
              className="w-[15%] h-[85%] mr-[10px] rounded-full"
            />
            <div className="font-bold text-black ">Soham Ghag</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Close chat drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-5 py-2 max-w-[75%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 max-w-[70%] bg-gray-200 text-gray-900 italic">
                Typing...
              </div>
            </div>
          )}
        </div>
        <textarea
          className="border border-gray-300 text-black rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mx-2 mb-2"
          rows={2}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
      </div>
    </>
  );
};

export default Chatbot;
