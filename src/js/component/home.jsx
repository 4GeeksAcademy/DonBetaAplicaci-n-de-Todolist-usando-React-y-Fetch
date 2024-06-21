import React from "react";
import { TodoListFetch } from "./todoListFetch.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">ToDo List Usando Fetch</h1>
			<TodoListFetch />
		</div>
	);
};

export default Home;
