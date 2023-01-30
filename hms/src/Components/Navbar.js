import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import HeaderImg from '../Images/header_logo.png';
import { UserContext } from '../App'
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    return (
        <>
            {
                state ? (
                    <header>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <div className="imgHeading">
                                    <img src={HeaderImg} alt="logo" />
                                    <h1>The Healing Hospital</h1>
                                </div>
                            </Link>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                                <li><Link to='/about'>About Us</Link></li>
                                <li><Link to='/logout'>Logout</Link></li>
                            </ul>
                        </nav>
                    </header>)
                    :
                    (<header>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <div className="imgHeading">
                                    <img src={HeaderImg} alt="logo" />
                                    <h1>The Healing Hospital</h1>
                                </div>
                            </Link>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                                <li><Link to='/about'>About Us</Link></li>
                            </ul>
                        </nav>
                    </header>)
            }
        </>
    )
}

export default Navbar