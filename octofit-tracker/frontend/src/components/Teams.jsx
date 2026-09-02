import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Teams() { return <Resource resource="teams" title="Teams" render={(team) => <><strong>{team.name}</strong><span>{team.members?.length ?? 0} members</span></>} /> }

function Resource({ resource, title, render }) { const [items, setItems] = useState([]); const [error, setError] = useState(''); useEffect(() => { const controller = new AbortController(); fetchCollection(resource, controller.signal).then(setItems).catch((e) => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, [resource]); return <section><div className="eyebrow">COMMUNITY</div><h1>{title}</h1>{error ? <div className="alert alert-warning">{error}</div> : <div className="list">{items.map((item) => <article className="list-item" key={item._id}>{render(item)}</article>)}</div>}</section> }