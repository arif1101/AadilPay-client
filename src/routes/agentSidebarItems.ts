
import AgentOverview from "@/pages/Agent/AgentOverview";
import AgentProfile from "@/pages/Agent/AgentProfile";
import AgentTransactions from "@/pages/Agent/AgentTransactions";
import { CashInToUser } from "@/pages/Agent/CashInToUser";
import CommissionHistory from "@/pages/Agent/CommissionHistory";
import { WithdrawFromUser } from "@/pages/Agent/WithdrawFromUser";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Agent Dashboard",
        items: [
            {
                title: "Overview",
                url: "/agent/overview",
                component: AgentOverview
            },
            {
                title: "CashIn to User",
                url: "/agent/cashIn-to-user",
                component: CashInToUser
            },
            {
                title: "Withdraw from User",
                url: "/agent/cashOut-from-user",
                component: WithdrawFromUser
            },
            {
                title: "Transactions History",
                url: "/agent/transactions",
                component: AgentTransactions
            },
            {
                title: "Commission History",
                url: "/agent/comission",
                component: CommissionHistory
            },
            {
                title: "Profile",
                url: "/agent/profile",
                component: AgentProfile
            }
        ]
    }
]