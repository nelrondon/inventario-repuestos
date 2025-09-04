import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Loading } from "./componentes/Loading";
import { Header } from "./componentes/Header";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};
