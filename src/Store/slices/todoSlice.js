import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodosList = createAsyncThunk(
    'todos/fetchTodosList',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
            // console.log(res);
            
            if(res.status !== 200) {
                return new Error('Server error')
            }
            return res.data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchByRemoveTodo = createAsyncThunk (
    'todos'
)

const todoSlice = createSlice({
    name: 'todos', 
    initialState: {
        todos: [],
        status: null, 
        error: null,
    },
    reducers: { 
        addTodo(state, action) {

          state.todos.push({
            id: new Date().toISOString(), 
            title: action.payload.text, 
            competed: false
          })
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(el => el.id === action.payload.id)
            toggledTodo.competed = !toggledTodo.competed
        },
        removeTodo(state, action ) {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchTodosList.pending, (state) => {
            // console.log(state, action);
            state.status = 'loading'
            state.error = null
        })
        addCase(fetchTodosList.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.status = 'resolved'
            state.todos = action.payload
        })
        addCase(fetchTodosList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    }

})

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions

export default todoSlice.reducer