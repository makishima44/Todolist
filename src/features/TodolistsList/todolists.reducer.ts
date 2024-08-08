import { appActions, RequestStatusType } from 'app/app.reducer';

import { AppThunk } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { ChangeTodolistArgs, todolistsAPI, TodolistType } from './todolists-api';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },

    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' };
      state.unshift(newTodolist);
    },

    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },

    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return [];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

// thunks

export const fetchTodos = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/fetchTodos`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { todolists: res.data };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistArgs, ChangeTodolistArgs>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.updateTodolist(arg.id, arg.title);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        return { id: arg.id, title: arg.title };
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

// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//   return (dispatch) => {
//     todolistsAPI.updateTodolist(id, title).then((res) => {
//       dispatch(todolistsActions.changeTodolistTitle({ id, title }));
//     });
//   };
// };

export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }));
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    });
  };
};

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    });
  };
};

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todosThunks = {
  fetchTodos,
};
