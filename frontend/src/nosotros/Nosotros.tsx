import {Header} from "../ui/Header.tsx";
import {Footer} from "../ui/Footer.tsx";


export function Nosotros () {
    return (
        <>
        <Header />
        <section className="we">
            
            <div className="we-text">
                <h1>UN PLATO</h1>
                <h1>UNA EXPERIENCIA</h1>
                <h2 className="info-text">En nuestro restaurante creemos que cada comida es una experiencia para compartir. Nacimos del amor por la buena cocina, combinando recetas inspiradas en la tradición con un toque creativo que despierta los sentidos. Seleccionamos ingredientes frescos y de calidad, cuidando cada detalle para ofrecer platos llenos de sabor en un ambiente cálido y acogedor. Más que un lugar para comer, somos un espacio donde las historias se encuentran alrededor de la mesa y cada visita se convierte en un momento especial.</h2>
            </div>
        
            <img className="we-photo" src="src/nosotros/images/bg3.jpg" alt="" />
           
        </section>
        <Footer/>
        </>
    )
}