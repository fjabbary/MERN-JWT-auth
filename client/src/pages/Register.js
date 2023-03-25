import React, { useState } from 'react'
import Form from '../components/Form';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loader from '../loader.gif'

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await Axios.post('http://localhost:3001/auth/register', { username, password })

        if (response.data.message === 'ok') {
            setUsername("")
            setPassword("")
            setShowLoader(true)
            setTimeout(() => navigate("/login"), 4000)
        } else {
            alert("username already exists")
        }
    }

    return (
        <div className="container">
            <div className="register">
                <h1>Register New User</h1>
                <Form
                    username={username}
                    password={password}
                    btnLabel="Register"
                    setUsername={setUsername}
                    setPassword={setPassword}
                    onSubmit={onSubmit} />
            </div>
            <div>
                {showLoader && <img className="loader" src={loader} alt="loader" />}
            </div>
        </div>

    )
}

export default Register