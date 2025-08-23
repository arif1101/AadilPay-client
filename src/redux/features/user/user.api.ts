import { baseApi } from "@/redux/baseApi";
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // login: btransferuilder.mutation({
        //     query: (userInfo) => ({
        //         url: "/wallet/transfer",
        //         method: "POST",
        //         data: userInfo
        //     })
        // }),
        transfer: builder.mutation({
            query: (transferInfo) => ({
                url: "/wallet/transfer",
                method: "POST",
                data: transferInfo
            }),

        }),
        cashOut: builder.mutation({
            query: (cashOutInfo) => ({
                url: "/wallet/withdraw",
                method: "POST",
                data: cashOutInfo
            }),

        }),
    })
})

export const {useTransferMutation, useCashOutMutation}= userApi;