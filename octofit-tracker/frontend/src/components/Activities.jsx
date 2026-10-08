import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadActivities = ({ signal }) => fetch('/api/activities/', { signal })

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'user', label: 'User' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  {
    key: 'date',
    label: 'Date',
    render: ({ date }) => date ? new Date(date).toLocaleDateString() : '—',
  },
]

export default function Activities() {
  return <ResourceTable title="Activities" load={loadActivities} columns={columns} />
}
