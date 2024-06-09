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

  getTasks: (todolistId: string) => {
    return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`);
  },

  createTask: (todolistId: string, taskTitle: string) => {
    return instance.post<ResponceType<TaskType>>(
      `todo-lists/${todolistId}/tasks`,
      { title: taskTitle }
    );
  },

  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponceType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask: (todolistId: string, taskId: string, model: UpdateTaskType) => {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model);
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
  fieldsErrors?: [];
  messages: [];
  resultCode: number;
};

export type GetTasksType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
