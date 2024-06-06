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

  const title: string = "Mobx";
  useEffect(() => {
    todolistApi.createTodolist(title).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "5ac6700c-25b9-4736-a13e-1f2a873b694f";
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
