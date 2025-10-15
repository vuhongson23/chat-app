import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Lấy user ID đang login
    const userId = await getUserIdFromHeader(req);

    // Lấy param truyền lên từ client
    const { requestId, action } = await req.json();

    // Kiểm tra xem friend request có tồn tại không
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request || request.recipientId !== userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Không tìm thấy yêu cầu kết bạn",
        },
        { status: 404 }
      );
    }

    // Nếu action là 'ACCEPTED' thì lưu dữ liệu ở 2 phía người gửi và người nhận
    if (action === "ACCEPTED") {
      await prisma.friendShip.createMany({
        data: [
          { userId: request.requesterId, friendId: request.recipientId },
          { userId: request.recipientId, friendId: request.requesterId },
        ],
      });

      await prisma.friendRequest.update({
        where: { id: request.id },
        data: { status: "ACCEPTED" },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Đã đồng ý kết bạn",
        },
        { status: 200 }
      );
    } else {
      await prisma.friendRequest.update({
        where: { id: request.id },
        data: { status: "REJECTED" },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Đã từ chối kết bạn",
        },
        { status: 200 }
      );
    }
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
