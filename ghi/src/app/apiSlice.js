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
            // invalidatesTags: ['Account'],

            invalidatesTags: (result) => {
                return (result && ['Token']) || []
            },
        }),
        getAllMessages: builder.query({
            query: () => '/api/messages',
        }),
        getMessage: builder.query({
            query: (id) => ({
                url: `/api/messages/${id}`,
                method: 'GET',
            }),
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
        createResponse: builder.mutation({
            query: (messageId) => ({
                url: `/api/messages/${messageId}/responses`,
                method: 'POST',
                body: response,
            }),
        }),
        getMessageWithResponses: builder.query({
            query: (messageId) => ({
                url: `/api/messages/${messageId}/responses`,
                method: 'GET',
            }),
        }),
        incrementMessageViews: builder.mutation({
            query: (messageId) => ({
                url: `/api/messages/${messageId}/add-view`,
                method: 'PUT',
            }),
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
    useLoginMutation,
    useGetAllMessagesQuery,
    useGetMessageQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useCreateResponseMutation,
    useGetMessageWithResponsesQuery,
    useIncrementMessageViewsMutation,
} = neverLeftBehindApi;
