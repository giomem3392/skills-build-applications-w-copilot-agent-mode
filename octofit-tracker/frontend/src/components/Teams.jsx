import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadTeams = ({ signal }) => fetch('/api/teams/', { signal })

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'Description' },
  {
    key: 'members',
    label: 'Members',
    render: ({ members }) => Array.isArray(members) ? members.length : members,
  },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <ResourceTable title="Teams" load={loadTeams} columns={columns} />
}
