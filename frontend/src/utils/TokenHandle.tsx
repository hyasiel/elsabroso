import { useEffect } from "react";

//this function is for verify the authenticate token
export function getToken() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const API_URL = import.meta.env.VITE_API_URL || "";

    fetch(`${API_URL}/auth/verifytoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //si el token es invalido lo eliminamos
        if (!data.user) {
          console.log("Token is invalid, clearing storage");
          localStorage.removeItem("token");
        }
      });
  }, []);
}
