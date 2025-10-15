import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Lấy user ID đang đang nhập
    const userId = await getUserIdFromHeader(req);

    // Query tới DB
    const friends = await prisma.friendShip.findMany({
      where: { userId },
      include: {
        friend: {
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

    if (!friends) {
      return NextResponse.json(
        {
          success: true,
          messagge: "Không có bạn bè nào",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lấy danh sách bạn bè thành công",
        data: friends,
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
