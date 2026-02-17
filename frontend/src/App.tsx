import { MainWeb } from "./home/MainWeb";
import { Menu } from "./menu/Menu";
import { Login } from "./login/Login";
import { Nosotros } from "./nosotros/Nosotros";
import { Signup } from "./login/Signup";
import { Admin } from "./admin/Admin";
import { useLocalStorage } from "react-use";
import { ProtectedRoute } from "./utils/ProtectedRoute";

import "./index.css";
import "./nosotros/nosotros.css";
import "./menu/menu.css";
import "./login/log.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useLocalStorage("role");

  let isAdmin = token === "admin" ? true : false;

  return (
    <Routes>
      <Route path="/" element={<MainWeb />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute admin={!isAdmin ? false : true} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
