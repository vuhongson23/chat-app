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
import { FriendMessageCardType } from "@/types/types";
import { Search } from "lucide-react";

interface IFriendListProps {
  friendList?: FriendMessageCardType[];
}

const FriendList = ({ friendList = [] }: IFriendListProps) => {
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
        {friendList.map((friend: FriendMessageCardType) => (
          <FriendMessageCard
            key={friend.userName}
            userId={friend.userId}
            avatar={friend.avatar}
            isSented={friend.isSented}
            message={friend.message}
            isTyping={friend.isTyping}
            userName={friend.userName}
            sentTime={friend.sentTime}
            newMessageCount={friend.newMessageCount}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
