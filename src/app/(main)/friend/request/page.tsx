"use client";
import FriendRequestCard from "@/components/friend-request-card";
import { getDataAPI } from "@/lib/api/api";
import { FriendRequestType } from "@/types/types";
import { useEffect, useState } from "react";

const FriendRequest = () => {
  const [friendRequests, setFriendRequest] = useState<FriendRequestType[]>([]);

  const fetchData = async () => {
    const response = await getDataAPI("/friends/request-list");
    if (response.status === 200) {
      setFriendRequest(response?.data?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="p-4 pt-5">
      <h1 className="font-bold text-[1.25rem] mb-4">Lời mời kết bạn</h1>
      {friendRequests.length > 0 ? (
        <div className="grid grid-cols-7 gap-3 flex-wrap">
          {friendRequests.map((request) => (
            <FriendRequestCard
              key={request?.id}
              avatar={request.requester.avatar}
              name={request.requester.name}
              requestId={request.id}
              onReload={fetchData}
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
            <span className="font-bold text-2xl ">
              Không có lời mời kết bạn nào!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
