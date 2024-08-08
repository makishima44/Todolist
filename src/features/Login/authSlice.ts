

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { setAppStatus } from 'app/appSlice';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { authAPI, LoginParamsType } from 'features/auth/authApi';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setIslogOut: (state) => {
      state.isLoggedIn = false;
    },
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
});

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }));
          dispatch(setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setAppStatus({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types

export const authReducer = slice.reducer;
export const { setIsLoggedIn, setIslogOut } = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;
