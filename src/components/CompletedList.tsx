import axios from "axios";
import { item } from "../App";

interface CompletedListProps {
  completedItems: item[] | undefined;
  baseURL: string;
}

export function CompletedList(props: CompletedListProps): JSX.Element {
  async function handleUndo(id: number) {
    const res = await axios.patch(`${props.baseURL}${id}`, {
      isCompleted: false,
    });
  }
  async function handleDelete(id: number) {
    const res = await axios.delete(`${props.baseURL}${id}`, {});
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
