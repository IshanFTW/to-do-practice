import { useState } from "react";
import { v4 as uuid } from "uuid";

function AddTodo({ inputValue, setInputValue, handleAddTodo }) {
  return (
    <div>
      <input
        type="text"
        placeholder="To-do's..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>+</button>
    </div>
  );
}

function ToDoList({ todos, handleDelete, handleToggle }) {
  const toDoList = todos.map((toDo) => {
    return (
      <li key={toDo.id}>
        <span style={{ textDecoration: toDo.done ? "line-through" : "none" }}>
          {toDo.name}
        </span>
        <button onClick={() => handleToggle(toDo.id)}>Mark as done</button>
        <button onClick={() => handleDelete(toDo.id)}>Delete</button>
      </li>
    );
  });

  return <ul>{toDoList}</ul>;
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    const newToDo = {
      id: uuid(),
      name: inputValue,
      done: false,
    };
    setTodos((prevTodos) => [...prevTodos, newToDo]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div>
      <AddTodo
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTodo={handleAddTodo}
      />
      <ToDoList 
        todos={todos}
        handleDelete={handleDelete}
        handleToggle={handleToggle} />
    </div>
  );
}
