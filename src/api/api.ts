import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "fbf749e0-64a6-42c3-99e9-2abba935f513",
  },
});

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "fbf749e0-64a6-42c3-99e9-2abba935f513",
  },
};

export const todolistApi = {
  getTodolists: () => {
    return instance.get<TodoLostType[]>("/todo-lists");
  },

  createTodolist: (title: string) => {
    return instance.post<ResponceType<{ item: TodoLostType }>>("/todo-lists", {
      title,
    });
  },

  deleteTodolist: (todolistId: string) => {
    return instance.delete<ResponceType>(`/todo-lists/${todolistId}`);
  },

  updateTodolist: (todolistId: string, title: string) => {
    return instance.put<ResponceType>(`/todo-lists/${todolistId}`, {
      title,
    });
  },
};

export type TodoLostType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

type ResponceType<T = {}> = {
  data: T;
  fieldsErrors: [];
  messages: [];
  resultCode: 0;
};
