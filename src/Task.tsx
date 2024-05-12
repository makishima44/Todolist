import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, memo } from "react";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
};

export const Task = memo(
  ({
    task,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    todolistId,
  }: TaskPropsType) => {
    console.log("TAsk");
    const onClickHandler = () => removeTask(task.id, todolistId);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      changeTaskStatus(task.id, newIsDoneValue, todolistId);
    };
    const onTitleChangeHandler = (newValue: string) => {
      changeTaskTitle(task.id, newValue, todolistId);
    };

    return (
      <div>
        <div className={task.isDone ? "is-done" : ""}>
          <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
          />

          <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
          <IconButton onClick={onClickHandler}>
            <Delete />
          </IconButton>
        </div>
      </div>
    );
  }
);
