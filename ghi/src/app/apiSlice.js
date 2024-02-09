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
        getAllActivities: builder.query({
            query: () => '/api/activities',
            providesTags: ['Activities']
        }),
        createActivities: builder.mutation({
            query: (formData) => ({
                url: '/api/activities',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Activities']
        }),
        getAllCategories: builder.query({
            query: () => '/api/categories',
        }),
        getAllJobs: builder.query({
            query: () => '/api/jobs',
            providesTags: ['Job'],
        }),
        createJob: builder.mutation({
            query: (formData) => ({
                url: `/api/jobs/`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Job'],
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/api/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Job'],
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
            invalidatesTags: ['Account'],

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
            query: ({ messageId, ...data }) => ({
                url: `/api/messages/${messageId}/responses`,
                method: 'POST',
                body: data,
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
    useGetAllActivitiesQuery,
    useGetAllCategoriesQuery,
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
    useGetAllJobsQuery,
    useCreateJobMutation,
    useDeleteJobMutation,
    useCreateActivitiesMutation,
} = neverLeftBehindApi;
