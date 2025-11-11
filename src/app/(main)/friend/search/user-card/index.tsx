import { Button } from '@/components/ui/button';
import { postDataAPI } from '@/lib/api/api';
import { UserRoundPlus } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

interface IUserCard {
  name: string | undefined,
  avatar: string | undefined,
  id?: number
}

const UserCard = ({avatar, id, name}: IUserCard) => {
  const handleRequestFriend = async() => {
    try {
      const response = await postDataAPI('/friends/request', {receiverId: id})
      if(response.status === 201) {
        toast.success("Gửi lời mời kết bạn thành công!")
      }
    } catch (error) {
      toast.error("Lời mời kết bạn đã tồn tại!")
      
    }
  }
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-5">
            <div className="flex items-center gap-x-3">
              <img src={avatar ? avatar : '/images/default-profile.jpg'} alt="" className="w-[60px] h-[60px] object-cover rounded-full"/>
              <div>
                <p className="font-medium text-lg">{name}</p>
                <span className="text-sm font-thin">5 bạn chung</span>
              </div>
            </div>
            <div>
              <Button onClick={handleRequestFriend}><UserRoundPlus />Kết bạn</Button>
            </div>
          </div>
    );
};

export default UserCard;