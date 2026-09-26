import axios from 'axios'

const apiHost = window.location.hostname || '127.0.0.1'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://${apiHost}:8000/api`,
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const fetchTeams = () => api.get('/teams/').then((response) => response.data)
export const fetchMatches = () => api.get('/matches/').then((response) => response.data)
export const fetchTournaments = () => api.get('/tournaments/').then((response) => response.data)
export const registerTeam = (payload) => api.post('/teams/register/', payload).then((response) => response.data)
export const dashboardLogin = (payload) => api.post('/dashboard/login/', payload).then((response) => response.data)
export const fetchAccountOverview = () => api.get('/account/overview/').then((response) => response.data)
export const dashboardLogout = () => api.post('/dashboard/logout/')
export const fetchDashboardOverview = () => api.get('/dashboard/overview/').then((response) => response.data)
export const updateDashboardMatch = (id, payload) => api.patch(`/dashboard/matches/${id}/`, payload).then((response) => response.data)
export const fetchDashboardTournaments = () => api.get('/dashboard/tournaments/').then((response) => response.data)
export const createDashboardTournament = (payload) => api.post('/dashboard/tournaments/', payload).then((response) => response.data)
export const deleteDashboardTournament = (id) => api.delete(`/dashboard/tournaments/${id}/`)
export const fetchDashboardTeams = () => api.get('/dashboard/teams/').then((response) => response.data)
export const createDashboardTeam = (payload) => api.post('/dashboard/teams/', payload).then((response) => response.data)
export const deleteDashboardTeam = (id) => api.delete(`/dashboard/teams/${id}/`)
export const fetchDashboardMatches = () => api.get('/dashboard/manage-matches/').then((response) => response.data)
export const createDashboardMatch = (payload) => api.post('/dashboard/manage-matches/', payload).then((response) => response.data)
export const deleteDashboardMatch = (id) => api.delete(`/dashboard/manage-matches/${id}/`)

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
