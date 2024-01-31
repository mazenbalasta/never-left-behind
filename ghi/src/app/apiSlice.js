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
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Token'],
        }),
        login: builder.mutation({
            query: (info) => {
                let formData = null
                formData = new FormData()
                formData.append('username', info.username)
                formData.append('password', info.password)
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                }
            },
            invalidatesTags: (result) => {
                return (result && ['Token']) || []
            },
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Token'],
        }),
    }),
})
export const {
    useGetAllAccountsQuery,
    useGetTokenQuery,
    useLogoutMutation,
    useLoginMutation
} = neverLeftBehindApi;
