import { generateToken, verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { refreshToken } = await req.json();

    // Giải mã token
    const decode = await verifyToken(refreshToken);

    if (!decode) {
      return NextResponse.json(
        {
          success: false,
          error: "Token không hợp lệ",
        },
        { status: 401 }
      );
    }

    // Tìm user từ id giải mã từ refresh token
    const user = await prisma.user.findUnique({
      where: { id: decode?.userId },
    });

    // Kiểm tra thông tin token giải mã từ token có khớp với dữ liệu từ DB không
    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Token không khớp",
        },
        { status: 403 }
      );
    }

    // Tạo token mới
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const token = await generateToken(payload);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Tạo token mới thất bại",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tạo access token mới thành công",
        accessToken: token.accessToken,
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
