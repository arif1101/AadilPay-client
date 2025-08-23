
import Profile from "@/pages/Admin/Profile";
import CashOut from "@/pages/User/CashOut";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "User Dashboard",
        items: [
            {
                title: "Profile",
                url: "/user/profile",
                component: Profile
            },
            {
                title: "CashOut",
                url: "/user/cash-out",
                component: CashOut
            }
        ]
    }
]