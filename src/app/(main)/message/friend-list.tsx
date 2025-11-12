"use client";
import FriendMessageCard from "@/components/friend-message-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDataAPI } from "@/lib/api/api";
import { ConversationType } from "@/types/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const FriendList = () => {
  const [conversationList, setConversationList] = useState<ConversationType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAPI("/message/conversations");
        if (response.status === 200) {
          const data = response?.data?.conversations?.map(
            (conversation: ConversationType) => {
              return {
                ...conversation,
                lastMessageTime: dayjs(conversation.lastMessageTime).format(
                  "HH:MM"
                ),
              };
            }
          );
          setConversationList(data);
        }
      } catch (error) {
        toast.error(`Lỗi: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="w-[380px] border-r overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="p-6 pb-0">
        <h1 className="font-bold text-2xl mb-[18px]">Messages</h1>

        <div className="filter mb-[5px]">
          <InputGroup className="bg-[#e7e7e799] rounded-2xl mb-[11px]">
            <InputGroupInput placeholder="Tìm kiếm..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center">
            <p className="text-xs text-black text-opacity-65">Sắp xếp</p>
            <Select>
              <SelectTrigger className="w-auto shadow-none flex items-center gap-x-[3px] border-none">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early">Gần nhất</SelectItem>
                <SelectItem value="lately">Xa nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {conversationList?.map((friend: ConversationType) => (
          <FriendMessageCard
            key={friend.friendId}
            userId={String(friend.friendId)}
            avatar={friend.avatar || ""}
            // isSented={false} // Update sau
            message={friend.lastMessage}
            // isTyping={false} // Update sau
            userName={friend.name}
            sentTime={friend.lastMessageTime}
            newMessageCount={friend.unreadCount}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
