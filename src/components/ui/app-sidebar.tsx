"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  UsersRound,
} from "lucide-react";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/shared/contexts/auth-context";

export function AppSidebar() {
  const { handleLogout, user } = useAuth();
  console.log("🚀 ~ AppSidebar ~ user:", user)
  const items = [
    {
      title: "Home",
      url: "/news",
      icon: Home,
    },
    {
      title: "Message",
      url: "/message",
      icon: Inbox,
    },
    {
      title: "Friends",
      url: "/friend",
      icon: UsersRound,
    },
    {
      title: "Call",
      url: "/call",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ];

  const footer_items = [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Logout",
      icon: LogOut,
      onClick: handleLogout,
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
      <SidebarFooter>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {footer_items.map((item) => (
                <SidebarMenuItem key={item.title} className="cursor-pointer">
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <div onClick={() => (item.onClick ? item.onClick() : {})}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
