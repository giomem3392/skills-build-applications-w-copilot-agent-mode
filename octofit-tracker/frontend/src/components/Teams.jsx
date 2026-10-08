import ResourceTable from './ResourceTable.jsx'

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
  return <ResourceTable title="Teams" endpoint="/api/teams/" columns={columns} />
}
