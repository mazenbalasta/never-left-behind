import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { neverLeftBehindApi } from "./apiSlice"

export const store = configureStore({
    reducer: {
        [neverLeftBehindApi.reducerPath]: neverLeftBehindApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(neverLeftBehindApi.middleware)
})

setupListeners(store.dispatch)
