const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(path, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (typeof body.error === 'string') message = body.error
    } catch {
      // The response may not contain a JSON error body.
    }
    throw new Error(message)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload

  for (const key of ['results', 'items', 'data']) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }

  throw new Error('The API response did not contain a list of records')
}
