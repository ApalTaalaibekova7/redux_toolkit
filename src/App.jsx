import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { useDispatch, useSelector } from 'react-redux';
import {fetchByAddNewTodo, fetchTodosList } from './Store/slices/todoSlice';
import TodoList from './components/TodoList';

const App = () => {
  const [text, setText] = useState('')
  // console.log(text);
  const dispatch = useDispatch()
  const {status} = useSelector(state => state.todos)

  const handeForm = (e) => {
    e.preventDefault()
    if(text.trim().length > 0) {
      dispatch(fetchByAddNewTodo(text))
      setText('')
    }
  }
  
  useEffect(() => {
    dispatch(fetchTodosList())
  }, [dispatch])

  if(status === 'loading') {
    return <h1>Loading...</h1>
  }

  return (
   <div>
      <Form
        text={text}
        setText={setText}
        handeForm={handeForm}
      />
      <TodoList />
   </div>
  );
};

export default App;