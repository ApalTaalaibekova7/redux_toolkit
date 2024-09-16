import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { useDispatch } from 'react-redux';
import { addTodo, fetchTodosList } from './Store/slices/todoSlice';
import TodoList from './components/TodoList';

const App = () => {
  const [text, setText] = useState('')
  // console.log(text);
  const dispatch = useDispatch()

  const handeForm = (e) => {
    e.preventDefault()
    if(text.trim().length > 0) {
      dispatch(addTodo({ text }))
      setText('')
    }
  }
  
  useEffect(() => {
    dispatch(fetchTodosList())
  }, [dispatch])
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