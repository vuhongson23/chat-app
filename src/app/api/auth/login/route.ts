import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .regex(
      new RegExp(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      ),
      "Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số và 1 kí tự đặc biệt"
    ),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const isValid = await loginSchema.safeParse(body);

    if (!isValid.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu không hợp lệ",
          details: isValid.error,
        },
        { status: 400 }
      );
    }

    const { email, password } = isValid.data;

    if (!email || !password) return null;

    // Kiểm tra user đã có trong DB chưa
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Tài khoản này chưa được đăng kí",
          details: isValid.error,
        },
        { status: 400 }
      );
    }

    // Kiểm tra password
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Mật khẩu không chính xác",
          details: isValid.error,
        },
        { status: 400 }
      );
    }

    // Tách password để trả về thông tin user
    const { password: userPassword, ...userResponse } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Đăng nhập thành công",
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Login error: ", error);
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
