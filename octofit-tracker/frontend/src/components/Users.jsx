import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
]

export default function Users() {
  return <ResourceTable title="Users" endpoint="/api/users/" columns={columns} />
}
