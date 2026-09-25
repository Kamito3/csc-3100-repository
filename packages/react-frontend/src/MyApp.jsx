// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // #4: send a DELETE request to the backend
  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
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

  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  // #4 - delete on the server first, then update the table
  function removeOneCharacter(index) {
    const person = characters[index];
    deleteUser(person.id)
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => console.log(error));
  }

  // function updateList(person) {
  //   postUser(person)
  //     .then(() => setCharacters([...characters, person]))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // #1 - only accept 201, #3 - use the object the server returns
  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
