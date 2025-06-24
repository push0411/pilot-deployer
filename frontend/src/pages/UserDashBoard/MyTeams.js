import React, { useEffect, useState } from 'react';
import './MyTeams.css';
import TopBarWithLogo from './TopBarWithLogo';
import NoDataFound from '../../components/NoDataFound'; // adjust path based on structure

function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get-my-teams/${token}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <TopBarWithLogo title='My Teams' />
      <div className="my-teams-container">
        <h2>My Teams</h2>
        {loading ? (
          <p>Loading teams...</p>
        ) : (
          <div className="teams-table-wrapper">
            {teams.length === 0 ? (
              <NoDataFound message="You are not part of any team yet." />
            ) : (
              <table className="teams-table">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Team ID</th>
                    <th>Members</th>
                    <th>Project Count</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id}>
                      <td>{team.teamName}</td>
                      <td>{team.teamID}</td>
                      <td>
                        <ul>
                          {team.members.map((member) => (
                            <li key={member._id}>
                              {member.userID} - {member.role}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{team.projects.length}</td>
                      <td>{new Date(team.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTeams;
