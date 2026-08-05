import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TournamentInfo from './components/TournamentInfo'
import Teams from './components/Teams'
import MatchSchedule from './components/MatchSchedule'
import TournamentBracket from './components/TournamentBracket'
import TeamRegistration from './components/TeamRegistration'

function App() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <TournamentInfo />
      <Teams />
      <MatchSchedule />
      <TournamentBracket />
      <TeamRegistration />
    </main>
  )
}

export default App
