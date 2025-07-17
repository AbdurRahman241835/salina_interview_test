import React from "react";

function TodoList({ todos, deletelist, toggleComplete }) {
  return (
    <div className="mt-12">
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between mt-2 text-black border-b border-gray-300 pb-2"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              className="mr-2"
            />
            <span
              className={`${todo.completed ? "line-through" : ""} flex-1 mr-4`}
            >
              {todo.text}
            </span>
            <button
              className="bg-gray-300 px-3 py-2 rounded"
              onClick={() => deletelist(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;




