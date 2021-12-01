import { useEffect, useState } from "react";
import { CompletedList } from "./components/CompletedList";
import { ToDoList } from "./components/ToDoList";

export interface item {
  id: number;
  description: string;
  isCompleted: boolean;
}

const baseURL = "https://tododatabase30nov.herokuapp.com";

function App(): JSX.Element {
  const [completedItems, setCompletedItems] = useState<item[]>();
  const [incompleteItems, setIncompleteItems] = useState<item[]>();

  useEffect(() => {
    const fetchCompletedItems = async () => {
      const response = await fetch(`${baseURL}/items/completed`);
      const jsonBody: item[] = await response.json();
      setCompletedItems(jsonBody);
    };

    fetchCompletedItems();
  }, [completedItems]);

  useEffect(() => {
    const fetchInompleteItems = async () => {
      const response = await fetch(`${baseURL}/items/incomplete`);
      const jsonBody: item[] = await response.json();
      setIncompleteItems(jsonBody);
    };

    fetchInompleteItems();
  }, [incompleteItems]);

  return (
    <>
      <h1>ToDo App</h1>
      <ToDoList baseURL={baseURL} incompleteItems={incompleteItems} />
      <CompletedList baseURL={baseURL} completedItems={completedItems} />
    </>
  );
}

export default App;
