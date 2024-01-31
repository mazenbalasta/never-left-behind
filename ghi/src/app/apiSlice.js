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
        getToken: builder.query({
            query: (credentials) => ({
                url: '/token',
                credentials: 'include',
                body: credentials,
            }),
            providesTags: ['Account'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Account'],
        }),
        login: builder.mutation({
            query: (info) => {
                const formData = new FormData()
                formData.append('username', info.username)
                formData.append('password', info.password)

                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                }
            },
            // invalidatesTags: ['Account'],
            
        }),
        getAllMessages: builder.query({
            query: () => '/api/messages',
        }),
        getMessage: builder.query({
            query: (id) => ({
                url: `/api/messages/${id}`,
                method: 'GET',
            })
        }),
        createMessage: builder.mutation({
            query: (message) => ({
                url: '/api/messages',
                method: 'POST',
                body: message,
            }),
        }),
        updateMessage: builder.mutation({
            query: ({ id, ...message }) => ({
                url: `/api/messages/${id}`,
                method: 'PUT',
                body: message,
            }),
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/api/messages/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAllAccountsQuery,
    useGetTokenQuery,
    useLogoutMutation,
    useLoginMutation,
    useGetAllMessagesQuery,
    useGetMessageQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = neverLeftBehindApi;
