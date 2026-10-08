import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadWorkouts = ({ signal }) => fetch('/api/workouts/', { signal })

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'description', label: 'Description' },
]

export default function Workouts() {
  return <ResourceTable title="Workouts" load={loadWorkouts} columns={columns} />
}
