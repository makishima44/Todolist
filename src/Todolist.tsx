import Button from "./Button";
import { TodoListHeader } from "./TodolistHeader";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

export const Todolist = ({ title, tasks }: PropsType) => {
  let tasksList;
  if (tasks.length === 0) {
    // Условный рендеринг
    tasksList = <span>Список пуст</span>;
  } else {
    tasksList = (
      <ul>
        {tasks.map((task: TaskType) => {
          return (
            <li>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="todolist">
      <TodoListHeader title={title} />
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {tasksList}
      <div>
        <Button title={"All"} />
        <Button title={"Active"} />
        <Button title={"Completed"} />
      </div>
    </div>
  );
};
