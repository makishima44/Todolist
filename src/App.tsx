import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "JS", isDone: true },
    { id: 3, title: "JS", isDone: true },
  ];

  let tasks2: Array<TaskType> = [
    { id: 4, title: "Terminator", isDone: true },
    { id: 5, title: "XXX", isDone: false },
    { id: 6, title: "Jentelments of fortune", isDone: true },
  ];
  return (
    <div className="App">
      <Todolist title="What to lern" tasks={tasks1} />
      <Todolist title="Songs" tasks={tasks2} />
      <Todolist title="Book" tasks={tasks2} />
    </div>
  );
}

export default App;
