import {MainWeb} from "./home/MainWeb"
import {Menu} from "./menu/Menu";
import {Login} from './login/Login'
import {Nosotros} from './nosotros/Nosotros'
import './index.css'
import './nosotros/nosotros.css'
import './menu/menu.css'
import './login/log.css'
import {Routes, Route } from "react-router-dom"
import {Signup} from "./login/Signup"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<MainWeb />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App