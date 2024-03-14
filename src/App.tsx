import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilteredVAluesType = "all" | "active" | "completed";

function App() {
  //BLL:

  const todoListTitle_1 = "What to learn";
  const initialState: Array<TaskType> = [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ];

  const [tasks, setTasks] = useState(initialState);
  const [filter, setFilter] = useState<FilteredVAluesType>("all");

  const removeTask = (taskId: string) => {
    const updatedState = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedState);
  };

  const addTask = (title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    const updatedState = [newTask, ...tasks];
    setTasks(updatedState);
  };

  const changeTodoListFilter = (filter: FilteredVAluesType) => {
    setFilter(filter);
  };
  //UI:

  const getFilteredTasks = (
    allTasks: Array<TaskType>,
    currentFilter: FilteredVAluesType
  ): Array<TaskType> => {
    switch (currentFilter) {
      case "active":
        return allTasks.filter((t) => t.isDone === false);
      case "completed":
        return allTasks.filter((t) => t.isDone === true);
      default:
        return allTasks;
    }
  };

  const filteredTasks = getFilteredTasks(tasks, filter);

  return (
    <div className="App">
      <Todolist
        title={todoListTitle_1}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeTodoListFilter={changeTodoListFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
