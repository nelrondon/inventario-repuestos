import { StrictMode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { AddRepuestosPage } from "./pages/AddRepuestosPage";
import { RepuestosPorModelo } from "./pages/RepuestosXModel";
import { RepuestosPorFabricante } from "./pages/RepuestosXFab";
import { PartsProvider } from "./context/PartsProvider";
import { FullRegisterPage } from "./pages/FullRegisterPage";
import { ModifyPartPage } from "./pages/ModifyPartPage";

function App() {
  return (
    <StrictMode>
      <PartsProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} exact />

            <Route path="/info/model" element={<RepuestosPorModelo />}>
              <Route path=":model" element={<RepuestosPorModelo />} />
            </Route>

            <Route path="/info/fab" element={<RepuestosPorFabricante />}>
              <Route path=":fabricante" element={<RepuestosPorFabricante />} />
            </Route>

            <Route path="/modify/:id" element={<ModifyPartPage />} />

            <Route
              path="/añadir-repuesto"
              element={<AddRepuestosPage />}
              exact
            />

            <Route path="/stock" element={<FullRegisterPage />} exact />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PartsProvider>
    </StrictMode>
  );
}

export default App;
