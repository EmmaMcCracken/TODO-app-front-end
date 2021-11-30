import axios from "axios";
import { item } from "../App";

interface CompletedListProps {
  completedItems: item[] | undefined;
}

export function CompletedList(props: CompletedListProps): JSX.Element {
  async function handleUndo(id: number) {
    const res = await axios.patch(`http://localhost:4000/items/${id}`, {
      isCompleted: false,
    });
  }
  async function handleDelete(id: number) {
    const res = await axios.delete(`http://localhost:4000/items/${id}`, {});
  }

  return (
    <>
      <h2>Completed:</h2>
      <ul>
        {props.completedItems &&
          props.completedItems.map((item) => (
            <li key={item.id}>
              {item.description}
              {"    "}
              <button onClick={() => handleUndo(item.id)}>Undo</button>{" "}
              <button onClick={() => handleDelete(item.id)}>🗑️</button>
            </li>
          ))}
      </ul>
    </>
  );
}
