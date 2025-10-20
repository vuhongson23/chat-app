"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import AuthGuard from "@/shared/gaurd/auth-guard";
import { AuthProvider } from "@/shared/contexts/auth-context";
import { SocketProvider } from "@/shared/contexts/socket-context";
import { usePathname } from "next/navigation";

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const PATH_FRIEND = [
    "/friend",
    "/friend/request",
    "/friend/all",
    "/friend/search",
  ];
  const isShowSidebar = PATH_FRIEND.includes(pathname);
  return (
    <main>
      <AuthProvider>
        <AuthGuard>
          <SocketProvider>
            <SidebarProvider>
              {!isShowSidebar && <AppSidebar />}
              <div className="w-[100vw]">{children}</div>
            </SidebarProvider>
          </SocketProvider>
        </AuthGuard>
      </AuthProvider>
    </main>
  );
}
