import React, { useState, useEffect } from 'react';
import './CreateTeam.css';
import Topbar from '../Topbar';
import TopBarWithLogo from '../TopBarWithLogo';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function generateTEMCode() {
  const randomNumber = Math.floor(1000 + Math.random() * 900);
  return "TEM" + randomNumber;
}

async function getUserData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamID] = useState(generateTEMCode());
  const [search, setSearch] = useState('');
  const [allMembers, setAllMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [userName, setUserName] = useState('');
  const [uID, setUID] = useState('');
  const [leadBatch, setLeadBatch] = useState(null);
  const [leadPassingYear, setLeadPassingYear] = useState(null);
  const [crossBatch, setCrossBatch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      if (data) {
        setUID(data.ID);
        setUserName(data.name);
        setLeadBatch(data.batch);
        setLeadPassingYear(data.passingYear);

        setTeamMembers([{
          userID: data.ID,
          firstName: data.name.split(' ')[0] || data.name,
          lastName: data.name.split(' ')[1] || '',
          role: 'Lead'
        }]);
      }
    }

    async function fetchStudentUsers() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/get-all-users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const result = await response.json();
        console.log(result);
        const studentsList = result.success
          ? result.data.filter(user => user.accountType === 'Student')
          : [];

        setAllMembers(studentsList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
    fetchStudentUsers();
  }, []);

  const handleAddMember = (member) => {
    if (member.userID === uID) return;
    if (!teamMembers.find(m => m.userID === member.userID)) {
      setTeamMembers([...teamMembers, { ...member, role: 'Member' }]);
    }
  };

  const handleRemoveMember = (userID) => {
    if (userID === uID) return;
    setTeamMembers(prev => prev.filter(member => member.userID !== userID));
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      alert("Team name is required.");
      return;
    }

    const token = localStorage.getItem('token');
    const data = {
      teamName,
      teamID,
      members: teamMembers.map(member => ({
        userID: member.userID,
        role: member.role
      }))
    };

    try {
      const response = await fetch(`${BASE_URL}/create-team`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert('Team created successfully!');
      } else {
        alert(`Failed to create team: ${result.message}`);
      }
    } catch (error) {
      alert('Something went wrong while creating the team.');
      console.error('Error creating team:', error);
    }
  };

  const filteredMembers = allMembers.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const isAlreadyMember = teamMembers.some(member => member.userID === user.userID);
    const isCurrentUser = user.userID === uID;

    const validBatch = crossBatch
      ? user.passingYear === leadPassingYear
      : user.passingYear === leadPassingYear && user.batch === leadBatch;

    return !isCurrentUser && !isAlreadyMember && fullName.includes(search.toLowerCase()) && validBatch;
  });

  return (
    <div>
      <TopBarWithLogo title='Team Creator Wizard'/>
      <div className='mstt'>
        <div className="team-creation-container">
          <div className="input-group">
            <label>Team Name:</label>
            <input value={teamName} onChange={e => setTeamName(e.target.value)} />
            <label>Team ID:</label>
            <input value={teamID} readOnly />
            <label>Allow Cross-Batch Selection:</label>
            <input
              type="checkbox"
              checked={crossBatch}
              onChange={() => setCrossBatch(!crossBatch)}
            />
          </div>

          <div className="tables-wrapper1">
            <div className="search-table1">
              <h3>Search Students</h3>
              <input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(user => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>EN{user.batch}</td>
                      <td>
                        <button className="action-button" onClick={() => handleAddMember(user)}>+</button>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr><td colSpan="4">No matching users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="members-table">
              <h3>Team Members</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.userID}>
                      <td>{member.userID}</td>
                      <td>{member.firstName} {member.lastName}</td>
                      <td>{member.role}</td>
                      <td>
                        {member.userID !== uID && (
                          <button className="action-button remove" onClick={() => handleRemoveMember(member.userID)}>×</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="create-team-btn" onClick={handleCreateTeam}>
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
