import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://belajar-react-native-f0756-default-rtdb.asia-southeast1.firebasedatabase.app/todos'
    }),
    endpoints: (builder) => ({
        getTodo: builder.query({
            url: () => ".json",
            providesTags: (result) => {
                console.log(result)
                return [{ type: "Todos", id: "PARTIAL_LIST"}]
            }
        }),
        addTodo: builder.mutation({
            query: (body) => ({
                url: () => ".json",
                method: 'POST',
                body,
            })
        })
    })
})

export const {useAddTodoMutation} = todoApi;
export default todoApi;