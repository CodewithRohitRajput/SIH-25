"use client";

import React, { useState } from "react";
import Header from '../../../(components)/header/page'
import Footer from '../../../(components)/footer/page'

export default function Report() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = "https://bbs11pr8-5002.inc1.devtunnels.ms";
    
  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendUrl}/report/do`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          status,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Report submitted successfully!");
        setTitle("");
        setDescription("");
        setCategory("");
        setLocation("");
        setStatus("pending");
      } else {
        setMessage(data.message || "Failed to submit report.");
      }
    } catch (err) {
      setMessage("Error submitting report.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6  text-green-900">Submit a Report</h1>
        <form onSubmit={handleReport} className="space-y-4 bg-green-50 p-6 rounded-lg shadow">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full px-4 py-2 border border-black text-black placeholder-black rounded"
            required
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-black text-black rounded"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
          {message && <div className="text-center text-green-700 mt-2">{message}</div>}
        </form>
      </div>
      <Footer />
    </div>
  );
}