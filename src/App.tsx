import { AddItemForm } from "./AddItemForm";
import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
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

export type FilterValuesType = "all" | "active" | "completed";

type ThemeMode = "dark" | "light";
function App() {
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

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
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

  const removeTask = (todolistID: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((el) => el.id !== taskId),
    });
  };

  const addTask = (title: string, todolistID: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTodolistTasks = {
      ...tasks,
      [todolistID]: [...tasks[todolistID], newTask],
    };
    setTasks(newTodolistTasks);
  };

  const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, filter: newFilter } : el
      )
    );
  };

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistID));
    delete tasks[todolistID];
    setTasks({ ...tasks });
  };

  const changeTaskStatus = (
    todolistID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) =>
        el.id === taskId ? { ...el, isDone: taskStatus } : el
      ),
    });
  };

  const addTodolist = (title: string) => {
    const todolistId = v1();
    const newTodolist: TodolistType = {
      id: todolistId,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  const updateTaskTitle = (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) =>
        el.id === taskId ? { ...el, title: newTitle } : el
      ),
    });
  };

  const updateTodolistTitle = (todolistID: string, newTitle: string) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, title: newTitle } : el
      )
    );
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

export default App;
