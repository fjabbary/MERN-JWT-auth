import React, { useState } from 'react'
import Form from '../components/Form'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import loader from '../loader.gif'


function Login() {
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3001/auth/login', { username, password })
            const { token, userId } = response.data

            localStorage.setItem("userId", userId)
            setLoading(true)
            setTimeout(() => {
                setCookies("access_token", token)
                navigate("/")
            }, 1000);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="login">
                <h1>Login</h1>
                <Form
                    username={username}
                    password={password}
                    btnLabel="Login"
                    setUsername={setUsername}
                    setPassword={setPassword}
                    onSubmit={onSubmit} />
            </div>
            {loading && <div><img className="loader" src={loader} alt="loader" /></div>}
        </div>
    )
}

export default Login