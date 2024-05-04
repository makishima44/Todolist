import { AddItemForm } from "./AddItemForm";
import "./App.css";
import { Todolist } from "./Todolist";
import { Reducer, useReducer, useState } from "react";
import { v1 } from "uuid";
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
  todolistsReducer,
  updateTodolistTitleAC,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";

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

function AppWithReducers() {
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

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  //------------------------------------------------------------------------//

  const removeTask = (todolistID: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(todolistID, taskId));
  };

  const addTask = (title: string, todolistID: string) => {
    dispatchToTasks(addTaskAC(title, todolistID));
  };

  const updateTaskTitle = (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => {
    dispatchToTasks(changeTaskTitleAC(todolistID, taskId, newTitle));
  };

  const changeTaskStatus = (
    todolistID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    dispatchToTasks(changeTaskStatusAC(todolistID, taskId, taskStatus));
  };

  const removeTodolist = (todolistID: string) => {
    const action = removeTodolistAC(todolistID);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
    dispatchToTodolist(changeFilterAC(todolistID, newFilter));
  };

  const updateTodolistTitle = (todolistID: string, newTitle: string) => {
    dispatchToTodolist(updateTodolistTitleAC(todolistID, newTitle));
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
            let tasksForTodolist = tasks[el.id];
            if (el.filter === "active") {
              tasksForTodolist = tasks[el.id].filter((task) => !task.isDone);
            }

            if (el.filter === "completed") {
              tasksForTodolist = tasks[el.id].filter((task) => task.isDone);
            }

            return (
              <Grid item sx={{ mr: "30px" }}>
                <Paper elevation={3} sx={{ p: "20px" }}>
                  <Todolist
                    key={el.id}
                    todolistID={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                    updateTaskTitle={updateTaskTitle}
                    updateTodolistTitle={updateTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithReducers;
