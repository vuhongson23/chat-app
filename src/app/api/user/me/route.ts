import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const authHeader = await req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    // Tách token từ chuỗi "Bearer [token]"
    const token = authHeader.split(" ")[1];

    // Giải mã token
    const decode = await verifyToken(token);

    if (!decode) {
      return NextResponse.json(
        {
          success: false,
          error: "Token không hợp lệ",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decode.userId },
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
