import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodosList = createAsyncThunk(
    'todos/fetchTodosList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
            // console.log(res);

            if (res.status !== 200) {
                return new Error('Server error')
            }
            return res.data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
//////////////// Удаление из сервера ////////////////
export const fetchByRemoveTodo = createAsyncThunk(
    'todos/fetchByRemoveTodo',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('Can\'t delete task! Server error')
            }

            dispatch(removeTodo({ id }))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
//////////////// Удаление из сервера ////////////////

export const fetchByToggleStatus = createAsyncThunk(
    'todos/fetchByToggleStatus',
    async (id, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find(item => item.id === id)
        try {
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed: !todo.completed })
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('Server error')
            }


            // const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            //     method: 'PATCH', 
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }, 
            //     body: JSON.stringify({
            //         completed: !todo.completed 
            //     })
            // })
            // if(res.status !== 200) {
            //      throw new Error('Server error')
            // }
            //    const data = await res.json()
            //     console.log(data);


            dispatch(toggleComplete({ id }))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchByAddNewTodo = createAsyncThunk(
    'todos/fetchByAddNewTodo',
    async (text, { rejectWithValue, dispatch }) => {
        try {
            const todo = {
                title: text, 
                userId: 1,
                completed: false,
            }
            const res = await axios.post(`https://jsonplaceholder.typicode.com/todos`, todo)
            // console.log(res);
            if (res.status !== 201) {
                throw new Error('Server error')
            }
            const data = res.data
            dispatch(addTodo({ data }))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
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
            state.todos.push(action.payload.data)
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(el => el.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchTodosList.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchTodosList.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.todos = action.payload;
            })
            .addCase(fetchTodosList.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(fetchByRemoveTodo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchByRemoveTodo.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(fetchByRemoveTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(fetchByToggleStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchByToggleStatus.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(fetchByToggleStatus.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;