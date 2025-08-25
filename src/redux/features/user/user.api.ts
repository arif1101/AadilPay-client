import { baseApi } from "@/redux/baseApi";
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        transfer: builder.mutation({
            query: (transferInfo) => ({
                url: "/wallet/transfer",
                method: "POST",
                data: transferInfo
            }),
            invalidatesTags: ["USER"]

        }),
        cashOut: builder.mutation({
            query: (cashOutInfo) => ({
                url: "/wallet/withdraw",
                method: "POST",
                data: cashOutInfo
            }),

        }),
        updateUser: builder.mutation({
            query: (updateInfo) => ({
                url: "user/update",
                method: "PATCH",
                data: updateInfo,
            }),
            invalidatesTags : ["USER"]
        }),
    })
})

export const {useTransferMutation, useCashOutMutation, useUpdateUserMutation}= userApi;