
import AgentTransactions from "@/pages/Agent/AgentTransactions";
import CashInToUser from "@/pages/Agent/CashInToUser";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Agent Dashboard",
        items: [
            {
                title: "Transactions",
                url: "/agent/transactions",
                component: AgentTransactions
            },
            {
                title: "CashInToUser",
                url: "/agent/all-users",
                component: CashInToUser
            }
        ]
    }
]