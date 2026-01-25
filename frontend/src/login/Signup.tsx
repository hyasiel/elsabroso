import { Header } from "../ui/Header.tsx";
import { Footer } from "../ui/Footer.tsx";

export function Signup() {
  return (
    <>
      <Header />

      <section className="login-all">
        <div className="login-box">
          <div className="login-fields">
            <h3 className="login-text_field">Por favor crea tu usuario</h3>

            <input
              type="email"
              className="login-input_gmail"
              required
              placeholder="gmail"
            />

            <input
              type="text"
              className="login-input_number"
              required
              placeholder="cell phone"
            />

            <input
              type="password"
              className="login-input_password"
              required
              placeholder="password"
            />
          </div>

          <div className="login-buttons">
            <button className="login-button_send create">Crear</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
