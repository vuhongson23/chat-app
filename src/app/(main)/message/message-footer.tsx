"use client";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { ChangeEvent } from "react";

interface IMessageFooter {
  onMessage: (v: string) => void;
  onSented: () => void;
  message: string;
}

const MessageFooter = ({
  onMessage = () => {},
  onSented = () => {},
  message = "",
}: IMessageFooter) => {
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    onMessage(e.target.value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSented();
    }
  };

  return (
    <div className="p-5 bg-white border-t flex items-center justify-between gap-x-5">
      <Input
        type="text"
        placeholder="Nhập tin nhắn..."
        className="bg-slate-50"
        value={message}
        onKeyDown={handlePressEnter}
        onChange={handleChangeMessage}
      />
      <Smile className="cursor-pointer" />
      <button
        className="cursor-pointer"
        disabled={!message.trim()}
        onClick={onSented}
      >
        <Send />
      </button>
    </div>
  );
};

export default MessageFooter;
