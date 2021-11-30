import { useImperativeHandle, useState } from "react";
import { item } from "../App";
const axios = require("axios").default;

interface ToDoListProps {
  incompleteItems: item[] | undefined;
}

export function ToDoList(props: ToDoListProps): JSX.Element {
  const [descriptionToAdd, setDescriptionToAdd] = useState("");
  async function handleAddDecription() {
    const res = await axios.post("http://localhost:4000/items", {
      description: descriptionToAdd,
    });
    setDescriptionToAdd(" ");
  }
  async function handleMarkCompleted(id: number) {
    const res = await axios.patch(`http://localhost:4000/items/${id}`, {
      isCompleted: true,
    });
  }
  async function handleDelete(id: number) {
    const res = await axios.delete(`http://localhost:4000/items/${id}`, {});
  }
  return (
    <>
      <input
        value={descriptionToAdd}
        placeholder="add item here"
        onChange={(e) => {
          const newItem = e.target.value;
          setDescriptionToAdd(newItem);
        }}
      />
      <button onClick={handleAddDecription}>Add item</button>
      <h2>To do:</h2>
      <ul>
        {props.incompleteItems &&
          props.incompleteItems.map((item) => (
            <li key={item.id}>
              {item.description}
              {"    "}
              <button onClick={() => handleMarkCompleted(item.id)}>
                ✔️
              </button>{" "}
              <button onClick={() => handleDelete(item.id)}>🗑️</button>
            </li>
          ))}
      </ul>
    </>
  );
}
