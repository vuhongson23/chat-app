import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export const getUserIdFromHeader = async (req: NextRequest) => {
  // Lấy token từ request header
  const authHeader = await req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: "Token chưa được gắn vào request header",
      },
      { status: 401 }
    );
  }

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

  // Trả về user ID
  return decode.userId;
};
