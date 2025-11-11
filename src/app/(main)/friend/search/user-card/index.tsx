import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import React from 'react';

interface IUserCard {

}

const UserCard = ({}: IUserCard) => {
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-5">
            <div className="flex items-center gap-x-3">
              <img src="/images/default-profile.jpg" alt="" className="w-[60px] h-[60px] object-cover rounded-full"/>
              <div>
                <p className="font-medium text-lg">Nguyễn Văn A</p>
                <span className="text-sm font-thin">5 bạn chung</span>
              </div>
            </div>
            <div>
              <Button><UserRoundPlus />Kết bạn</Button>
            </div>
          </div>
    );
};

export default UserCard;