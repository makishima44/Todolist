import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonContainerSX, getListItemSx } from "./Todolist.styles";

type PropsType = {
  todolistID: string;
  title: string;
  tasks: TaskType[];
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, filter: FilterValuesType) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    taskStatus: boolean
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistID: string) => void;
  updateTaskTitle: (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => void;
  updateTodolistTitle: (todolistID: string, newTitle: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    todolistID,
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodolist,
    updateTaskTitle,
    updateTodolistTitle,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todolistID, filter);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistID);
  };

  const addTaskhandler = (title: string) => {
    addTask(title, props.todolistID);
  };
  const updateTodolistTitleHandler = (newTitle: string) => {
    updateTodolistTitle(props.todolistID, newTitle);
  };

  const updateTaskTitleHandler = (taskID: string, newTitle: string) => {
    updateTaskTitle(props.todolistID, taskID, newTitle);
  };

  return (
    <div>
      <div>
        <h3>
          <EditableSpan
            oldTitle={title}
            updateTitle={updateTodolistTitleHandler}
          />
          {/* <Button title="x" onClick={removeTodolistHandler}></Button> */}
          <IconButton aria-label="delete" onClick={removeTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </h3>
      </div>
      <AddItemForm addItem={addTaskhandler} />

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(todolistID, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(todolistID, task.id, newStatusValue);
            };

            // const updateTaskTitleHandler = (newTitle: string) => {
            //   updateTaskTitle(props.todolistID, task.id, newTitle);
            // };

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />{" "}
                  <EditableSpan
                    oldTitle={task.title}
                    updateTitle={(newTitle: string) =>
                      updateTaskTitleHandler(task.id, newTitle)
                    }
                  />
                </div>

                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonContainerSX}>
        <Button
          color="secondary"
          variant={filter === "all" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          color="error"
          variant={filter === "active" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          color="primary"
          variant={filter === "completed" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
