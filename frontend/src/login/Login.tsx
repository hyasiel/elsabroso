import {Header} from "../ui/Header.tsx";
import {Footer} from "../ui/Footer.tsx";


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
                    <button className="login-button_send">
                        Ingresar
                    </button>
                    <a href="http://#" className="login-button_create">Crear cuenta</a>
                </div>
                
            </div>
        </section>
        <Footer/>
        </>
    )
}