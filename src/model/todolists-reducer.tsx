import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type ChangeTodolistTitleActionType = ReturnType<
  typeof updateTodolistTitleAC
>;

export type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.id);
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodolist];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.title } : el
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.filter } : el
      );
    }

    default:
      throw new Error("I don't understand this type");
  }
};
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", id } as const;
};

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() } as const;
};

export const updateTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title } as const;
};

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter } as const;
};
