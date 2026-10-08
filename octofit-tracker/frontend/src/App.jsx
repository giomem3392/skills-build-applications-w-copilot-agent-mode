import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar bg-white border-bottom">
        <div className="container flex-wrap">
          <NavLink className="navbar-brand fw-semibold" to="/" end>
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-3">
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <h1 className="h3">OctoFit Tracker</h1>
                <p className="text-body-secondary">
                  Track activity, connect with a team, and keep your fitness goals moving.
                </p>
              </>
            )}
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<h1 className="h3">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
