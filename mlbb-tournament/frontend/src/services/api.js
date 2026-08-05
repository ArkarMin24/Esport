import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export const fetchTeams = () => api.get('/teams/').then((response) => response.data)
export const fetchMatches = () => api.get('/matches/').then((response) => response.data)
export const fetchTournaments = () => api.get('/tournaments/').then((response) => response.data)
export const registerTeam = (payload) => api.post('/teams/register/', payload).then((response) => response.data)

export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error.response?.data
  if (typeof data?.detail === 'string') return data.detail
  if (data && typeof data === 'object') {
    const [field, messages] = Object.entries(data)[0] || []
    if (messages) return `${field}: ${Array.isArray(messages) ? messages[0] : messages}`
  }
  return error.code === 'ECONNABORTED' ? 'The request timed out. Please try again.' : fallback
}

export default api
