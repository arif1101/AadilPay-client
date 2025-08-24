import { baseApi } from "@/redux/baseApi";
export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "admin/users",
                method: "GET",
            }),
        }),
        getAgents: builder.query({
            query: () => ({
                url: "admin/agents",
                method: "GET",
            }),
        }),
        getTransactions: builder.query({
            query: () => ({
                url: "admin/transactions",
                method: "GET",
            }),
        }),
        getWallets: builder.query({
            query: () => ({
                url: "admin/wallets",
                method: "GET",
            }),
        }),
        blockWallet: builder.mutation({
            query: (walletId: string) => ({
                url: `admin/wallet/block/${walletId}`,
                method: "PATCH",
            }),
        }),
        activekWallet: builder.mutation({
            query: (walletId: string) => ({
                url: `admin/wallet/active/${walletId}`,
                method: "PATCH",
            }),
        }),
        suspandAgent: builder.mutation({
            query: (agetId: string) => ({
                url: `admin/agents/suspend/${agetId}`,
                method: "PATCH",
            }),
        }),
        approveAgent: builder.mutation({
            query: (agetId: string) => ({
                url: `admin/agents/approved/${agetId}`,
                method: "PATCH",
            }),
        }),
        updateAdmin: builder.mutation({
        query: (updateInfo: { name?: string; phone?: string; password?: string ; email?:string}) => ({
            url: "admin/update",
            method: "PATCH",
            data: updateInfo, // ✅ since you use Axios
        }),
        }),
        getAdmin: builder.query({
            query: () => ({
                url: "admin/me",
                method: "GET",
            }),
        }),
    })
})

export const {useGetUsersQuery, useGetAgentsQuery, useGetTransactionsQuery, useGetWalletsQuery, useBlockWalletMutation, useActivekWalletMutation, useSuspandAgentMutation, useApproveAgentMutation, useUpdateAdminMutation, useGetAdminQuery}= adminApi;