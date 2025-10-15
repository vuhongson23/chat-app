import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const userId = await getUserIdFromHeader(req);

    const { content, receiverId } = await req.json();

    if (!userId || userId === receiverId) {
      return NextResponse.json(
        {
          success: false,
          error: "Không thể tự gửi tin nhắn cho chính mình",
        },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: "Nội dung tin nhắn đang trống, Hãy nhập gì đó",
        },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: userId,
        receiverId,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gửi tin nhắn thành công",
        data: message,
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
