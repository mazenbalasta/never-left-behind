import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const neverLeftBehindApi = createApi({
    reducerPath: 'neverLeftBehindApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        getAllAccounts: builder.query({
            query: () => '/api/accounts',
        }),
    }),
})
export const {
    useGetAllAccountsQuery
} = neverLeftBehindApi;
