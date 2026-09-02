import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection('activities', controller.signal).then(setActivities).catch((e) => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, [])
  return <Collection title="Recent activities" error={error}>
    {activities.map((activity) => <article className="list-item" key={activity._id}><strong>{activity.user?.name || 'Athlete'}</strong><span>{activity.type || activity.activityType || 'Activity'} · {activity.duration ? `${activity.duration} min` : 'Logged'}</span></article>)}
  </Collection>
}

function Collection({ title, error, children }) { return <section><div className="eyebrow">OCTOFIT TRACKER</div><h1>{title}</h1>{error ? <div className="alert alert-warning">{error}</div> : children || <p className="empty">No records yet.</p>}</section> }