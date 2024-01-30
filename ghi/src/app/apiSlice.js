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
        getAllMessages: builder.query({
            query: () => '/api/messages',
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
    useGetAllMessagesQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = neverLeftBehindApi;
