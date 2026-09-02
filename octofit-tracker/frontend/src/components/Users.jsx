import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
	? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
	: '/api/users/'

export default function Users() { const [users, setUsers] = useState([]); const [error, setError] = useState(''); useEffect(() => { const controller = new AbortController(); fetchCollection(usersEndpoint, controller.signal).then(setUsers).catch((e) => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, []); return <section><div className="eyebrow">MEMBERS</div><h1>Users</h1>{error ? <div className="alert alert-warning">{error}</div> : <div className="list">{users.map((user) => <article className="list-item" key={user._id}><strong>{user.name}</strong><span>{user.email}</span></article>)}</div>}</section> }