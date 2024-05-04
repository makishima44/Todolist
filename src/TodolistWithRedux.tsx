import { ChangeEvent } from "react";
import { FilterValuesType, TaskType, TodolistType } from "./AppWithRedux";
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
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import {
  changeFilterAC,
  removeTodolistAC,
  updateTodolistTitleAC,
} from "./model/todolists-reducer";

type PropsType = {
  todolist: TodolistType;
};

export const TodolistWithRedux = ({ todolist }: PropsType) => {
  const { id, filter, title } = todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[id]
  );

  let dispatch = useDispatch();

  const addTaskhandler = (title: string) => {
    dispatch(addTaskAC(title, id));
  };

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const updateTodolistTitleHandler = (title: string) => {
    dispatch(updateTodolistTitleAC(id, title));
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeFilterAC(id, filter));
  };

  if (filter === "active") {
    tasks = tasks.filter((task) => task.isDone);
  }

  if (filter === "completed") {
    tasks = tasks.filter((task) => task.isDone);
  }

  return (
    <div>
      <div>
        <h3>
          <EditableSpan
            oldTitle={title}
            updateTitle={updateTodolistTitleHandler}
          />

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
            const removeTaskHandler = () => dispatch(removeTaskAC(id, task.id));
            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              let newStatusValue = e.currentTarget.checked;
              dispatch(changeTaskStatusAC(id, task.id, newStatusValue));
            };

            const updateTaskTitleHandler = (newTitle: string) => {
              dispatch(changeTaskTitleAC(id, task.id, newTitle));
            };

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    oldTitle={task.title}
                    updateTitle={updateTaskTitleHandler}
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
