import {useReducer, useState} from 'react'
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import TodoItem from '../components/TodoItem';
import { useDispatch, useSelector } from "react-redux"
import { AddTodo, ChangeTitle, ChooseTodo, DeleteTodo, UpdateTodo } from '../reducer/todo.reducer';
import { useAddTodoMutation } from '../reducer/todo.api';

const initialState = {
    todos: [],
    title: "",
    selectedTodo: null,
}

const actions = {
    CHANGE_TITLE    : "change_title",
    ADD_TODO        : "add_todo",
    CHOOSE_TODO     : "choose_todo",
    UPDATE_TODO     : "update_todo", 
    DELETE_TODO     : "delete_todo",
}

const todoReducer = (state, action) => {
    switch (action.type) {
        case actions.CHANGE_TITLE:
            return {
                ...state,
                title: action.payload,

            };
        case actions.CHOOSE_TODO:
            const {title} = action.payload
            return {
                ...state,
                selectedTodo: action.payload,
                title: title,
            };
        case actions.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                title: ""
            };
        case actions.UPDATE_TODO:
            const todo = state.todos.find(
                (todo) => todo.id === state.selectedTodo.id
            )
            todo.title = state.title
            
            return {
                ...state,
                todos: [
                    ...state.todos.filter((todo) => todo.id !== state.selectedTodo.id), 
                    todo,
                ],
                title: "",
                selectedTodo: null
            };
        case actions.DELETE_TODO:
            return {
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        default:
            break;
    }
}

const Todo = () => {
    // const [todos, setTodos] = useState([])
    // const [title, setTitle] = useState("")
    // const [state, dispatch] = useReducer(todoReducer, initialState)
    // console.log(state)

    const dispatch = useDispatch()
    const {todos, selectedTodo, title} = useSelector((state) => state.todo)

    const [doAddTodo, {isLoading}] = useAddTodoMutation()

    const addTodo = async () => {

        if (!title) return
        
        // dispatch({ 
        //     type: actions.ADD_TODO, 
        //     payload: { 
        //         id: state.todos.length, 
        //         title: state.title
        //     }
        // })

        // dispatch(AddTodo({ id : todos.length, title : title }))

        await doAddTodo({id: 0, title})
    }

    const chooseTodoUpdate = (todo) =>{
        dispatch(ChooseTodo(todo))
        // dispatch({ type: actions.CHOOSE_TODO, payload: todo})
    }

    const handleUpdateTodo = () => {
        if (!title) return
        
        dispatch(UpdateTodo())
    }

    const deleteTodo = (todo) => {
        Alert.alert('Confirmation', 'Are you sure to delete this todo?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => dispatch(DeleteTodo(todo))},
        ]);
    }

  return (
    <View>
        <Text>Todo</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                value={title}
                onChangeText={(text) => dispatch(ChangeTitle(text))}
            />
            
            <Button style={styles.button}
                title="Submit" 
                onPress={selectedTodo ? handleUpdateTodo : addTodo}
            />
        </View>
        <View>
            {/* {todos.map((todo, index) => (
                <TodoItem 
                    key={index} 
                    todo={todo} 
                    chooseTodo={chooseTodoUpdate}
                    deleteTodo={deleteTodo}
                />
            ))} */}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingVertical: 8,
        flexDirection: 'row',
        columnGap: 8,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        flex: 1,
    },
    button: {
        alignItems: 'center',
    }
});

export default Todo