import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleComplete } from '../Store/slices/todoSlice';

const TodoItem = ({ id, competed, title }) => {
    const dispatch = useDispatch();

    const styles = {
        li: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ccc',
        },
        checkbox: {
            marginRight: '10px',
        },
        title: {
            flexGrow: 1,
            textDecoration: competed ? 'line-through' : 'none',
            color: competed ? '#888' : '#000',
        },
        remove: {
            cursor: 'pointer',
            color: 'red',
            marginLeft: '10px',
        },
    };

    return (
        <li style={styles.li}>
            <input
                style={styles.checkbox}
                checked={competed}
                onChange={() => dispatch(toggleComplete({ id }))}
                type="checkbox"
            />
            <span style={styles.title}>{title}</span>
            <span style={styles.remove} onClick={() => dispatch(removeTodo({ id }))}>
                &times;
            </span>
        </li>
    );
};

export default TodoItem;
