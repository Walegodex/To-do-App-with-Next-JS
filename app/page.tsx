import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { Itask } from "../types/tasks";

export default async function Home() {
  const tasks: Itask[] = await getAllTodos();
  console.log("Fetched tasks:", tasks); // Log the fetched tasks for debugging
  return (
    <main className="max-w-4xl mx-auto mt-4">
     <div className="text-center my-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">ToDo List App</h1>
      <AddTask tasks={tasks}/>
     </div>
    </main>
  );
}
