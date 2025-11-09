'use client'

import { useState } from "react"
import Header from '@/(components)/header/page'
import Footer from '@/(components)/footer/page'

export default function Admin() {
  const [appName, setAppName] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`https://bbs11pr8-5002.inc1.devtunnels.ms/risk/do`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appName, websiteName, title, description
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Risk submitted successfully!");
        setAppName('');
        setWebsiteName('');
        setTitle('');
        setDescription('');
      } else {
        setMessage(data.message || "Failed to submit risk.");
      }
    } catch (err) {
      setMessage("Error submitting risk.");
    }
    setLoading(false);
  }

  return (
    <div>

      <Header/>
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-green-900 text-center">Admin Panel - Report a Risk</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={appName}
            onChange={e => setAppName(e.target.value)}
            placeholder="App Name"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
          />
          <input
            value={websiteName}
            onChange={e => setWebsiteName(e.target.value)}
            placeholder="Website Name"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
          />
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Risk Title"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Risk Description"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            {loading ? "Submitting..." : "Submit Risk"}
          </button>
          {message && <div className="text-center text-green-700 mt-2">{message}</div>}
        </form>
      </div>
    </div>

      <Footer/>
    </div>
  )
}