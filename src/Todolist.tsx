import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  useState,
} from "react";
import { FilteredVAluesType } from "./App";
import { Button } from "./Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TasksPropsType = {
  title: string;
  tasks: TaskType[];
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeTodoListFilter: (filter: FilteredVAluesType) => void;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeTodoListFilter,
  addTask,
}: TasksPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  let tasksList;
  if (tasks.length === 0) {
    tasksList = <span>Список пуст</span>;
  } else {
    tasksList = (
      <ul>
        {tasks.map((task: TaskType) => {
          const removeTaskHandler = () => removeTask(task.id);
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title="x" onClickHandler={removeTaskHandler} />
            </li>
          );
        })}
      </ul>
    );
  }

  const addNewTaskHandler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };

  const onkeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey && isAddTaskPossible) {
      addNewTaskHandler();
    }
  };

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15;

  const changeTodoListFilterHandlerCreater = (filter: FilteredVAluesType) => {
    changeTodoListFilter(filter);
  };

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onKeyDown={onkeyDownAddNewTaskHandler}
          onChange={setTaskTitleHandler}
        />
        <Button
          title={"+"}
          onClickHandler={addNewTaskHandler}
          isDisabled={!isAddTaskPossible}
        />
        {!taskTitle.length && <div>Please, enter title</div>}
        {taskTitle.length > 15 && <div>Task title is too long</div>}
      </div>
      {tasksList}
      <div>
        <Button
          title={"All"}
          onClickHandler={() => changeTodoListFilter("all")}
        />
        <Button
          title={"Active"}
          onClickHandler={() => changeTodoListFilter("active")}
        />
        <Button
          title={"Completed"}
          onClickHandler={() => changeTodoListFilter("completed")}
        />
      </div>
    </div>
  );
};
