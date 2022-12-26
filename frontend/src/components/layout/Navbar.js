import { Link } from "react-router-dom"
import Logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'

function Navbar(){
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} className={styles.navbar_logo_img} alt="Get your Pet"></img>
                <h2>Get your Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adopt</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar