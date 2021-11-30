import { useEffect, useState } from "react";
import { CompletedList } from "./components/CompletedList";
import { ToDoList } from "./components/ToDoList";

export interface item {
  id: number;
  description: string;
  isCompleted: boolean;
}

function App(): JSX.Element {
  const [completedItems, setCompletedItems] = useState<item[]>();
  const [incompleteItems, setIncompleteItems] = useState<item[]>();

  useEffect(() => {
    const fetchCompletedItems = async () => {
      const response = await fetch("http://localhost:4000/items/completed");
      const jsonBody: item[] = await response.json();
      setCompletedItems(jsonBody);
    };

    fetchCompletedItems();
  }, [completedItems]);

  useEffect(() => {
    const fetchInompleteItems = async () => {
      const response = await fetch("http://localhost:4000/items/incomplete");
      const jsonBody: item[] = await response.json();
      setIncompleteItems(jsonBody);
    };

    fetchInompleteItems();
  }, [incompleteItems]);

  return (
    <>
      <h1>ToDo App</h1>
      <ToDoList incompleteItems={incompleteItems} />
      <CompletedList completedItems={completedItems} />
    </>
  );
}

export default App;
