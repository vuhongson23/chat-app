import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getUserIdFromHeader(req);

    const requestList = await prisma.friendRequest.findMany({
      where: { recipientId: userId, status: "PENDING" },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            isOnline: true,
            avatar: true,
            bio: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!requestList) {
      return NextResponse.json(
        {
          success: true,
          messagge: "Không có lời mời kết bạn nào",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lấy danh sách lời mời kết bạn thành công",
        data: requestList,
      },
      { status: 200 }
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
