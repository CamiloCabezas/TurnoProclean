import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./routes/login/login"
import Menu from "./routes/menu/menu"
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
