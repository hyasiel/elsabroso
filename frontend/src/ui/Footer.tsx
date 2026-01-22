import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <div className="footer-info">
                <ul className="footer-links">
                    <li className="footer-item"><Link to="/menu">Menu</Link></li>
                    <li className="footer-item"><Link to="/nosotros">Quienes somos</Link></li>
                    <li className="footer-item"><Link to="/login">Inicia sesión o regístrate</Link></li>
                </ul>
            </div>
            <div className="footer-social">
                <a href="#"><IconBrandFacebook stroke={2} className='icon face'></IconBrandFacebook></a>
                <a href="#"><IconBrandInstagram stroke={2} className='icon insta'></IconBrandInstagram></a>
                <a href="#"><IconBrandX stroke={2} className='icon xicon'></IconBrandX></a>
            </div>
        </footer>
    )
}