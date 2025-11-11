import UserCard from "@/app/(main)/friend/search/user-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const SearchFriend = () => {
  return (
    <div className="p-4 pt-5">
      <h1 className="font-bold text-[1.25rem] mb-4">Tìm kiếm bạn bè</h1>
      <div className="search">
        <InputGroup className="bg-white h-10">
          <InputGroupInput placeholder="Nhập tên bạn bè..."/>
          <InputGroupAddon>
            <Search/>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="result mt-5">
        <h2 className="font-medium">Kết quả tìm kiếm <span className="text-slate-400 text-sm font-normal">999 kết quả</span></h2>
        <div className="mt-5 flex flex-col gap-y-4">
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
        </div>
      </div>
    </div>
  );
};

export default SearchFriend;
