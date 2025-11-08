import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaSignOutAlt, FaUser, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import userConversation from "../zustand/userConversation";
import { useSocketContext } from "../context/SocketContext";

export const Sidebar = () => {
  const { authUser, setauthUser, setIsAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [searchUser, setsearchUser] = useState([]);
  const [responsive, setResponse] = useState();
  const [currentChatter, setcurrentChatter] = useState([]);
  const [loading, setLoading] = useState(false);
  const { onlineUser } = useSocketContext();

  const {
    setMessages,
    messages,
    setselectedConversation,
    selectedConversation,
  } = userConversation();
  const navigate = useNavigate();

  const goingbacktocurrent = () => {
    setSearch("");
    currentUser();
  };

  const currentUser = async () => {
    console.log("Chal raha hai");

    try {
      const response = await axios.get("/api/message/currentchatter");

      if (response.status !== 201) {
        throw new Error("Something Went Wrong");
      }

      response.data.message
        ? setcurrentChatter(response.data.message)
        : setcurrentChatter(response.data);

      setsearchUser([]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Messages");

    currentUser();
  }, [messages]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setsearchUser([]);
      const response = await axios.get(`/api/message/search?search=${search}`);

      if (response.status !== 201 || response.data.message.length === 0) {
        setSearch("");
        throw new Error("Something Went Wrong");
      }

      const user = response.data.message;
      setsearchUser(user);
    } catch (error) {
      console.error(error.message);
      toast.error("No user found");
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    const confirmLogout = window.prompt(`type ${authUser.userName} for logout`);

    if (confirmLogout === authUser.userName) {
      try {
        localStorage.removeItem("userinfo");
        if (localStorage.getItem("userReginfo")) {
          localStorage.removeItem("userReginfo");
        }

        setLoading(true);
        const response = await axios.get("/api/auth/logout");
        if (response.status !== 201) {
          throw new Error("Backend Problem");
        }

        setauthUser(null);
        setIsAuthenticated(false);
        setselectedConversation(null);
        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        console.error(error.message);
        toast.error("Wrong Username");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Wrong Username");
    }
  };

  const handleuserSelection = async (user) => {
    try {
      setselectedConversation(user);
    } catch (error) {
      console.error(error);
    }
  };

  const isUserOnline = (userId) => {
    return onlineUser.includes(userId);
  };

  return (
    <div className="w-full bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
          <button
            onClick={handlelogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <form onSubmit={handlesubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setsearchUser([]);
              }}
              placeholder="Search users..."
              className="w-full pl-10 text-black
               pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {search === "" ? (
          <div>
            {currentChatter.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <FaUser className="mx-auto mb-2 text-gray-400" size={24} />
                <p>No conversations yet</p>
              </div>
            ) : (
              currentChatter.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleuserSelection(user)}
                  className={`w-full p-3 flex items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedConversation?._id === user._id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.userName.charAt(0).toUpperCase()}
                    </div>
                    {isUserOnline(user._id) && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 text-left flex-1">
                    <div className="font-medium text-gray-900">
                      {user.userName}
                    </div>
                    {isUserOnline(user._id) && (
                      <div className="text-xs text-green-600">Online</div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div>
            {searchUser.map((user) => (
              <button
                key={user._id}
                onClick={() => handleuserSelection(user)}
                className="w-full p-3 flex items-center border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.userName.charAt(0).toUpperCase()}
                  </div>
                  {isUserOnline(user._id) && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 text-left flex-1">
                  <div className="font-medium text-gray-900">
                    {user.userName}
                  </div>
                  {isUserOnline(user._id) && (
                    <div className="text-xs text-green-600">Online</div>
                  )}
                </div>
              </button>
            ))}
            <button
              onClick={goingbacktocurrent}
              className="w-full p-3 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to conversations
            </button>
          </div>
        )}
      </div>

      {/* Current User */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {authUser?.userName?.charAt(0)?.toUpperCase()}
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900">
              {authUser?.userName}
            </div>
            <div className="text-xs text-gray-500">You</div>
          </div>
        </div>
      </div>
    </div>
  );
};
