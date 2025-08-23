
import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.Admin:
      return [...adminSidebarItems];
    case role.agent:
      return [...agentSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};