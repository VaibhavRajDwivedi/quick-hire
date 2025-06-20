import React, { useState } from 'react'
import { getTokenWithExpiry } from '../utils/set-token'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const HireFreelancer = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const token = getTokenWithExpiry()

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    const skills = query
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    try {
      const res = await fetch(`${API_BASE}/hire`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills }),
      })

      if (!res.ok) {
        if (res.status === 204) {
          setResults([])
          return
        }
        throw new Error(`Search failed (${res.status})`)
      }

      const users = await res.json()
      setResults(users)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleHire = async (user) => {
    console.log(user);
    const message = window.prompt(
      `Write your message to ${user.username}`,
      `Hi ${user.username},\n\nWe’d love to chat about a project that matches your skills in ${query}.\n\nBest,\nQuickHire Team`
    )
    if (!message) return

    const payload = {
      to: user.email,
      subject: `QuickHire – Opportunity for ${user.username}`,
      message,
    }

    try {
      const res = await fetch(`${API_BASE}/mail/hire`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Failed to send (${res.status})`)
      alert(`Email sent to ${user.username}!`)
    } catch (err) {
      console.error(err)
      alert(`Error sending email: ${err.message}`)
    }
  }


  return (
    <div className="mt-17 min-h-screen bg-amber-50 p-4 ">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Hire a Freelancer</h1>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter skills, comma separated"
            className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {error && (
          <p className="text-red-600 mb-4">Error: {error}</p>
        )}

        {results.length === 0 && !loading && (
          <p className="text-gray-600">No freelancers found.</p>
        )}

        <div className="grid gap-4">
          {results.map(user => (
            <div
              key={user.id}
              className="p-4 bg-white rounded-lg shadow flex flex-col"
            >
              <h2 className="text-xl font-semibold">
                {user.username}
              </h2>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-gray-700">
                <strong>Skills:</strong> {user.skills.join(', ') || '—'}
              </p>
              <p className="text-gray-700">
                <strong>Available:</strong>{' '}
                {user.findingawork ? 'Yes' : 'No'}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <button
                onClick={() => handleHire(user)}
                className="mt-3 self-start bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Hire
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HireFreelancer
