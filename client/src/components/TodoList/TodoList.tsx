import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TodoItem } from "../TodoItem/TodoItem";
import { ITodoReducer } from "../../types/types";
import "./style.css";
import { completeTodo, deleteTodo, updateTodo } from "../../redux/actions";

export const TodoList = () => {
  const state = useSelector((state: ITodoReducer) => state.todoReducer);
  const dispatch = useDispatch();

  const changeTodo = (id: string, title: string, done: boolean) => {
    dispatch(updateTodo(id, title, done));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const doneTodo = (id: string, done: boolean) => {
    dispatch(completeTodo(id, done));
  };

  return (
    <TransitionGroup component="ul" className="list-group">
      {state.todos.map((todo) => (
        <CSSTransition timeout={700} classNames={"todo"} key={todo._id}>
          <TodoItem
            todo={todo}
            deleteTodo={removeTodo}
            doneTodo={doneTodo}
            changeTodo={changeTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
