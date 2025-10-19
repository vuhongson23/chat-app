"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import AuthGuard from "@/shared/gaurd/auth-guard";
import { AuthProvider } from "@/shared/contexts/auth-context";
import { SocketProvider } from "@/shared/contexts/socket-context";

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AuthProvider>
        <AuthGuard>
          <SocketProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="w-[100vw]">{children}</div>
            </SidebarProvider>
          </SocketProvider>
        </AuthGuard>
      </AuthProvider>
    </main>
  );
}
