import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Truy vấn data
    const data = await prisma.user.findMany({
      select: {
        id: true,
        avatar: true,
        bio: true,
        createdAt: true,
        email: true,
        name: true,
        isOnline: true,
        updatedAt: true,
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: "Không tìm thấy người dùng nào",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user_list: data,
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
