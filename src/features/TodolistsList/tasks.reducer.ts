import { appActions } from 'app/app.reducer';
import { todolistsActions, todosThunks } from 'features/TodolistsList/todolists.reducer';
import { createSlice } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import {
  AddTaskArgs,
  DeleteTaskArgs,
  TaskType,
  todolistsAPI,
  UpdateTaskArgs,
  UpdateTaskModelType,
} from './todolists-api';
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums/enums';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      })

      .addCase(todosThunks.fetchTodos.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })

      .addCase(todosThunks.addTodolist.fulfilled, (state, action) => {
        const tl = action.payload.todolist;
        state[tl.id] = [];
      })

      .addCase(todosThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })

      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// thunks

export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.getTasks(todolistId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { tasks, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const removeTask = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        return { taskId: arg.taskId, todolistId: arg.todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        console.warn('task not found in the state');
        return rejectWithValue(null);
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.model,
      };

      const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
      if (res.data.resultCode === ResultCode.Success) {
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
