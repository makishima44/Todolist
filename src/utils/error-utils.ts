import { Dispatch } from "redux";
import { setAppStatusAC, setErrorAC } from "../app/app-reducer";
import { ResponseType } from "../api/todolists-api";

export const handleServerAppError = <T>(
  dispatch: Dispatch,
  data: ResponseType<T>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("something went wrong"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  dispatch: Dispatch,
  error: { message: string }
) => {
  dispatch(setErrorAC(error.message));
  dispatch(setAppStatusAC("failed"));
};
