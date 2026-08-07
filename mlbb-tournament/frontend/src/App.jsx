import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Teams from './components/Teams'
import TournamentInfo from './components/TournamentInfo'
import MatchSchedule from './components/MatchSchedule'
import TeamRegistration from './components/TeamRegistration'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Teams />
      <TournamentInfo />
      <MatchSchedule />
      <NewsSection />
      <TeamRegistration />
      <Footer />
    </main>
  )
}

export default App
