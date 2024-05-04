import { AddItemForm } from "./AddItemForm";
import "./App.css";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { filterButtonContainerSX } from "./Todolist.styles";
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  updateTodolistTitleAC,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import { TodolistWithRedux } from "./TodolistWithRedux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type FilterValuesType = "all" | "active" | "completed";

type ThemeMode = "dark" | "light";

function AppWithRedux() {
  //----------------------------------------------------------------------------------------------------//

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  //----------------------------------------------------------------------------------------------------//

  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  );

  let dispatch = useDispatch();

  //------------------------------------------------------------------------//

  const removeTask = (todolistID: string, taskId: string) => {
    dispatch(removeTaskAC(todolistID, taskId));
  };

  const addTask = (title: string, todolistID: string) => {
    dispatch(addTaskAC(title, todolistID));
  };

  const updateTaskTitle = (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => {
    dispatch(changeTaskTitleAC(todolistID, taskId, newTitle));
  };

  const changeTaskStatus = (
    todolistID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    dispatch(changeTaskStatusAC(todolistID, taskId, taskStatus));
  };

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID));
  };

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
    dispatch(changeFilterAC(todolistID, newFilter));
  };

  const updateTodolistTitle = (todolistID: string, newTitle: string) => {
    dispatch(updateTodolistTitleAC(todolistID, newTitle));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar sx={filterButtonContainerSX}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton background={theme.palette.primary.dark}>
              Login
            </MenuButton>
            <MenuButton background={theme.palette.primary.dark}>
              Logout
            </MenuButton>
            <MenuButton background={theme.palette.primary.light}>
              Faq
            </MenuButton>
            <Switch onChange={changeModeHandler} color={"default"} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: "30px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container>
          {todolists.map((el) => {
            return (
              <Grid key={el.id} item sx={{ mr: "30px" }}>
                <Paper elevation={3} sx={{ p: "20px" }}>
                  <TodolistWithRedux todolist={el} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithRedux;
