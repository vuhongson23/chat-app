import { MessageType } from "@/types/types";
import Image from "next/image";

interface IMessagePageProps {
  messages?: MessageType[];
}

const initMsg: MessageType[] = [
  {
    id: 1,
    content: "Chào bạn! Bạn khỏe không?",
    sender: "other",
    time: "10:30",
  },
  {
    id: 2,
    content: "Mình khỏe, cảm ơn bạn! Còn bạn thì sao?",
    sender: "me",
    time: "10:31",
  },
  {
    id: 3,
    content: "Mình cũng ổn. Hôm nay bạn có rảnh không?",
    sender: "other",
    time: "10:32",
  },
  {
    id: 4,
    content: "Có chứ, bạn muốn đi đâu không?",
    sender: "me",
    time: "10:33",
  },
  {
    id: 5,
    content:
      "Mình nghĩ là đi uống cà phê, bạn thấy thế nào? moojt hai bai boons nawm nsua bayr ta hucnawni widiw nwifwfiub☕",
    sender: "other",
    time: "10:34",
  },
];

const MessagePage = ({ messages = initMsg }: IMessagePageProps) => {
  return (
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
    </div>
  );
};

export default MessagePage;
