const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


let todos = [];


function generateId() {
  return Math.floor(Math.random() * 100000);
}


app.get("/todos", (req, res) => {
  res.json(todos);
});


app.post("/todos", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Todo text is required" });
  }

  const newTodo = { id: generateId(), text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;

  todos = todos.filter((todo) => todo.id !== parseInt(id));

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted successfully" });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
