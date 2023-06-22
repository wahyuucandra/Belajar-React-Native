import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    title: "",
    selectedTodo: null,
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        ChangeTitle: (state, action) => {
            state.title = action.payload;
        },
        AddTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
            state.title = ""
        },
        ChooseTodo: (state, action) => {
            const {title} = action.payload

            state.selectedTodo = action.payload
            state.title = title
        },
        UpdateTodo: (state) => {
            const todo = state.todos.find(
                (todo) => todo.id === state.selectedTodo.id
            )
            todo.title = state.title
            
            state.todos = [
                ...state.todos.filter((todo) => todo.id !== state.selectedTodo.id), 
                todo,
            ]
            state.title = ""
            state.selectedTodo = null
        },
        DeleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        },
    }
})

export const {ChangeTitle, AddTodo, ChooseTodo, UpdateTodo, DeleteTodo} = todoSlice.actions
export default todoSlice