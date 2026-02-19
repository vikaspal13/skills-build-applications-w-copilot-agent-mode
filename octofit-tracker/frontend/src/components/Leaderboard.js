import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        setLoading(false);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      });
  }, [endpoint]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading Leaderboard...</span>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaders.length === 0 ? (
            <div className="alert alert-info">No leaderboard data found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    {Object.keys(leaders[0]).map((key) => (
                      <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      {Object.values(leader).map((val, i) => (
                        <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
