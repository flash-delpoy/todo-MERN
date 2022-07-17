import { useDispatch } from "react-redux";
import { hideAlert } from "../../redux/actions";
import { IAlertState } from "../../types/types";
import "./style.css";

interface IAlertProps {
  props: IAlertState;
}

export const Alert = ({ props }: IAlertProps) => {
  const dispatch = useDispatch();

  const handleAlertClose = () => dispatch(hideAlert());

  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
      <button className="btn btn-close alert-btn" onClick={handleAlertClose} />
    </div>
  );
};
