const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(resource, signal) {
  const endpoint = resource.startsWith('http') || resource.startsWith('/')
    ? resource
    : `${apiBaseUrl}/${resource}/`
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return collectionFromResponse(await response.json())
}