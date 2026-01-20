const express = require("express");

const app = express();
app.use(express.json());

let tasks = [];
let idCounter = 1;

// CREATE
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Título é obrigatório" });
  }

  const task = {
    id: idCounter++,
    title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

// READ
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});


// DELETE
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
