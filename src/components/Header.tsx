import {Link} from 'react-router';

function Header() {
    return (
        <header>
            <nav>
                <Link to="/">About</Link>
                <Link to="/users">Users</Link>
            </nav>
        </header>
    )
}

export default Header;