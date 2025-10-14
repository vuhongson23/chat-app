import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateToken } from "@/lib/jwt";

const registerSchema = z
  .object({
    email: z.email("Email không hợp lệ"),
    userName: z
      .string()
      .min(2, "Tên người dùng phải có tối thiểu 2 kí tự")
      .max(50, "Tên người dùng chỉ có tối đa 50 kí tự"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
      .regex(
        new RegExp(
          /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        ),
        "Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số và 1 kí tự đặc biệt"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Xác thực dữ liệu đăng ký
    const isValid = registerSchema.safeParse(body);

    if (!isValid.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu không hợp lệ",
          details: isValid.error,
        },
        {
          status: 400,
        }
      );
    }

    const { email, userName, password } = isValid.data;

    // Kiểm tra xem user đã được đăng kí chưa
    const isExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isExist) {
      return NextResponse.json(
        {
          success: false,
          error: "Email này đã được sử dụng",
        },
        { status: 409 }
      );
    }

    // Hashe password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng
    const user = await prisma.user.create({
      data: {
        email,
        name: userName,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Generate token
    const payload = { userId: user.id, email: user.email };
    const { refreshToken, accessToken } = await generateToken(payload);

    // Update refresh token vào DB
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Đăng ký thành công",
        user,
        token: { refreshToken, accessToken },
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
