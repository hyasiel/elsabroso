import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

import {Header} from "../ui/Header.tsx";
import {Footer} from "../ui/Footer.tsx";
import { useState} from "react";

{/*esto se debe realizar en el back, solo es una prueba*/}
let menuElements = [
    {id: 1, name: 'arrozmixto', url: 'src/menu/img/arrozmixto.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    {id: 2, name: 'hamburguesa', url: 'src/menu/img/hamburguesa.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    {id: 3, name: 'kekab', url: 'src/menu/img/kebab.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    {id: 4, name: 'tacos', url: 'src/menu/img/tacos2.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    {id: 5, name: 'tacos carne', url: 'src/menu/img/tacosdecarne.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    {id: 6, name: 'arrozmixto', url: 'src/menu/img/arrozmixto.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},

]




export function Menu () {

    

    return (
        <>
        <Header/>

        <section className="allmenu">
    
            <section className="menu">
        
                <h2>Mas Solicitados</h2>

                <div className="menu-cards">
                    {menuElements.map(e => (
                        <Cards key={e.id} imageUrl={e.url} name={e.name} info={e.info}/>
                    ))}
                </div>
            

            

            </section>

        

            <h2 className="others">Otros</h2>
            
            <br />

            <Carrousel/>

        </section>
        

        
            

        <Footer/>
        </>
    )
}




interface ICardProps {
    imageUrl: string
    name: string
    info: string
}

function Cards({imageUrl, name, info}: ICardProps){



    return (
        <>
        <div className="card">
            
            <div className="img-container">

                <img src={imageUrl} alt={name} loading="lazy" 
                onLoad={(e)=>{
                    e.currentTarget.classList.add("loaded");

                }} 
                
                onError={(e)=>{
                    e.currentTarget.classList.add("loaded");
                }}/>
            
            </div>
            <div className="infoContainer">
                <p className="text">{info}</p>
            </div>
            <button className="card-btn">Comprar</button>
                
        </div>
        </>
    )
}


function Carrousel() {

    const [activeIndex, setActiveIndex] = useState(0)
    const items = [
        {id: 0, name: 'arrozmixto', url: 'src/menu/img/arrozmixto.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
        {id: 1, name: 'hamburguesa', url: 'src/menu/img/hamburguesa.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
        {id: 2, name: 'kekab', url: 'src/menu/img/kebab.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
        {id: 3, name: 'tacos', url: 'src/menu/img/tacos2.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
        {id: 4, name: 'tacos carne', url: 'src/menu/img/tacosdecarne.jpg', info: 'Este plato esta compuesto por tales alimentos, y es bueno para algo en especifico'},
    ]

    console.log("Active index = " + activeIndex);
    return (
        <>
        <section className='carrousel'>
            <div className='all'>
           
            <IconChevronLeft stroke={1} className='leftarrow' onClick={()=>
                setActiveIndex((prev)=>
                    prev > 0 ? prev - 1 : prev
                )
            }/>
           
            <div className="c-all">
                <div className="c-box" style={{
                    transform: `translateX(-${activeIndex * 80}%)`
                }}>

                   {items.map((item, index) => (
                           
                        <div
                             key={index}
                            className={`c-item ${index === activeIndex ? "active" : ""}`}
                        >
                            
                        <div className="img-container img-container-carrousel">

                            <img className="imgcarrousel" src={item.url} alt={item.name} loading="lazy" 
                               
                                onLoad={(e)=>{
                                e.currentTarget.classList.add("loaded");

                            }} 
                
                            onError={(e)=>{
                                e.currentTarget.classList.add("loaded");
                            }}/>
            
                        </div>

                            <button className="card-btn card-btn-carrousel">Comprar</button>
                        
                        </div>
                    ))}
 
                    
                </div>
                <div className="marks">

                    {items.map((_, index)=>(
                        <div 
                            key={index} 
                            className={`mark ${activeIndex === index ? "active" : ""}`} 
                            onClick={()=>setActiveIndex(index)}/>
                    ))}
                     
                        
                </div>
                
            </div>
                <IconChevronRight stroke={1} className='rightarrow' onClick={()=>
                    setActiveIndex((prev)=>
                        prev < items.length - 1 ? prev + 1 : prev
                    )
                }/>
            </div>
        </section>
        
        </>
    )
}

