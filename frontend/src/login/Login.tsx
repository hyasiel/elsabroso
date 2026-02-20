import { Header } from "../ui/Header.tsx";
import { Footer } from "../ui/Footer.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Header />

      <section className="login-all">
        <div className="login-box">
          <div className="login-fields">
            <h3 className="login-text_field">Por favor inicia sesion</h3>

            <input
              type="email"
              className="login-input_gmail"
              required
              placeholder="gmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="login-input_password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="login-buttons">
            <button
              className="login-button_send signup"
              onClick={() => {
                sendDataUser(email, password, navigate);
                clearForm();
              }}
            >
              Ingresar
            </button>
            <Link to="/signup" className="login-button_create">
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function sendDataUser(
  email: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>,
) {
  try {
    console.log("Sending login data:", { email, password });

    const API_URL = import.meta.env.VITE_API_URL || "";
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("the data is ", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Login successful, token stored.");
          navigate("/"); // Redirect to home page after successful login
        } else {
          console.error("Login failed:", data.message);
        }
      });
  } catch (error) {
    console.error("Error in the login");
  }
}
