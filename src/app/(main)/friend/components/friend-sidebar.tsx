"use client";
import { Home, UsersRound, UserRoundPlus, UserSearch } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/shared/contexts/auth-context";

export default function FriendSidebar() {
  const {user} = useAuth()
  const items = [
    {
      title: "Trang chủ",
      url: "/news",
      icon: Home,
    },
    {
      title: "Lời mời kết bạn",
      url: "/friend/request",
      icon: UserRoundPlus,
    },
    {
      title: "Tất cả bạn bè",
      url: "/friend/all",
      icon: UsersRound,
    },
    {
      title: "Tìm kiếm bạn bè",
      url: "/friend/search",
      icon: UserSearch,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger />
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Image
                  priority
                  src={user?.avatar ? user.avatar : "/images/default-profile.jpg"}
                  alt="Avatar"
                  width={60}
                  height={60}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-slate-500">
                    {user?.email}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
