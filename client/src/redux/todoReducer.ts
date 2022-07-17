import { act } from "react-dom/test-utils";
import { ITodoAction, ITodoActionTypes, ITodoState } from "../types/types";

export const initialState = {
  todos: [],
};

export const todoReducer = (
  state: ITodoState = initialState,
  action: ITodoAction
) => {
  switch (action.type) {
    case ITodoActionTypes.GET_TODOS_SUCCESS:
      return { ...state, todos: action.payload };

    case ITodoActionTypes.CREATE_TODO_SUCCESS:
      return { todos: [action.payload, ...state.todos] };

    case ITodoActionTypes.COMPLETE_TODO_SUCCESS: {
      const newTodos = [...state.todos];
      const completeIndex = state.todos.findIndex(
        (todo) => todo._id === action.payload
      );

      if (completeIndex === -1) {
        return state;
      }

      newTodos[completeIndex].done = !newTodos[completeIndex].done;
      return { ...state, todos: newTodos };
    }

    case ITodoActionTypes.UPDATE_TODO_SUCCESS: {
      const newTodos = [...state.todos];
      const completeIndex = state.todos.findIndex(
        (todo) => todo._id === action._id
      );

      if (completeIndex === -1) {
        return state;
      }

      newTodos[completeIndex] = action.payload;
      return { ...state, todos: newTodos };
    }

    case ITodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };

    default:
      return state;
  }
};
