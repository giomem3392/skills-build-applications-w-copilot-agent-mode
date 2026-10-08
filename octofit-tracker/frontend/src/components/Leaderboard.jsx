import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadLeaderboard = ({ signal }) => fetch('/api/leaderboard/', { signal })

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'score', label: 'Score' },
]

export default function Leaderboard() {
  return <ResourceTable title="Leaderboard" load={loadLeaderboard} columns={columns} />
}
