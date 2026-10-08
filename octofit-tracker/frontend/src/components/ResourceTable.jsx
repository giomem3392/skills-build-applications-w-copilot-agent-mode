import { useEffect, useState } from 'react'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '-'
  if (Array.isArray(value)) return value.length ? value.map(formatValue).join(', ') : '-'
  if (typeof value === 'object') {
    const label = value.displayName ?? value.name ?? value.username ?? value.title ?? value.email ?? value._id ?? value.id
    return label === undefined ? JSON.stringify(value) : formatValue(label)
  }
  return String(value)
}

export default function ResourceTable({ title, load, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')
      try {
        setRecords(await load({ signal: controller.signal }))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load records')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [load])

  return (
    <section>
      <h1 className="h3 mb-3">{title}</h1>
      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && records.length === 0 && (
        <p className="text-body-secondary">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                {columns.map(({ key, label }) => <th scope="col" key={key}>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map(({ key, render }) => (
                    <td key={key}>{formatValue(render ? render(record) : record[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
