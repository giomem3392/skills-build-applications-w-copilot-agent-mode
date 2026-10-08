import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'description', label: 'Description' },
]

export default function Workouts() {
  return <ResourceTable title="Workouts" endpoint="/api/workouts/" columns={columns} />
}
