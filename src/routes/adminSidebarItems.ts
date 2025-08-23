import AllUser from "@/pages/Admin/AllUser";
import Profile from "@/pages/Admin/Profile";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Profile",
                url: "/admin/profile",
                component: Profile
            },
            {
                title: "Allusers",
                url: "/admin/all-users",
                component: AllUser
            }
        ]
    }
]