import { useContext } from "react";
import Home from "../Pages/Home";
import SignIn from "../Pages/Login";
import Register from "../Pages/Register";
import "../style.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  console.log("current user", currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
