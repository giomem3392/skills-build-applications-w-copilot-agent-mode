import ResourceTable from './ResourceTable.jsx'

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
  return <ResourceTable title="Activities" endpoint="/api/activities/" columns={columns} />
}
