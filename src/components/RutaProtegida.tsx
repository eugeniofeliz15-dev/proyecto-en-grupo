import { Navigate, Outlet } from "react-router-dom";
import { useAuthHidratado } from "../hooks/useAuthHidratado";
import { useAuthStore } from "../store/useAuthStore";
import { Skeleton } from "./ui/Skeleton";

// TODO [A]: ahora deja pasar a cualquiera
// - esperar a que el store se rehidrate (useAuthHidratado)
// - sin sesion: <Navigate to="/login" replace />
// - con sesion: <Outlet />
export function RutaProtegida() {
  const { autenticado } = useAuthStore();
  const hidratado = useAuthHidratado();
  if (!hidratado) {
    return <Skeleton className="h-4 w-32" />;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
