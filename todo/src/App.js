import React,{useState,useRef,useEffect} from 'react'
import TodoList from './TodoList'
import uuid from '../node_modules/uuid/dist/v4'
import './index.css'

export default function App() {
  const [todos , setTodos]= useState([])
  const todoNameRef = useRef()
  const LOCAL_ITEMS = 'todoItem';


  useEffect(()=>{
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_ITEMS))
    if(savedItems) setTodos(savedItems)
  },[])

  function toggleTodo(id){
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id ===id)
    todo.complete =!todo.complete
    setTodos(newTodo)

  }

  useEffect(()=>{
    localStorage.setItem(LOCAL_ITEMS,JSON.stringify(todos))
  },[todos])


  function handleAddTodo(event){
    let name =  todoNameRef.current.value;
    if (name==='') return;
    setTodos(prevTodos=>{
      return [...prevTodos,{id:uuid(),name:name,complete:false}]
    })
    todoNameRef.current.value=null;
  }

  function handleClearTodo(){
    const newTodos =  todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <h1 className='app-title'>To Do App</h1>
      <div className='sub-title'>{todos.filter(todo=>!todo.complete).length} Left</div>
      <input className='input' ref={todoNameRef} type="text"/>
      <button className='btn action-btn' onClick={handleAddTodo}>Add</button>
      <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <button className='btn action-btn' onClick={handleClearTodo}>Clear Completed</button>
    </div>
  )
}
