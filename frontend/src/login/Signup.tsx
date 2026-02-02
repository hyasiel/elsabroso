import { Header } from "../ui/Header.tsx";
import { Footer } from "../ui/Footer.tsx";

import { useState } from "react";

export function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Header />

      <section className="login-all">
        <div className="login-box">
          <div className="login-fields">
            <h3 className="login-text_field">Por favor crea tu usuario</h3>

            <input
              type="text"
              className="login-input_name"
              required
              placeholder="type your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

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
              className="login-button_send create"
              onClick={() => {
                sendDataUser(name, email, password);
                clearForm();
              }}
            >
              Crear
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function sendDataUser(name: string, email: string, password: string) {
  console.log("Sending data...", name, email, password);

  fetch("http://localhost:3000/auth/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
}
