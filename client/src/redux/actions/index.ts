import { ITodoActionTypes } from "../../types/types";

export const getTodos = () => {
  return {
    type: ITodoActionTypes.GET_TODOS,
  };
};

export const createTodo = (payload: string) => {
  return {
    type: ITodoActionTypes.CREATE_TODO,
    payload,
  };
};

export const completeTodo = (_id: string, done: boolean) => {
  return {
    type: ITodoActionTypes.COMPLETE_TODO,
    payload: {
      _id,
      done,
    },
  };
};

export const updateTodo = (_id: string, title: string, done: boolean) => {
  return {
    type: ITodoActionTypes.UPDATE_TODO,
    payload: {
      _id,
      title,
      done,
    },
  };
};

export const deleteTodo = (payload: string) => {
  return {
    type: ITodoActionTypes.DELETE_TODO,
    payload,
  };
};

export const showAlert = (text: string, status: string) => {
  return {
    type: ITodoActionTypes.SHOW_ALERT,
    payload: text,
    status,
  };
};

export const hideAlert = () => {
  return {
    type: ITodoActionTypes.HIDE_ALERT,
  };
};
