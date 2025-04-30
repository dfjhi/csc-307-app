import express from "express";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;


mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") 
  .catch((error) => console.log(error));

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    
    userService.getUsers(name, job)
      .then((users) => {
        res.json({ users_list: users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else if (name) {
    
    userService.findUserByName(name)
      .then((users) => {
        res.json({ users_list: users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else if (job) {
    
    userService.findUserByJob(job)
      .then((users) => {
        res.json({ users_list: users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    
    userService.getUsers()
      .then((users) => {
        res.json({ users_list: users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService.findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("not found.");
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService.addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService.findUserByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(`User id ${id} has been deleted`);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});