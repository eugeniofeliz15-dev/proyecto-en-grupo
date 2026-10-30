import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// TODO [A]: si ya hay sesion y entra a /login, mandarlo a /dashboard
export function RutaPublica() {
  const { autenticado } = useAuthStore();
  if (autenticado) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
