import {useState} from "react";
import {NavLink} from 'react-router';
import {useIsMobile} from '@/hooks/useIsMobile'

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile] = useIsMobile();

    const handleToggle = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">UsersApp</h1>

                <nav
                    id="main-navigation"
                    className={`nav ${isMobile && isOpen ? "is-open" : ""}`}>
                    <ul className="nav-list">
                        <li>
                            <NavLink to="/about" className="nav-item" onClick={closeMenu}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users" className="nav-item" onClick={closeMenu}>Users</NavLink>
                        </li>
                    </ul>
                </nav>

                <button
                    className="burger"
                    onClick={handleToggle}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    aria-controls="main-navigation"
                >
                    <span className="burger-line"/>
                    <span className="burger-line"/>
                    <span className="burger-line"/>
                </button>
            </div>
        </header>
    )
}

export default Header;