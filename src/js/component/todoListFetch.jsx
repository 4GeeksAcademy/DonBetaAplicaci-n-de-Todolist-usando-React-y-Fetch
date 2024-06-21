import React, { useState, useEffect } from "react";

export const TodoListFetch = () => {
    // los estados
    const [task, setTask] = useState("")
    const [user, setUser] = useState("Carlos")
    const [list, setList] = useState([]);
    const url_base = "https://playground.4geeks.com/apis/fake/todos";

    useEffect(() => {
        getTodoList();
    }, []);

    // Metodo Post
    const createTodoList = async () => {
        const url = url_base + "/user/" + user;
        const options = {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            // tratamos los errores aqui
            console.log("Error: ", response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();  // para que nops presente todos los ToDo
    }

    // Metodo Get
    const getTodoList = async () => {
        const url = url_base + "/user/" + user;
        const options = {
            method: "GET"
        };

        const response = await fetch(url, options)
        if (!response.ok) {
            // tratamoos el error
            console.log("Error: ", response.status, response.statusText)
            return response.status
        }
        const data = await response.json()
        console.log(data);
        setList(data);

    }

    // Metodo Put
    const updateTodoList = async (newTask) => {
        const dataToSend = [...list, newTask]
        const url = url_base + "/user/" + user;
        const options = {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            //Tratamos el error
            console.log("Error: ", response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
    }

    // Metodo Delete
    const deleteTodoList = async () => {
        const url = url_base + "/user/" + user;
        const options = {
            method: "DELETE"
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            // tratamos el error 
            console.log("Error: ", response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data)
        setList([])
    }

    const deleteTaskFetch = async () => {
        const url = url_base + "/user/" + user;
        const options = {
            method: "PUT",
            body: JSON.stringify(list),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            //tratamos el error 
            console.log("Error: ", response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data)
        getTodoList();
    }

    // Funcion onClick del icono 
    const deleteTask = (item) => {
        setList(list.filter((element, id) => {
            return item !== element;
        }))
        const tarea = () => deleteTaskFetch();
    };

    const addTask = (event) => {
        event.preventDefault();
        if (task.trim() === "") {
            return
        };
        const newTask = { label: task, done: false }
        updateTodoList(newTask)
        setTask("");
    }

    return (
        <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
            <h1 className="text-center">TodoList API</h1>
            <button onClick={createTodoList} className="btn btn-primary m-3">Crear Usuario</button>
            <button onClick={getTodoList} className="btn btn-warning m-3">Obtener Tareas</button>
            <button onClick={deleteTodoList} className="btn btn-danger m-3">Borrar Todo List</button>

            {/* Formulario para agregar tareas */}
            <div className="my-3">
                <form onSubmit={addTask}>
                    <input
                        className="form-control"
                        placeholder="Write a new task"
                        type="text"
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                    />
                </form>
            </div>

            {/* Lista de Tareas */}
            <h2 className="text-primary mt-2">Todos List</h2>
            <div className="list">
                <ul className="list-group">
                    {list.map((item, id) => (
                        <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
                            {item.label} - {item.done ? "terminado" : "pendiente"}
                            <span onClick={() => deleteTask(item)}>
                                <i className="fas fa-trash text-danger"></i>
                            </span>
                        </li>
                    ))}
                    <span className="list-group-item bg-light text-end fw-lighter">
                        {list.length === 0 ? "No tasks, add a task" : `${list.length} Item${list.length > 1 ? "s" : ""} Left`}
                    </span>
                </ul>
            </div>
        </div>
    );
};