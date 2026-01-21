import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../services/contextApi/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
