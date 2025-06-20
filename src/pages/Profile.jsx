import React, { useEffect, useState } from 'react';
import { getTokenWithExpiry } from '../utils/set-token';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [findingAWork, setFindingAWork] = useState(false);
  const [skills, setSkills] = useState([]);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [editedSkills, setEditedSkills] = useState([]);
  const [editedFindingWork, setEditedFindingWork] = useState(false);

  const token = getTokenWithExpiry();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(`fetching data...`)
        const res = await fetch(`${API_BASE}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        console.log(`res.status: ${res.status} token: ${token}`)

        if (!res.ok) {
          console.log(`data fetched!`)
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const userData = await res.json();
        console.log("User data:", userData);

        setUsername(userData.username);
        setFindingAWork(userData.findingawork);
        setSkills(userData.skills);
        setEditedSkills(userData.skills);
        setEditedFindingWork(userData.findingawork);

      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleToggleFindingWork = async () => {
    console.log(`Toggling 'Open to Work' status...`);
    try {
      const res = await fetch(`${API_BASE}/profile/findingWork`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setEditedFindingWork(prev => !prev);
      console.log(`'Open to Work' updated successfully!`);
    } catch (err) {
      console.error("Failed to toggle 'Open to Work':", err);
    }
  };
  const handleSave = async () => {
    console.log("Token used for save:", token);
    try {
      if (JSON.stringify(skills) !== JSON.stringify(editedSkills)) {
        await fetch(`${API_BASE}/profile/skills`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ skills: editedSkills }),
        });
        setSkills(editedSkills);
      }

      if (findingAWork !== editedFindingWork) {
        await handleToggleFindingWork();
        setFindingAWork(editedFindingWork);
      }

      setToggleEdit(false);
    } catch (err) {
      console.error("Error saving profile changes:", err);
    }
  };

  const handleCancel = () => {
    setEditedSkills(skills);
    setEditedFindingWork(findingAWork);
    setToggleEdit(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-t from-green-950 via-green-800 to-lime-200">
      <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-white transition-all duration-500">
        <h2 className="text-3xl font-bold text-green-400 mb-6 tracking-wide text-center">My Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username </label>
            <p className="min-h-[48px] bg-black/20 border border-green-400 px-4 py-2 rounded-lg">{username}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Open to Work</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={editedFindingWork}
                onChange={handleToggleFindingWork}
                className="accent-green-500 w-5 h-5"
              />
              <span className="text-sm text-gray-200">
                {editedFindingWork ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Skills</label>
            {toggleEdit ? (
              <textarea
                className="w-full p-3 rounded-xl bg-black/30 border border-green-500 placeholder:text-gray-400 text-white resize-none focus:ring-2 focus:ring-green-400 focus:outline-none"
                value={editedSkills.join(', ')}
                onChange={(e) =>
                  setEditedSkills(
                    e.target.value.split(',').map((skill) => skill.trim())
                  )
                }
                placeholder="e.g., JavaScript, React, Node.js"
              />
            ) : (
              <p className="min-h-[48px] bg-black/20 border border-green-400 px-4 py-2 rounded-lg">{skills.join(', ')}</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center space-x-4">
          {!toggleEdit ? (
            <button
              onClick={() => setToggleEdit(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-full hover:from-sky-600 hover:to-blue-600 shadow-md transition-all"
            >
              Edit Skills
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-full hover:from-lime-500 hover:to-green-600 shadow-md transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-pink-500 hover:to-red-600 shadow-md transition-all"
              >
                Cancel
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
