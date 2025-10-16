"use client";
import MessageFooter from "@/app/(main)/message/message-footer";
import MessageHeader from "@/app/(main)/message/message-header";
import { getDataAPI, postDataAPI } from "@/lib/api/api";
import { useAuth } from "@/shared/contexts/auth-context";
import { MessageType } from "@/types/types";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  KeyboardEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

const MessagePage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageValue, setMessageValue] = useState("");
  const { friendId } = useParams();
  const { user } = useAuth();
  const endMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (endMessageRef.current) {
      endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataAPI(`/message/conversations/${friendId}`);
      if (response?.status === 200) {
        const data = response?.data?.messages.map((message: any) => {
          const sender = user?.id === message?.senderId ? "me" : "other";
          return {
            id: message.id,
            content: message.content,
            sender: sender,
            time: dayjs(message.createdAt).format("HH:mm"),
          };
        });
        setMessages(data);
      }
    };

    fetchData();
  }, [user?.id, friendId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const payload = {
        content: messageValue,
        receiverId: Number(friendId),
      };
      const response = await postDataAPI("/message/send", payload);
      console.log("🚀 ~ handleSendMessage ~ response:", response);
      if (response.status === 201) {
        const data = response?.data?.data;
        const newMessage = {
          id: data.id,
          content: data.content,
          sender: user?.id === data.senderId ? "me" : "other",
          time: dayjs(data.createdAt).format("HH:mm"),
        };
        setMessages((prev) => [...prev, newMessage]);
        setMessageValue("");
      }
    } catch (error) {
      console.log("🚀 ~ handleSendMessage ~ error:", error);
    }
  };

  if (!friendId || !user?.id) return null;

  return (
    <>
      <MessageHeader />
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-[#FAFAFA]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages?.length > 0 &&
          messages.map((message: MessageType) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : ""}`}
            >
              <div
                key={message.id}
                className="flex items-center gap-x-2 max-w-xs lg:max-w-md"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full overflow-hidden flex-shrink-0 ${
                    message.sender === "me" ? "invisible" : "visible"
                  }`}
                >
                  <Image
                    priority
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="avatar"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`flex flex-col gap-y-1 ${
                    message.sender === "me" ? "items-end" : ""
                  }`}
                >
                  <p
                    className={`${
                      message.sender === "me"
                        ? "bg-blue-500 text-white rounded-[10px_10px_0px_10px]"
                        : "bg-white text-black rounded-[10px_10px_10px_0px]"
                    } px-3 py-2 shadow-md`}
                  >
                    {message.content}
                  </p>
                  <span className="text-slate-500 text-sm">{message.time}</span>
                </div>
              </div>
            </div>
          ))}
        <div ref={endMessageRef} />
      </div>
      <MessageFooter
        onMessage={setMessageValue}
        onSented={handleSendMessage}
        message={messageValue}
      />
    </>
  );
};

export default MessagePage;
