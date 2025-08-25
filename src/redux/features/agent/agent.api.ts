import { baseApi } from "@/redux/baseApi";
export const agentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cashInToUser: builder.mutation({
            query: (cashInInfo) => ({
                url: "/agents/cash-in",
                method: "POST",
                data: cashInInfo
            }),
            invalidatesTags: ["USER"]
        }),
        cashOutFromUser: builder.mutation({
            query: (cashOutInfo) => ({
                url: "/agents/cash-out",
                method: "POST",
                data: cashOutInfo
            }),
            invalidatesTags: ["USER"]
        }),
        agentTransactions: builder.query({
            query: () => ({
                url: "agents/transactions",
                method: "GET",
            }),
        })
    })
})

export const {useCashInToUserMutation, useCashOutFromUserMutation, useAgentTransactionsQuery}= agentApi;