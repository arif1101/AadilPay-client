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
        })
    })
})

export const {useGetUsersQuery, useGetAgentsQuery, useGetTransactionsQuery, useGetWalletsQuery}= adminApi;