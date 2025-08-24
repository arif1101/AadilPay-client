import { baseApi } from "@/redux/baseApi";
export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        transaction: builder.query({
            query: () => ({
                url: "transaction/me",
                method: "GET",
            }),
            providesTags : ["USER"]
        })
        
    })
})

export const {useTransactionQuery}= transactionApi;