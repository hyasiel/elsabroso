import { Link, useLocation } from "react-router-dom";

export function Header() {
  
    let location = useLocation()
    const isDark = location.pathname !== "/"

    return (
    

    <header id="header">
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/">
            <img src="/src/images/logo/elsabroso.png" alt="" />
          </Link>
        </div>

        <ul className='nav-links' >
          <li className={` nav-item__e ${(isDark) ? "darklinks" : ""} ${(location.pathname === "/menu") ? "isActive" : ""}`}><Link to="/menu">Menu</Link></li>
          <li className={` nav-item__e ${(isDark) ? "darklinks" : ""} ${(location.pathname === "/nosotros") ? "isActive" : ""}`}><Link to="/nosotros">Nosotros</Link></li>
          <li className={` nav-item__log ${(isDark) ? "darklinks" : ""}`}><Link to="/login">Entrar</Link></li>
        </ul>
      </nav>
    </header>
  );
}
