import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import loader from '../loader.gif'


function Navbar() {

    const navigate = useNavigate();

    const [cookies, setCookies] = useCookies(["access_token"])
    const [loading, setLoading] = useState(false)
    // console.log(cookies)

    const logout = () => {
        localStorage.removeItem("userId")

        setLoading(true)
        setTimeout(() => {
            setCookies("access_token", "")
            setLoading(false)
            navigate("/login")
        }, 1000)
    }

    return (
        <div className="navbar">
            <nav>
                <div className="logo">

                    {cookies.access_token ? <Link to="/">Recipe App</Link> : <p>Recipe App</p>}
                </div>
                <ul>
                    {cookies.access_token && <li>
                        <Link to="/create-recipe">Create Recipe</Link>
                    </li>}
                    {!cookies.access_token ?
                        <><li>
                            <Link to="/login">Login</Link>
                        </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li></> :
                        <li>
                            <Link onClick={logout}>Logout</Link>
                        </li>}
                </ul>
            </nav>
            {loading && <div className="img-container"><img className="logout-loader" src={loader} alt="loader" /></div>}
        </div>
    )
}

export default Navbar