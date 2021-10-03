/* eslint-disable no-unreachable */
import React, {Fragment, useState, useRef, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4} from "uuid";

const KEY = 'todoApp.todos';

export function App(){
    const [todos, setTodos] = useState([])

    const todoTaskRef = useRef();

    useEffect(()=>{
        const recuperarArray = JSON.parse(localStorage.getItem(KEY));
        if(recuperarArray){
            setTodos(recuperarArray);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const añadirUnNuevoTodo = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;

        setTodos((prevTodos)=>{
            return [...prevTodos,{id:uuidv4(), task,completed:false}]
        })
        todoTaskRef.current.value = null;
    }

    const borrarTarea = () => {
        const newTodos = todos.filter((todo)=> !todo.completed);
        setTodos(newTodos);
    }

    return(
        <Fragment>
            <TodoList todos = {todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type= "text" placeholder= "Nueva tarea" ></input>
            <button onClick={añadirUnNuevoTodo}>➕</button>
            <button onClick={borrarTarea}>🗑</button>
            <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</div>
        </Fragment>
    )
}