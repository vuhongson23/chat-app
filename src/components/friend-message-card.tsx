"use client";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IFriendMessageCardProps {
  userId?: string;
  avatar?: string;
  userName?: string;
  message?: string;
  sentTime?: string;
  isSented?: boolean;
  isTyping?: boolean;
  newMessageCount?: number;
}

const FriendMessageCard = ({
  userId = "",
  avatar = "",
  isSented = false,
  isTyping = false,
  message,
  sentTime,
  userName,
  newMessageCount,
}: IFriendMessageCardProps) => {
  const pathName = usePathname();
  const isActive = pathName === `/message/${userId}`;
  const status = () => {
    if (newMessageCount && newMessageCount > 0) {
      return (
        <span className="min-w-[16px] h-[16px] rounded-full flex items-center justify-center bg-[#27ae60] text-white text-[10px] px-[4px]">
          {newMessageCount}
        </span>
      );
    }
    if (isSented) {
      return <CheckCheck color="green" size={12} />;
    }
    return null;
  };

  return (
    <Link href={`/message/${userId}`}>
      <div
        className={`flex items-center justify-between cursor-pointer hover:bg-slate-100 px-6 transition-all ${
          isActive ? "bg-slate-100" : ""
        }`}
      >
        {/* Phần avatar + nội dung bên trái */}
        <div className="flex flex-1 items-center gap-x-3 py-1 min-w-0">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <Image
              priority
              src={avatar || "/images/default-profile.jpg"}
              alt="avatar"
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tên + tin nhắn */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-base truncate">{userName}</p>
            {isTyping ? (
              <span className="text-sm text-[#27ae60]">Đang soạn...</span>
            ) : (
              <span className="block text-sm text-slate-500 truncate">
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Phần bên phải: thời gian, icon, badge */}
        <div className="flex flex-col items-end flex-shrink-0 ml-2">
          <p className="text-xs text-slate-500 mb-[5px] whitespace-nowrap">
            {sentTime}
          </p>
          {status()}
        </div>
      </div>
    </Link>
  );
};

export default FriendMessageCard;
