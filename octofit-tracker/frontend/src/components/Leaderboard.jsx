import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'score', label: 'Score' },
]

export default function Leaderboard() {
  return <ResourceTable title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}
