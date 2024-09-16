import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchByRemoveTodo, toggleComplete } from '../Store/slices/todoSlice';
import './TodoItem.css';

const TodoItem = ({ id, competed, title }) => {
    const dispatch = useDispatch();

    return (
        <li className={`todo-item ${competed ? 'completed' : ''}`}>
            <input
                checked={competed}
                onChange={() => dispatch(toggleComplete({ id }))}
                type="checkbox"
            />
            <span className="title">{title}</span>
            <span className="remove" onClick={() => dispatch(fetchByRemoveTodo(id))}>
                &times;
            </span>
        </li>
    );
};

export default TodoItem;
