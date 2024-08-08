import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  addTodolistTC,
  changeTodolistTitle,
  fetchTodos,
  FilterValuesType,
  removeTodolistTC,
  todolistsActions,
} from 'features/TodolistsList/todolists.reducer';
import { addTask, removeTask, updateTask } from 'features/TodolistsList/tasks.reducer';

import { Grid, Paper } from '@mui/material';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectTasks } from 'features/TodolistsList/tasks.selectors';
import { selectTodolists } from 'features/TodolistsList/todolists.selectors';
import { TaskStatuses } from 'common/enums/enums';

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = fetchTodos();
    dispatch(thunk);
  }, []);

  const removeTaskCallback = useCallback(function (taskId: string, todolistId: string) {
    const thunk = removeTask({ taskId, todolistId });
    dispatch(thunk);
  }, []);

  const addTaskCallback = useCallback(function (title: string, todolistId: string) {
    dispatch(addTask({ title, todolistId }));
  }, []);

  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTask({ taskId, model: { status }, todolistId });
    dispatch(thunk);
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
    const thunk = updateTask({ taskId, model: { title: newTitle }, todolistId });
    dispatch(thunk);
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id);
    dispatch(thunk);
  }, []);

  const changeTodolistTitleCallback = useCallback(function (id: string, title: string) {
    dispatch(changeTodolistTitle({ id, title }));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCallback}
                  changeFilter={changeFilter}
                  addTask={addTaskCallback}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitleCallback}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
