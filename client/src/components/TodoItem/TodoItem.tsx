import { ChangeEvent, useState } from "react";
import { ITodo } from "../../types/types";
import "./style.css";

interface ITodoProps {
  todo: ITodo;
  deleteTodo: (arg0: string) => void;
  doneTodo: (arg0: string, arg1: boolean) => void;
  changeTodo: (arg0: string, arg1: string, arg2: boolean) => void;
}

export const TodoItem = ({
  todo,
  deleteTodo,
  doneTodo,
  changeTodo,
}: ITodoProps) => {
  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      changeTodo(todo._id, newTitle, todo.done);
      setIsTodoEdit(!isTodoEdit);
    }
  };
  const handleTodoEdit = () => setIsTodoEdit(!isTodoEdit);
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };
  const handleComplete = () => doneTodo(todo._id, !todo.done);
  const handleDelete = () => deleteTodo(todo._id);

  return (
    <li
      className={`todo-item list-group-item d-flex justify-content-between align-items-center
    ${todo.done ? "list-group-item-success" : ""}`}
    >
      <div className="col-md-7 text" onKeyPress={handleSubmit}>
        {isTodoEdit ? (
          <input
            type="text"
            className="form-control"
            onChange={handleTitleChange}
          />
        ) : (
          <span className={`${todo.done ? "title-completed" : ""}`}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="col-md-5 text-end">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handleTodoEdit}
        >
          Update
        </button>
        <button
          className="btn btn-outline-success me-2"
          onClick={handleComplete}
        >
          {todo.done ? "Uncompleted" : "Completed"}
        </button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};
