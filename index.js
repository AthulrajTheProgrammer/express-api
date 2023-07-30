const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Use the POST method to create a new user
app.post("/adduser", (req, res) => {
    const { id, name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const newUser = { id, name };
    users.push(newUser);

    res.status(201).json(newUser);
});

// Use the DELETE method to delete a user by ID
app.delete('/deleteuser/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
