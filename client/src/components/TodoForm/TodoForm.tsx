import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constant } from "../../constant";
import { createTodo, showAlert } from "../../redux/actions";
import { IAlertReducer } from "../../types/types";
import { Alert } from "../Alert/Alert";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const alertState = useSelector((state: IAlertReducer) => state.alertReducer);
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      dispatch(showAlert("Title can't be blank", constant.status.warning));
      return;
    }

    if (title.trim().length <= 3) {
      dispatch(
        showAlert("Title length could min 3 symbols", constant.status.warning)
      );
      return;
    }

    dispatch(createTodo(title));
    setTitle("");
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-12">
          {alertState.alertText.length > 0 && <Alert props={alertState} />}
        </div>

        <div className="col-md-12 mt-3">
          <label htmlFor="case" className="form-label">
            <h5>Enter the case name</h5>
          </label>
        </div>

        <div className="col-md-11">
          <input
            type="text"
            className="form-control"
            id="case"
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-outline-success">Create</button>
        </div>
      </form>
    </>
  );
};
