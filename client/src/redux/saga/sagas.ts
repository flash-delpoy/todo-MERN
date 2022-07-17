import { resolve } from "path";
import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { TodoApi } from "../../api";
import { constant } from "../../constant";
import {
  ICompleteAction,
  ICreateAction,
  IDeleteAction,
  ITodo,
  ITodoActionTypes,
  IUpdateAction,
} from "../../types/types";
import { hideAlert, showAlert } from "../actions";

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

// функція генератор
function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
  try {
    const todos = yield call(TodoApi.getTodos);

    yield put({
      type: ITodoActionTypes.GET_TODOS_SUCCESS,
      payload: todos,
    });
  } catch (error) {
    yield put(showAlert(`${error}`, constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  }
}

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      title: action.payload,
      done: false,
    };

    const todo = yield call(TodoApi.createTodo, todoObject);

    yield put({
      type: ITodoActionTypes.CREATE_TODO_SUCCESS,
      payload: todo,
    });

    yield put(showAlert("Task successfully added", constant.status.success));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    console.log("Error", error);
    yield put(showAlert(`${error}`, constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  }
}

function* sagaCompleteTodo(
  action: ICompleteAction<ITodo>
): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      done: action.payload.done,
      _id: action.payload._id,
    };

    yield call(TodoApi.completeTodo, todoObject);

    yield put({
      type: ITodoActionTypes.COMPLETE_TODO_SUCCESS,
      payload: action.payload._id,
    });

    yield put(
      showAlert(
        `Note about the completion of the task is has been ${
          action.payload.done ? "placed" : "removed"
        }  `,
        constant.status.success
      )
    );
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`${error}`, constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  }
}
function* sagaUpdateTodo(
  action: IUpdateAction
): Generator<Effect, void, ITodo> {
  try {
    const todoObject: Partial<ITodo> = {
      _id: action.payload._id,
      title: action.payload.title,
      done: action.payload.done,
    };

    const todo = yield call(TodoApi.updateTodo, todoObject);

    yield put({
      type: ITodoActionTypes.UPDATE_TODO_SUCCESS,
      payload: todo,
      _id: action.payload._id,
    });
  } catch (error) {
    console.log(error)
 
    yield put(showAlert(`${error}`, constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  }
}

function* sagaDeleteTodo(action: IDeleteAction): Generator<Effect, void> {
  try {
    yield call(TodoApi.deleteTodo, action.payload);

    yield put({
      type: ITodoActionTypes.DELETE_TODO_SUCCESS,
      payload: action.payload,
    });

    yield put(showAlert("Task successfully deleted", constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`${error}`, constant.status.danger));
    yield call(delay, 3000);
    yield put(hideAlert());
  }
}

export function* sagaWatcher(): Generator<Effect, void> {
  yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos);
  yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo);
  yield takeEvery(ITodoActionTypes.COMPLETE_TODO, sagaCompleteTodo);
  yield takeEvery(ITodoActionTypes.UPDATE_TODO, sagaUpdateTodo);
  yield takeEvery(ITodoActionTypes.DELETE_TODO, sagaDeleteTodo);
}
