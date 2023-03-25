import React from 'react'

function Form({ username, password, btnLabel, setUsername, setPassword, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label><br />
                <input type="text" id="username" placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
            </div>

            <button type="submit" className="btn-submit">{btnLabel}</button>
        </form>
    )
}

export default Form