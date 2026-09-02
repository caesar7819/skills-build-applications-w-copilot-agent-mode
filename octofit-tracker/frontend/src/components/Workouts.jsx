import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
	? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
	: '/api/workouts/'

export default function Workouts() { const [workouts, setWorkouts] = useState([]); const [error, setError] = useState(''); useEffect(() => { const controller = new AbortController(); fetchCollection(workoutsEndpoint, controller.signal).then(setWorkouts).catch((e) => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, []); return <section><div className="eyebrow">TRAINING LIBRARY</div><h1>Workouts</h1>{error ? <div className="alert alert-warning">{error}</div> : <div className="list">{workouts.map((workout) => <article className="list-item" key={workout._id}><strong>{workout.title}</strong><span>{workout.category || workout.type || 'Workout'} {workout.duration ? `· ${workout.duration} min` : ''}</span></article>)}</div>}</section> }