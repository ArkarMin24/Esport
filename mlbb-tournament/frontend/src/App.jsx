import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Teams from './components/Teams'
import TournamentInfo from './components/TournamentInfo'
import MatchSchedule from './components/MatchSchedule'
import TournamentBracket from './components/TournamentBracket'
import TeamRegistration from './components/TeamRegistration'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Login from './pages/Login'

function App() {
  if (window.location.pathname.startsWith('/dashboard')) return <Dashboard />
  if (window.location.pathname.startsWith('/account')) return <Account />
  if (window.location.pathname.startsWith('/login')) return <Login />

  return (
    <main className="site-shell min-h-screen">
      <Navbar />
      <Hero />
      <Teams />
      <TournamentInfo />
      <MatchSchedule />
      <TournamentBracket />
      <TeamRegistration />
      <Footer />
    </main>
  )
}

export default App
