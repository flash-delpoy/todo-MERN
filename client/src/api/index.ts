import axios from "axios";
import { ITodo, ITodoState } from "../types/types";

const getCurrentUrl = () => {
  return window.location.origin;
};

export class TodoApi {
  static async getTodos(): Promise<ITodoState[]> {
    console.log(process.env.NODE_ENV);
    console.log(getCurrentUrl());

    let res;
    if (process.env.NODE_ENV === "production") {
      res = await axios.get(`${getCurrentUrl()}/api/todos`);
    } else {
      res = await axios.get(`http://localhost:3001/api/todos`);
    }

    return res.data;
  }

  static async createTodo(todo: Partial<ITodo>): Promise<ITodoState[]> {
    let res;
    if (process.env.NODE_ENV === "production") {
      res = await axios.post(`${getCurrentUrl()}/api/todos`, todo);
    } else {
      res = await axios.post("http://localhost:3001/api/todos", todo);
    }

    return res.data;
  }

  static async completeTodo(todo: Partial<ITodo>): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      axios.patch(`${getCurrentUrl()}/api/todos/${todo._id}`, todo);
    } else {
      axios.patch(`http://localhost:3001/api/todos/${todo._id}`, todo);
    }
  }

  static async updateTodo(todo: Partial<ITodo>): Promise<ITodo> {
    let res;
    if (process.env.NODE_ENV === "production") {
      res = await axios.patch(`${getCurrentUrl()}/api/todos/${todo._id}`, todo);
    } else {
      res = await axios.patch(
        `http://localhost:3001/api/todos/${todo._id}`,
        todo
      );
    }

    return res.data;
  }

  static async deleteTodo(_id: string): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      return axios.delete(`${getCurrentUrl()}/api/todos/${_id}`);
    } else {
      return axios.delete(`http://localhost:3001/api/todos/${_id}`);
    }
  }
}
