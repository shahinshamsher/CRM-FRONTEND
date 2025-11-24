import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { me } = useContext(AuthContext);

  if (!me) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(me.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
