import { getUserIdFromHeader } from "@/lib/auth/getUserIdFromHeader";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = await getUserIdFromHeader(req);

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Không tìm thấy thông tin user" },
      { status: 404 }
    );
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            avatar: true,
            isOnline: true,
            name: true,
            lastSeen: true,
          },
        },
        receiver: {
          select: {
            id: true,
            avatar: true,
            isOnline: true,
            name: true,
            lastSeen: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!messages) {
      return NextResponse.json(
        {
          success: true,
          message: "Không có đoạn hội thoại nào!",
        },
        { status: 200 }
      );
    }

    // Gom nhóm mỗi bạn bè và tin nhắn mới nhất giữa 2 người
    const encountered = new Map<number, any>();
    const friendIds: number[] = [];

    for (const msg of messages) {
      const friend = msg.senderId === userId ? msg.receiver : msg.sender;

      if (!encountered.has(friend.id)) {
        encountered.set(friend.id, {
          friendId: friend.id,
          name: friend.name,
          avatar: friend.avatar,
          lastSeen: friend.lastSeen,
          isOnline: friend.isOnline,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
        });
        friendIds.push(friend.id);
      }
    }

    if (friendIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Không có tin nhắn mới",
        },
        { status: 200 }
      );
    }

    // Đếm số tin nhắn chưa đọc của từng friend đối với user
    const counts = await Promise.all(
      friendIds.map((id) => {
        return prisma.message.count({
          where: {
            senderId: id,
            receiverId: userId,
            isRead: false,
          },
        });
      })
    );

    // Ghép số tin nhắn chưa đọc của friend với user với object hội thoại
    const conversations = friendIds.map((id, index) => {
      const data = encountered.get(id);
      return {
        ...data,
        unreadCount: counts[index],
      };
    });

    // Sắp xếp lại để đảm bảo luôn là tin nhắn có thời gian mới nhất xếp lên đầu
    conversations.sort(
      (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    );

    return NextResponse.json(
      {
        success: true,
        message: "Lấy danh sách hội thoại thành công",
        conversations,
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
