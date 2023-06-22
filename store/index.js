
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import todoSlice from "../reducer/todo.reducer"
import todoApi from "../reducer/todo.api"

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        [todoApi.reducerPath] : todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([todoApi.middleware]),
})

export default store