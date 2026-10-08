import { NavLink, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row gap-3">
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<h1 className="h3">Dashboard</h1>} />
          <Route path="/activities" element={<h1 className="h3">Activities</h1>} />
          <Route path="/teams" element={<h1 className="h3">Teams</h1>} />
          <Route path="*" element={<h1 className="h3">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
