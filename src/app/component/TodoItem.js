"use client";
import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";
import { useOnlineStatus } from "../hooks/networkStatus/useOnlineStatus";

function TodoItem() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isonline = useOnlineStatus();

  useEffect(() => {
    if (isonline === true) {
      setError(false);
    }
  }, [isonline]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    fetchTodos();
  }, []);


  let filteredTodos = todos;

  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "incomplete") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  async function fetchTodos() {
    const res = await fetch("http://localhost:3000/api/todos");
    const data = await res.json();
    setTodos(data.data.todos);
  }
  async function toggleComplete(id, status) {
    console.log({ id, status: !status });

    if (!isonline) {
      // alert("No internet connection.");
      setError(true);
      return;
    }

    const res = await fetch("/api/updateTodo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !status }),
    });
    console.log("response of put", res.status);

    setTodos((prev) =>
      prev.map((todo, i) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  async function handleAdd() {
    console.log("handle add triggerd");

    if (!isonline) {
      setError(true);

      return;
    }

    if (!todo.trim()) return;
    const res = await fetch("/api/createTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: todo }),
    });

    if (res.status) {
      setSuccess(true);
    }
    const data = await res.json();
    setTodos((prev) => [...prev, { text: todo, completed: false }]);
    setTodo("");
  }

  async function deletelist(id) {
    if (!isonline) {
      // alert("No internet connection.");
      setError(true);

      return;
    }
    const res = await fetch(`/api/deleteTodo/${id}`, {
      method: "DELETE",
    });
    // setTodos(todos.filter((data) => data.id !== id));
    fetchTodos();
  }
  return (
    <div className="border border-black p-16 rounded-xl">
      {success && (
        <div className=" bg-emerald-400 p-2 rounded-md flex gap-2 items-center   ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#000000"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
            />
          </svg>

          <p className="font-bold">Todo added into the list</p>
        </div>
      )}

      {error && (
        <div className=" bg-red-400 p-2 rounded-md flex gap-2 items-center flex-wrap mb-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="30px"
            height="30px"
            viewBox="0 -8 528 528"
          >
            <title>fail</title>
            <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z" />
          </svg>

          <p className="font-bold">please check your interner connection</p>
        </div>
      )}
      <div style={{ flexDirection: "row" }}>
        <h1 className="text-black flex justify-center font-bold">
          Simple To Do
        </h1>
        <input
          type="text"
          className="border border-black text-black pl-2"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="text-black ml-2 p-2 rounded-md bg-gray-300"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <FilterBar setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deletelist={deletelist}
      />
    </div>
  );
}

export default TodoItem;
