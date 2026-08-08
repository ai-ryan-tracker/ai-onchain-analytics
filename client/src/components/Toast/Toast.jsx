import "./Toast.css";
import { FiCheck, FiX, FiAlert } from "react-icons/fi";

const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  const icons = {
    success: <FiCheck size={18} />,
    error: <FiX size={18} />,
    info: <FiAlert size={18} />,
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
