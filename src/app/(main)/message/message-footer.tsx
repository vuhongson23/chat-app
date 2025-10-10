import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";

const MessageFooter = () => {
  return (
    <div className="p-5 bg-white border-t flex items-center justify-between gap-x-5">
      <Input
        type="text"
        placeholder="Nhập tin nhắn..."
        className="bg-slate-50"
      />
      <Smile className="cursor-pointer" />
      <Send className="cursor-pointer" />
    </div>
  );
};

export default MessageFooter;
