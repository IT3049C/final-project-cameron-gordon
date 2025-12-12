import { Navigate,useLocation  } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export function ProtectedRoute({ children, settings }) {
  const local = settings || loadSettings();
  const location = useLocation();

    if (!local?.name) {
    // redirect to /lobby, but include redirect param
    return <Navigate to={`/lobby?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  console.log("✅ Access granted:", local);
  return children;
}
