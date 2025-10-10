import Image from "next/image";

const MessageHeader = () => {
  return (
    <div className="flex items-center px-[11px] py-[9px] border-b">
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
        <Image
          priority
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          width={60}
          height={60}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-3 flex flex-col">
        <p className="font-medium text-lg">Minh Tuấn</p>
        <span className="text-[#27AE60] text-sm">Đang hoạt động</span>
      </div>
    </div>
  );
};

export default MessageHeader;
