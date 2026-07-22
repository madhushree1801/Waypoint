// src/pages/AICareerChatPage.jsx

import { useState } from "react";
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function AICareerChatPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Waypoint AI. Ask me anything about careers, resumes, interviews, skills, or learning paths.",
    },
  ]);

  const sendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Enter a message.");
      return;
    }

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/career-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi! I'm Waypoint AI. Ask me anything about careers, resumes, interviews, skills, or learning paths.",
      },
    ]);
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          AI Career Chat
        </h1>

        <p className="mt-3 text-indigo-100 text-lg">
          Get instant career guidance powered by AI.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg">

        <div className="flex justify-between items-center border-b p-5">

          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-600" />
            <h2 className="text-2xl font-bold">
              Conversation
            </h2>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 text-red-500"
          >
            <Trash2 size={18} />
            Clear
          </button>

        </div>

        <div className="h-[500px] overflow-y-auto p-6 space-y-5 bg-gray-50">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >

                <div className="flex items-center gap-2 mb-2">

                  {msg.role === "assistant" ? (
                    <Bot size={18} />
                  ) : (
                    <User size={18} />
                  )}

                  <span className="font-semibold">
                    {msg.role === "assistant"
                      ? "Waypoint AI"
                      : "You"}
                  </span>

                </div>

                <div className="whitespace-pre-wrap">
                  {msg.content}
                </div>

              </div>

            </div>

          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin text-purple-600" />
              <span>Waypoint AI is thinking...</span>
            </div>
          )}

        </div>

        <div className="border-t p-5 flex gap-3">

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about your career..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 rounded-xl flex items-center gap-2"
          >
            <Send size={18} />
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default AICareerChatPage;