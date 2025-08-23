
import AddMoney from "@/pages/User/AddMoney";
import { CashOut } from "@/pages/User/CashOut";
import Overview from "@/pages/User/Overview";
import UserProfile from "@/pages/User/Profile";
import { SendMoney } from "@/pages/User/SendMoney";
import TransactionsHistory from "@/pages/User/TransactionsHistory";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "User Dashboard",
        items: [
            {
                title: "Overview",
                url: "/user/overview",
                component: Overview
            },
            {
                title: "Add money",
                url: "/user/add-money",
                component: AddMoney
            },
            {
                title: "Send money",
                url: "/user/send-money",
                component: SendMoney
            },
            {
                title: "CashOut",
                url: "/user/cash-out",
                component: CashOut
            },
            {
                title: "Transactions",
                url: "/user/transactions",
                component: TransactionsHistory
            },
            {
                title: "Profile",
                url: "/user/profile",
                component: UserProfile
            },
        ]
    }
]