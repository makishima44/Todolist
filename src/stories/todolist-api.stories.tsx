import axios from "axios";
import React, { useEffect, useState } from "react";
import { Todolist } from "../Todolist";
import { todolistApi } from "../api/api";

export default {
  title: "API",
};

// const settings = {
//   withCredentials: true,
//   headers: {
//     "API-KEY": "fbf749e0-64a6-42c3-99e9-2abba935f513",
//   },
// };

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const promise = todolistApi.getTodolists();
    promise.then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  const title: string = "REACT";
  useEffect(() => {
    todolistApi.createTodolist(title).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "e9dd91ab-ac4b-4cda-8c02-7c54fd57c615";
    todolistApi.deleteTodolist(todolistId).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "d1a32168-e45f-45c5-9c2d-9cc3b531368b";
    const title: string = "JS";
    todolistApi
      .updateTodolist(todolistId, title)
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "f0d8fbe1-58dc-4b3f-900a-1bd8367a1e19";
    todolistApi.getTasks(todolistId).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "f0d8fbe1-58dc-4b3f-900a-1bd8367a1e19";
    const title: string = "2 task";
    todolistApi.createTask(todolistId, title).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "f0d8fbe1-58dc-4b3f-900a-1bd8367a1e19";
    const taskId = "9302c9bf-3dab-43eb-8c38-b67d0cdd0d76";
    todolistApi
      .deleteTask(todolistId, taskId)
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "f0d8fbe1-58dc-4b3f-900a-1bd8367a1e19";
    const taskId = "e0a2a1b7-c95a-4024-b93d-f8f2dda02810";
    todolistApi
      .updateTask(todolistId, taskId, {
        title: "New Task Title",
        description: "description",
        completed: false,
        status: 2,
        priority: 3,
        startDate: "",
        deadline: "",
      })
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
