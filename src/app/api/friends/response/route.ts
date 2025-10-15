import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const userId = await getUserIdFromHeader(req);
    const { requestId, action } = await req.json();

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
