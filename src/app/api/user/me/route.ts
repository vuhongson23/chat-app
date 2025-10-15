import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getUserIdFromHeader(req);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        avatar: true,
        bio: true,
        email: true,
        name: true,
        isOnline: true,
        createdAt: true,
        updatedAt: true,
        lastSeen: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Không tìm thấy người dùng",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lấy thông tin người dùng thành công",
        user,
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
