import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const userId = await getUserIdFromHeader(req);

    const { receiverId } = await req.json();

    // Kiểm tra xem người dùng có tự gửi kết bạn cho mình không
    if (userId === receiverId) {
      return NextResponse.json(
        {
          success: false,
          error: "Bạn không thể tự gửi kết bạn cho mình",
        },
        { status: 400 }
      );
    }

    // Kiểm tra xem lời mời kết bạn đã tồn tại hay chưa
    const isExist = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { requesterId: userId, recipientId: receiverId },
          { requesterId: receiverId, recipientId: userId },
        ],
      },
    });

    if (isExist) {
      return NextResponse.json(
        {
          success: false,
          error: "Lời mời kết bạn đã tồn tại",
        },
        { status: 400 }
      );
    }

    // Lưu dữ liệu vào DB
    const reqFriend = await prisma.friendRequest.create({
      data: {
        recipientId: receiverId,
        requesterId: userId,
      },
    });

    if (!reqFriend) {
      return NextResponse.json(
        {
          success: false,
          error: "Lưu dữ liệu kết bạn vào database thất bại",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Đã gửi lời mời kết bạn",
        data: reqFriend,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Đã có lỗi xảy ra!!!",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
