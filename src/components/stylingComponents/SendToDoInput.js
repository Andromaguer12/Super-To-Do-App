import { Add, AddCircleOutline } from "@material-ui/icons";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useState } from "react";

export default function SendToDoInput({ sendTodoFunction }) {
  const [Focused, setFocused] = useState(false);
  const [Todo, setTodo] = useState("");

  const handleSend = async () => {
    const object = {
      content: Todo,
      favorite: false,
      checked: false,
      timestamp: new Date().getTime(),
    };
    await sendTodoFunction(object).then(() => {
      setTodo("");
      setFocused(false);
    });
  };

  return (
    <div className="InputAndSend flex-r-ac-jfs">
      <IconButton onClick={handleSend}>
        {Focused && Todo.length > 0 ? <AddCircleOutline /> : <Add />}
      </IconButton>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyPress={({ key }) => {
          if (key === "Enter") handleSend();
        }}
        onChange={(e) => setTodo(e.target.value)}
        placeholder={
          Focused
            ? 'Intenta escribiendo... "Pagar facturas de servicios a las 6pm"'
            : "Añadir To Do..."
        }
        className="sendTodoInput"
      />
    </div>
  );
}
