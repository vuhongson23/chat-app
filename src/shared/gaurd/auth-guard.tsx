"use client";
import { createUrlQuery, getDataLocal } from "@/lib/utils";
import { useAuth } from "@/shared/contexts/auth-context";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface IAuthGuard {
  children: ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const authContext = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const token = getDataLocal("TOKEN");
  const userInfor = getDataLocal("USER_INFOR");

  useEffect(() => {
    if (authContext.user === null && !token && !userInfor) {
      if (pathname !== "/" && pathname !== "/login") {
        router.replace("/" + "?" + createUrlQuery("returnUrl", pathname));
      } else {
        router.replace("/login");
      }
      authContext.setUser(null);
      window.localStorage.clear();
      redirect("/login");
    }
  }, [pathname, authContext]);

  return <>{children}</>;
};

export default AuthGuard;
