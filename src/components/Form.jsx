import React from 'react';

const Form = ({text, setText, handeForm}) => {
        return (
            <form onSubmit={handeForm}>
             <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text" placeholder='Task' />
                <button>Add Todo</button>
            </form>
          );
    
};

export default Form;