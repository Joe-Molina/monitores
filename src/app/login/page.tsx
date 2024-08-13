'use client'

import React, { useEffect, useState } from 'react'
import { logout, session } from '../getSession'

function page() {
    const [login, setLogin] = useState({})

    useEffect(() => {
        console.log(login)
    }, [login])

    return (
        <div>
            <form className='flex-col' onSubmit={(e) => {
                e.preventDefault()
                session(login)
            }}>
                <input type="text" placeholder='email' required onChange={(e) => {
                    setLogin({ email: e.target.value })
                }} />

                <input type="text" placeholder='password' required onChange={(e) => {
                    setLogin({ password: e.target.value })
                }} />

                <button>
                    <input type="submit" value="enviar" />
                </button>
            </form>
            <button onClick={logout}>cerrar session</button>

        </div>
    )
}

export default page