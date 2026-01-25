import {Header} from "../ui/Header.tsx";
import {Footer} from "../ui/Footer.tsx";
import {Link} from "react-router-dom";


export function Login () {
    return (
        <>
        <Header/>

        <section className="login-all">
            <div className="login-box">
                <div className="login-fields">

                    <h3 className="login-text_field">Por favor inicia sesion</h3>

                    <input type="email" className="login-input_gmail" required placeholder="gmail"/>
                    <input type="password" className="login-input_password" required placeholder="password
                    "/>
                </div>

                <div className="login-buttons">
                    <button className="login-button_send signup">
                        Ingresar
                    </button>
                    <Link to="/signup" className="login-button_create">Crear cuenta</Link>
                </div>
                
            </div>
        </section>
        <Footer/>
        </>
    )
}