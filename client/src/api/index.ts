import axios from "axios";
import { ITodo, ITodoState } from "../types/types";

export class TodoApi {
  static async getTodos(): Promise<ITodoState[]> {
    const res = await axios.get(`http://localhost:3001/api/todos`);
    return res.data;
  }

  static async createTodo(todo: Partial<ITodo>): Promise<ITodoState[]> {
    const res = await axios.post("http://localhost:3001/api/todos", todo);

    return res.data;
  }

  static async completeTodo(todo: Partial<ITodo>): Promise<void> {
    axios.patch(`http://localhost:3001/api/todos/${todo._id}`, todo);
  }

  static async updateTodo(todo: Partial<ITodo>): Promise<ITodo> {
    const res = await axios.patch(
      `http://localhost:3001/api/todos/${todo._id}`,
      todo
    );

    return res.data;
  }

  static async deleteTodo(_id: string): Promise<void> {
    return axios.delete(`http://localhost:3001/api/todos/${_id}`);
  }
}
