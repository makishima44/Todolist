import { act } from "react-dom/test-utils";
import { FilterValuesType, TasksStateType, TodolistType } from "../App";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let ff = state[action.todolistId].filter((t) => t.id !== action.taskId);
      return {
        ...state,
        [action.todolistId]: ff,
      };
    }

    case "ADD-TITLE-TASK": {
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }

    case "REMOVE-TODOLIST": {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return { type: "ADD-TITLE-TASK", title, todolistId } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId } as const;
};
