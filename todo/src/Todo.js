import React from 'react'


export default function Todo({todo, toggleTodo}) {
  function handleTodoClick(){
    toggleTodo(todo.id)
  }
  return (
    <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
        <span className='item'>{todo.name}</span>
        <br></br>

    </label>
  )
}
