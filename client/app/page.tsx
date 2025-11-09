'use client'

import { useState, useEffect } from "react"
import Header from '../(components)/header/page'
import Footer from "@/(components)/footer/page";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [riskApps, setRiskApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [riskLoading, setRiskLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  const backendUrl = "https://bbs11pr8-5002.inc1.devtunnels.ms";

  const getReports = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${backendUrl}/report/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setReports(data.reports || []);
        
        // Calculate stats
        const total = data.reports.length;
        const pending = data.reports.filter((r: any) => r.status === "pending").length;
        // const approved = data.reports.filter((r: any) => r.status === "approved").length;
        const rejected = data.reports.filter((r: any) => r.status === "rejected").length;
        
        setStats(prevStats => ({ ...prevStats,total, pending , rejected }));
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskApps = async () => {
    try {
      setRiskLoading(true);
      const res = await fetch(`${backendUrl}/risk/get`, {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setRiskApps(data.data || []);
      const approved = data.data.length;
      setStats(prevStats => ({...prevStats , approved}))
    } catch (err) {
      console.error("Error fetching risk applications:", err);
    } finally {
      setRiskLoading(false);
    }
  };

  useEffect(() => {
    getReports();
    getRiskApps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
      <Header/>
      
      {/* AI Chat Button */}
      <a
        href="/chatbotAI"
        className="fixed bottom-8 right-8 z-50 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all"
        style={{ boxShadow: "0 8px 24px rgba(34,197,94,0.2)" }}
      >
        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Talk to AI
      </a>
      
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">VAJRA PORTAL</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Secure platform for army personnel to submit, track, and manage operational reports
          </p>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Risked WEB/APP</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a href="/report" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Submit New Report</h3>
            <p className="text-sm text-gray-600">Create and submit a new operational report</p>
          </a>
          
          <a href="/resources" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Resources</h3>
            <p className="text-sm text-gray-600">Access military manuals and documentation</p>
          </a>
          
          <a href="/profile" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">My Profile</h3>
            <p className="text-sm text-gray-600">View and update your personal information</p>
          </a>
        </div>
      </div>
      
      {/* Risk Applications Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Risk Applications</h2>
          <a href="/risk" className="text-green-600 hover:text-green-700 font-medium flex items-center">
            View All Risks
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        {riskLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center">
              <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="mt-4 text-gray-600">Loading risk applications...</p>
          </div>
        ) : riskApps.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No risk applications found</h3>
            <p className="text-gray-500 mb-6">No risky applications have been reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskApps.slice(0, 6).map((risk: any, idx: number) => (
              <div key={risk._id || idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-red-500">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{risk.appName}</h3>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Website:</span> {risk.websiteName}
                  </p>
                  <p className="text-md text-gray-800 font-semibold mb-2">{risk.title}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{risk.description}</p>
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Reported on {new Date(risk.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Reports Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>
          <a href="/allreports" className="text-green-600 hover:text-green-700 font-medium flex items-center">
            View All Reports
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center">
              <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any reports yet.</p>
            <a href="/report" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Submit Your First Report
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.slice(0, 6).map((report: any, idx: number) => (
              <div key={report._id || idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === "approved" ? "bg-green-100 text-green-800" :
                      report.status === "rejected" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Category: {report.category}</span>
                    <span>Location: {report.location}</span>
                  </div>
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Submitted on {new Date(report.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer/>
    </div>
  )
}