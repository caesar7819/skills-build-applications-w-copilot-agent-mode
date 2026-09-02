import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

export default function Leaderboard() {
  const [entries, setEntries] = useState([]); const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(leaderboardEndpoint, controller.signal).then(setEntries).catch((e) => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, [])
  return <section><div className="eyebrow">THIS WEEK</div><h1>Leaderboard</h1>{error ? <div className="alert alert-warning">{error}</div> : <div className="leaderboard">{entries.map((entry, index) => <div className="rank-row" key={entry._id}><b>{entry.rank || index + 1}</b><span>{entry.user?.name || entry.userName || 'Athlete'}</span><strong>{entry.points ?? entry.score ?? 0} pts</strong></div>)}</div>}</section>
}