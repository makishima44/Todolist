import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, memo } from "react";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./Todolist";
import { useDispatch } from "react-redux";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const TaskWithRedux = memo(({ task, todolistId }: TaskPropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId));
  };
  const onTitleChangeHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
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
});
