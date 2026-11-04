import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000' })

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
