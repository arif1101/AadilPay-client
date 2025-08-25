import AdminOverview from "@/pages/Admin/AdminOverview";
import AllTransactions from "@/pages/Admin/AllTransactions";
import ManageAgent from "@/pages/Admin/ManageAgent";
import ManageUsers from "@/pages/Admin/ManageUsers";
import type { ISidebarItem } from "@/types";
import AdminProfile from "@/pages/Admin/AdminProfile";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Admin Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/admin-overview",
                component: AdminOverview
            },
            {
                title: "Manage Users",
                url: "/admin/manage-user",
                component: ManageUsers
            },
            {
                title: "Manage Agents",
                url: "/admin/manage-agent",
                component: ManageAgent
            },
            {
                title: "All Transactions",
                url: "/admin/all-transactions",
                component: AllTransactions
            },
            {
                title: "Profile",
                url: "/admin/admin-profile",
                component: AdminProfile
            }
        ]
    }
]