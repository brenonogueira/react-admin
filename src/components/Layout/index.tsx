import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../services/api'
import Menu from '../Menu'
import Nav from '../Nav'
import { User } from '../../models/user'

export default function Layout({ children }: any) {
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        ( //how to create a async function inside the hook useEffect
            async () => {
                try {
                    const response = await api.get('api/admin/user');
                    setUser(response.data)
                    console.log(response.data)
                } catch (e) {
                    setRedirect(true)
                }
            }
        )();
    }, [])

    if(redirect) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <div className="App">
                <Nav user={user} />
                <div className="container-fluid">
                    <div className="row">
                        <Menu />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Dashboard</h1>
                            </div>

                            <h2>Section title</h2>
                            <div className="table-responsive">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
