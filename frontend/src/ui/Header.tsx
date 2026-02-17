import { Link, useLocation } from "react-router-dom";

import { getToken } from "../utils/TokenHandle";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

export function Header() {
  const [role, setRole] = useLocalStorage("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:3000/auth/verifytoken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role == "admin") {
          setRole("admin");
        } else {
          console.log("Token is invalid, clearing storage");
          localStorage.removeItem("token");
          setRole("");
        }
      });
  }, []);

  let location = useLocation();
  const isDark = location.pathname !== "/";

  return (
    <header id="header">
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/">
            <img src="/src/images/logo/elsabroso.png" alt="" />
          </Link>
        </div>

        <ul className="nav-links">
          {/*validamos que tipo de usuario somos, si somos admin mostramos apartadp*/}

          {role == "admin" && (
            <li
              className={` nav-item__e ${isDark ? "darklinks" : ""} ${location.pathname === "/admin" ? "isActive" : ""}`}
            >
              <Link to="/admin">Admin</Link>
            </li>
          )}

          {/*rutas globales*/}
          <li
            className={` nav-item__e ${isDark ? "darklinks" : ""} ${location.pathname === "/menu" ? "isActive" : ""}`}
          >
            <Link to="/menu">Menu</Link>
          </li>
          <li
            className={` nav-item__e ${isDark ? "darklinks" : ""} ${location.pathname === "/nosotros" ? "isActive" : ""}`}
          >
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li className={` nav-item__log ${isDark ? "darklinks" : ""}`}>
            <Link to="/login">Entrar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
