import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '')

const api = axios.create({ baseURL: apiBaseUrl })

export async function fetchBatches({
  page = 1,
  limit = 5,
  search = '',
  status = '',
  centre = '',
} = {}) {
  const response = await api.get('/api/batches', {
    params: { page, limit, search, status, centre },
  })
  return response.data
}
