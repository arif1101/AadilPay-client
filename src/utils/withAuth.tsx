import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    

    if (!isLoading && !data?.data?.user?.phone) {
      return <Navigate to="/login" />;
    }

    // console.log("from withauth",requiredRole)

    if (requiredRole && !isLoading && requiredRole !== data?.data?.user?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};