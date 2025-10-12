import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Bắt đầu seed dữ liệu...");

  await prisma.friendShip.deleteMany();
  await prisma.friendRequest.deleteMany();
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: "hashedpassword123",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Hello! I am Alice.",
      isOnline: true,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      password: "hashedpassword123",
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Hey there! I am Bob.",
      isOnline: false,
    },
  });

  const charlie = await prisma.user.create({
    data: {
      email: "charlie@example.com",
      name: "Charlie",
      password: "hashedpassword123",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "I love chatting with friends!",
      isOnline: true,
    },
  });

  console.log("✅ Đã tạo users");

  await prisma.friendRequest.createMany({
    data: [
      { requesterId: alice.id, recipientId: bob.id, status: "PENDING" },
      { requesterId: bob.id, recipientId: charlie.id, status: "ACCEPTED" },
    ],
  });

  console.log("✅ Đã tạo friend requests");

  await prisma.friendShip.create({
    data: {
      userId: bob.id,
      friendId: charlie.id,
    },
  });

  console.log("✅ Đã tạo friendships");

  await prisma.message.createMany({
    data: [
      {
        content: "Hi Bob! How are you?",
        senderId: alice.id,
        receiverId: bob.id,
        isRead: false,
      },
      {
        content: "I am fine, thanks Alice! You?",
        senderId: bob.id,
        receiverId: alice.id,
        isRead: true,
      },
    ],
  });

  console.log("✅ Đã tạo messages");
  console.log("🎉 Seed dữ liệu hoàn tất!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Lỗi seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
