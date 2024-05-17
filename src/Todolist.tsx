import React, { ChangeEvent, memo, useCallback, useMemo } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, ButtonProps, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";
import { TaskWithRedux } from "./TaskWithRedux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
};

export const Todolist = memo((props: PropsType) => {
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.changeTodolistTitle, props.id]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  let tasks = props.tasks;

  tasks = useMemo(() => {
    if (props.filter === "active") {
      tasks = tasks.filter((t) => t.isDone === false);
    }
    if (props.filter === "completed") {
      tasks = tasks.filter((t) => t.isDone === true);
    }
    return tasks;
  }, [props.tasks, props.filter]);

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasks.map((t) => {
          return (
            <Task
              key={t.id}
              task={t}
              todolistId={props.id}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
              removeTask={props.removeTask}
            />
          );
        })}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <MyButton
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
          name={"All"}
        />

        <MyButton
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
          name={"Active"}
        />

        <MyButton
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
          name={"Completed"}
        />
      </div>
    </div>
  );
});

type MyButtonProps = {
  name: string;
} & ButtonProps;

export const MyButton = memo(
  ({ variant, onClick, color, name }: MyButtonProps) => {
    return (
      <Button variant={variant} onClick={onClick} color={color}>
        {name}
      </Button>
    );
  }
);
