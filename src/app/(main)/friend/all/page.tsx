"use client";

import FriendRequestCard from "@/components/friend-request-card";
import { getDataAPI } from "@/lib/api/api";
import { useEffect, useState } from "react";

type FriendType = {
  id: number,
  friend: {
    id: number,
    name: string,
    isOnline: boolean,
    avatar: string | null,
    bio: string | null,
    createdAt: string | null,
    email: string | null,
    updatedAt: string | null
  },
  friendId: number,
  userId: number,
  createdAt: string
}

const AllFriend = () => {
  const [friends, setFriend] = useState<FriendType[]>([]);
  console.log("🚀 ~ AllFriend ~ friends:", friends)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAPI("friends/list");
        if(response.status === 200) {
          setFriend(response?.data?.data)
        }
      } catch (error) {}
    };

    fetchData();
  }, []);
  return (
    <div className="p-4 pt-5">
      <h1 className="font-bold text-[1.25rem] mb-4">Tất cả bạn bè</h1>
      {friends.length > 0 ? (
        <div className="grid grid-cols-7 gap-3 flex-wrap">
          {friends.map((friend) => (
            <FriendRequestCard
              key={friend?.id}
              avatar={friend.friend.avatar}
              name={friend.friend.name}
              friendId={friend.friend.id}
              variant="friend"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="w-[50vw] flex flex-col items-center justify-center rounded-l p-3">
            <img
              src={"/images/no-data.png"}
              alt="no-data"
              className="w-[150px]"
            />
            <span className="font-bold text-2xl ">Bạn chưa có bạn bè nào!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFriend;
