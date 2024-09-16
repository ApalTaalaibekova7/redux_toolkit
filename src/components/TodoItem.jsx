import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchByRemoveTodo, fetchByToggleStatus } from '../Store/slices/todoSlice';
import './TodoItem.css';

const TodoItem = ({ id, completed, title }) => {
    const dispatch = useDispatch();

    return (
        <li className={`todo-item ${completed ? 'completed' : ''}`}>
            <input
                checked={completed}
                onChange={() => dispatch(fetchByToggleStatus(id))}
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
