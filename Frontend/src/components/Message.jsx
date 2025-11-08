import React, { useEffect, useRef, useState } from "react";
import userConversation from "../zustand/userConversation";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useSocketContext } from "../context/SocketContext";
import {
  FaPaperclip,
  FaPaperPlane,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFile,
  FaFileVideo,
  FaFileImage,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Chatbot from "../pages/Chatbot";

export const Message = () => {
  const {
    setMessages,
    messages,
    setselectedConversation,
    selectedConversation,
  } = userConversation();

  const { authUser } = useAuth();
  const { socket, onlineUser } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const [newmess, setnewMess] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [editMsgId, setEditMsgId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handler = (newMessage) => {
      const senderId = newMessage.senderId;
      console.log("senderId", senderId);

      console.log("change in messages", messages);
      console.log("change in newMessages", newMessage);

      if (senderId) {
        console.log("See i am coming or not");

        setMessages([...messages, newMessage]);
      }

      console.log("See the changes", messages);
    };

    const handleDeleteMessage = (id) => {
      setMessages(messages.filter((e) => e._id !== id));
    };

    const handleEditMessage = ({ id, message }) => {
      setMessages(
        messages.map((e) => {
          if (e._id === id) {
            return { ...e, message: message.message };
          }
          return e;
        })
      );
    };

    socket.on("deleteMessage", handleDeleteMessage);
    socket.on("newMessage", handler);
    socket.on("editMessage", handleEditMessage);

    return () => {
      socket.off("deleteMessage", handleDeleteMessage);
      socket.off("newMessage", handler);
      socket.off("editMessage", handleEditMessage);
    };
  }, [socket, messages, selectedConversation]);

  const fetchMessages = async () => {
    if (!selectedConversation?._id) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/message/get/${selectedConversation._id}`
      );

      if (response.status !== 200) {
        throw new Error("Message Handling Error");
      }

      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    const type = selectedFile.type;
    if (type.startsWith("image/")) {
      setFileType("image");
    } else if (type.startsWith("video/")) {
      setFileType("video");
    } else {
      setFileType("document");
    }

    setFile(selectedFile);
    setShowFileMenu(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle file uploads
      if (file) {
        setUploading(true);

        const formData = new FormData();
        let endpoint = "";

        switch (fileType) {
          case "image":
            formData.append("imageupload", file);
            endpoint = `/api/image/imageupload/${selectedConversation._id}`;
            break;
          case "video":
            formData.append("videoupload", file);
            endpoint = `/api/video/videoupload/${selectedConversation._id}`;
            break;
          case "document":
            formData.append("docupload", file);
            endpoint = `/api/doc/documentupload/${selectedConversation._id}`;
            break;
          default:
            formData.append("fileupload", file);
            endpoint = `/api/file/upload/${selectedConversation._id}`;
        }

        const response = await axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setMessages([...messages, response.data.message]);
        setFile(null);
        setFileType(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setUploading(false);

        // Force refresh of current chatter list after sending file
        setTimeout(() => {
          window.dispatchEvent(new Event("refreshCurrentChatter"));
        }, 100);
      }

      // Handle text message
      if (newmess.trim()) {
        const response = await axios.post(
          `/api/message/send/${selectedConversation._id}`,
          { messages: newmess }
        );

        if (response.status !== 200) {
          throw new Error("Send Message Error");
        }

        await setMessages([...messages, response.data.message]);

        setnewMess("");

        // Force refresh of current chatter list after sending text message
        setTimeout(() => {
          window.dispatchEvent(new Event("refreshCurrentChatter"));
        }, 100);
      }
    } catch (error) {
      console.error("Send failed:", error.message);
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation?._id]);

  const handleEditMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/api/message/edit/${selectedConversation._id}`,
        {
          id: editMsgId,
          newText: editText,
        }
      );

      setMessages(
        messages.map((msg) => {
          if (msg._id === editMsgId) {
            return { ...msg, message: editText };
          }
          return msg;
        })
      );
      setEditMsgId(null);
      setShowOptions(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await axios.post(
        `/api/delete/message/${selectedConversation._id}`,
        { id }
      );
      setMessages(messages.filter((msg) => msg._id !== id));
      setShowOptions(null);
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const handleDownload = (messageId) => {
    try {
      window.location.href = `/api/download/${messageId}`;
    } catch (error) {}
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getFileIcon = (message) => {
    if (message.image && message.image !== " ")
      return <FaFileImage className="text-blue-500" />;
    if (message.video && message.video !== " ")
      return <FaFileVideo className="text-red-500" />;
    if (message.document && message.document !== " ")
      return <FaFile className="text-green-500" />;
    return null;
  };

  const getFileNameDecoded = (url) => decodeURIComponent(url.split("/").pop());

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {selectedConversation !== null ? (
        <>
          {/* Chat Header */}
          <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
            <div className="flex items-center">
              <button
                onClick={() => setselectedConversation(null)}
                className="lg:hidden mr-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <IoArrowBack size={20} />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold mr-3">
                  {selectedConversation.userName
                    ? selectedConversation.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "U"}
                </div>
                <div
                  className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-white ${
                    onlineUser.includes(selectedConversation._id)
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">
                  {selectedConversation.userName}
                </h2>
                <p className="text-xs text-gray-500">
                  {onlineUser.includes(selectedConversation._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  No messages yet
                </h2>
                <p className="text-gray-500 max-w-md">
                  Start a conversation by sending your first message
                </p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-300 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  Start Chatting
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.senderId === authUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-2xl relative group ${
                        message.senderId === authUser._id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      } shadow-sm transition-all duration-200 hover:shadow-md`}
                      onMouseEnter={() => setShowOptions(message._id)}
                      onMouseLeave={() => setShowOptions(null)}
                    >
                      {/* Message content container */}
                      <div className="p-3">
                        {/* Media content */}
                        {message.image && message.image !== " " && (
                          <div className="mb-2">
                            <img
                              src={message.image}
                              alt="Shared content"
                              className="rounded-lg max-w-full max-h-60 object-cover cursor-pointer"
                              onClick={() =>
                                window.open(message.image, "_blank")
                              }
                            />
                          </div>
                        )}

                        {message.video && message.video !== " " && (
                          <div className="mb-2">
                            <video
                              controls
                              className="rounded-lg max-w-full max-h-60 object-cover"
                            >
                              <source src={message.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}

                        {message.document && message.document !== " " && (
                          <div
                            className={`p-3 rounded-lg mb-2 ${
                              message.senderId === authUser._id
                                ? "bg-blue-400/20"
                                : "bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <p className="text-sm font-medium truncate">
                                {getFileNameDecoded(message.document)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Text message */}
                        {message.message && message.message !== " " && (
                          <div className="mb-1">
                            <p className="text-sm font-semibold">
                              {message.message}
                            </p>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div className="flex justify-end mt-1">
                          <span
                            className={`text-xs opacity-80 ${
                              message.senderId === authUser._id
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Message options menu */}
                      {showOptions === message._id && (
                        <div className="absolute right-2 top-2 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-10 min-w-[120px]">
                          {/* Download button */}
                          <button
                            onClick={() => handleDownload(message._id)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download
                          </button>

                          {/* Edit button (only for user's text messages) */}
                          {message.senderId === authUser._id &&
                            message.message &&
                            message.message !== " " &&
                            message.message !== "" && (
                              <button
                                onClick={() => {
                                  setEditMsgId(message._id);
                                  setEditText(message.message);
                                  setShowOptions(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                            )}

                          {/* Delete button (only for user's messages) */}
                          {message.senderId === authUser._id && (
                            <button
                              onClick={() => handleDeleteMessage(message._id)}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          {/* Upload Spinner Overlay */}
          {uploading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-800 text-lg">Uploading file...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait</p>
              </div>
            </div>
          )}

          {/* Edit Message Form */}
          {editMsgId && (
            <div className="bg-white p-3 border-t border-gray-200">
              <form onSubmit={handleEditMessage} className="flex items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(ev) => setEditText(ev.target.value)}
                  className="flex-1 bg-gray-100 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
                  placeholder="Edit your message"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMsgId(null);
                    setEditText("");
                  }}
                  className="ml-2 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* File selection menu */}
          {showFileMenu && (
            <div className="bg-white p-3 border-t border-gray-200 flex justify-around shadow-sm">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <FaFileImage size={18} />
                </div>
                <span className="text-xs">Image</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </button>
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "video/*";
                  input.onchange = (e) => handleFileSelect(e.target.files[0]);
                  input.click();
                }}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <FaFileVideo size={18} />
                </div>
                <span className="text-xs">Video</span>
              </button>
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".pdf,.doc,.docx,.txt,.ppt,.pptx";
                  input.onchange = (e) => handleFileSelect(e.target.files[0]);
                  input.click();
                }}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <FaFile size={18} />
                </div>
                <span className="text-xs">Document</span>
              </button>
            </div>
          )}

          {/* Message Input */}
          <div className="bg-white p-4 border-t border-gray-200">
            {/* Selected file preview */}
            {file && (
              <div className="flex items-center justify-between mb-3 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  {fileType === "image" && (
                    <FaFileImage className="text-blue-500 mr-2" />
                  )}
                  {fileType === "video" && (
                    <FaFileVideo className="text-red-500 mr-2" />
                  )}
                  {fileType === "document" && (
                    <FaFile className="text-green-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-700 truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setFileType(null);
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-600 p-2 mr-2 transition-colors"
                onClick={() => setShowFileMenu(!showFileMenu)}
                title="Upload files"
              >
                <FaPaperclip size={18} />
              </button>

              <div className="flex-1 mr-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newmess}
                  onChange={(e) => setnewMess(e.target.value)}
                  className="w-full bg-gray-100 text-gray-800 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none placeholder-gray-500"
                />
              </div>

              {newmess.trim() || file ? (
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
                  title="Send message"
                >
                  <FaPaperPlane size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-gray-200 text-gray-500 p-3 rounded-full hover:bg-gray-300 transition-colors"
                  disabled
                >
                  <FaPaperPlane size={16} />
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-4 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {authUser.userName}!
          </h2>
          <p className="text-gray-600 max-w-md">
            Select a conversation from the sidebar to start chatting.
          </p>
        </div>
      )}

      <Chatbot />
    </div>
  );
};
