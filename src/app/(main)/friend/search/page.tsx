"use client";
import UserCard from "@/app/(main)/friend/search/user-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";
import { getDataAPI } from "@/lib/api/api";
import { UserType } from "@/types/types";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const SearchFriend = () => {
  const [name, setName] = useState("");
  const [users, setUser] = useState<UserType[]>([]);
  console.log("🚀 ~ SearchFriend ~ users:", users);
  const debouncedValue = useDebounce(name);

  const handleSearchUser = async (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAPI("/user/all", {
          name: debouncedValue,
        });
        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.log("🚀 ~ handleSearchUser ~ error:", error);
      }
    };
    fetchData();
  }, [debouncedValue]);

  return (
    <div className="p-4 pt-5">
      <h1 className="font-bold text-[1.25rem] mb-4">Tìm kiếm bạn bè</h1>
      <div className="search">
        <InputGroup className="bg-white h-10">
          <InputGroupInput
            placeholder="Nhập tên bạn bè..."
            onChange={handleSearchUser}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="result mt-5">
        <h2 className="font-medium">
          Kết quả tìm kiếm{" "}
          <span className="text-slate-400 text-sm font-normal">
            999 kết quả
          </span>
        </h2>
        <div className="mt-5 flex flex-col gap-y-4">
          {users?.length > 0 ? (
            users.map((user) => <UserCard key={user.id} name={user?.name} avatar={user?.avatar}></UserCard>)
          ) : (
            <div>Nodata</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFriend;
