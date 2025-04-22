// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((user) => user._id !== _id));
        } else if (res.statue === 404) {
          console.log("user not found");
        }else {
          console.log("Error deleting the user");
        }
      })
      .catch((error) => console.log("Error deleting the user:", error));
  }

  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => {
        if (res.status === 201) return res.json();  
        else throw new Error("Failed to add user");
      })
      .then((data) => {
        
        const newUser = data.user;  
        setCharacters((prev) => [...prev, newUser]);  
      })
      .catch((error) => {
        console.log("Error adding user:", error);
      });
    }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
      return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
}
return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList}/>
  </div>
);