import Header from './pages/Header'
import WeatherResult from './pages/WeatherResult'
import RecentSearches from './pages/RecentSearches'

const App = () => {
  return (
    <>
    <Header />
    <main>
      <WeatherResult />
      <RecentSearches />
    </main>
    </>

  )
}

export default App
