

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <img src={process.env.PUBLIC_URL + '/octofitapp-small.png'} alt="Octofit Logo" className="navbar-logo" />
          <div className="navbar-menu">
            <Link className="navbar-link" to="/">Octofit Tracker</Link>
            <Link className="navbar-link" to="/activities">Activities</Link>
            <Link className="navbar-link" to="/leaderboard">Leaderboard</Link>
            <Link className="navbar-link" to="/teams">Teams</Link>
            <Link className="navbar-link" to="/users">Users</Link>
            <Link className="navbar-link" to="/workouts">Workouts</Link>
          </div>
        </nav>
        <div className="container py-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<div className="mt-5"><h1 className="display-4">Welcome to Octofit Tracker!</h1></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
