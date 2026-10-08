import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadUsers = ({ signal }) => fetch('/api/users/', { signal })

const columns = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
]

export default function Users() {
  return <ResourceTable title="Users" load={loadUsers} columns={columns} />
}
