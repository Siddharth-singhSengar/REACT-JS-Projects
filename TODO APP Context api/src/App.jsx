import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components';


function App() {
  const [todos, setTodos] = useState([]);  //here todos for all todos

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])    //passing todos obj and id in{} and ...prev list of todo all in array , ...todo means remaining
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? todo : prevtodo))  //take id of stored todo  if match than update todo 
  }

  const deleteTodo = (id, todo) => {

    setTodos((prev) => prev.filter((todo) => todo.id !== id))   // return array by removing that todo whoose id matches
  }

  const toggleComplete = (id) => {
    
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id == id ? { ...prevtodo, completed : !prevtodo.completed } : prevtodo)) /// set completed to  toggle
  }



  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className = 'w-full' >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </TodoProvider>

  )
}

export default App
