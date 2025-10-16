import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { friendId: string } }
) => {
  const userId = await getUserIdFromHeader(req);
  const friendId = Number(params.friendId);

  if (!userId || !friendId) {
    return NextResponse.json(
      {
        success: false,
        error: "Đã có lỗi xảy ra",
      },
      { status: 401 }
    );
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, isOnline: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true, isOnline: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    if (!messages) {
      return NextResponse.json(
        {
          success: true,
          message: "Hãy bắt đầu cuộc trò chuyện nào",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lấy danh sách cuộc trò chuyện thành công",
        messages,
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
