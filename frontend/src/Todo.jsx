import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Fetch todos on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleSubmit = () => {
    if (!input) return;

    axios
      .post("http://localhost:5000/todos", { text: input })
      .then((response) => setTodos((prevTodos) => [...prevTodos, response.data]))
      .catch((error) => console.error("Error adding todo:", error));

    setInput("");
  };

  const removeTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New Todo"
      />

      <button onClick={handleSubmit}>Submit</button>

      <ul className="todos-list">
        {todos.map(({ text, id }) => (
          <li key={id} className="todo">
            <span>{text}</span>
            <button className="close" onClick={() => removeTodo(id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
