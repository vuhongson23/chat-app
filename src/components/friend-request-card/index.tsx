import { Button } from "@/components/ui/button";
import { postDataAPI } from "@/lib/api/api";
import Image from "next/image";
import { toast } from "react-toastify";

interface IFriendRequestCard {
  avatar: string | null;
  name: string;
  requestId: number;
}

const FriendRequestCard = ({ avatar, name, requestId }: IFriendRequestCard) => {
  const handleFriendRequest = async (action: "ACCEPTED" | "REJECTED") => {
    try {
      const response = await postDataAPI("/friends/response", {
        action: action,
        requestId: requestId,
      });
      if (response.status === 200) {
        if (action === "ACCEPTED") {
          toast.success("Kết bạn thành công");
        } else {
          toast.success("Đã từ chối lời mời kết bạn");
        }
      }
    } catch (error) {
      toast.error(`Đã có lỗi xảy ra: ${error}`);
    }
  };

  return (
    <div className="rounded-lg shadow-md">
      <Image
        className="rounded-[8px_8px_0_0]"
        src={avatar ? avatar : "/images/default-profile.jpg"}
        width={193}
        height={193}
        alt="avatar"
      ></Image>
      <div className="flex flex-col gap-y-[6px] bg-white rounded-[0_0_8px_8px] p-3">
        <h2 className="font-semibold text-[1.0625rem] hover:underline cursor-pointer">
          {name}
        </h2>
        <span className="text-[#65686c] font-thin text-[.9375rem]">
          4 bạn chung
        </span>
        <Button onClick={() => handleFriendRequest("ACCEPTED")}>
          Xác nhận
        </Button>
        <Button
          onClick={() => handleFriendRequest("REJECTED")}
          variant={"outline"}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
