'use client'

import { useState, useEffect } from "react"
import Header from '@/(components)/header/page'
import Footer from "@/(components)/footer/page";

export default function AdminPortal() {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    riskApps: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Fetch admin stats (you can implement this later)
    const fetchStats = async () => {
      try {
        // Example data - replace with actual API calls
        setStats({
          totalReports: 42,
          pendingReports: 8,
          riskApps: 15,
          totalUsers: 27
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
      <Header/>
      
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Portal</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Manage reports, risk applications, and system administration
          </p>
        </div>
      </div>
      
      {/* Stats Overview */}
      {/* <div className="max-w-6xl mx-auto px-4 py-8 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{stats.totalReports}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</div>
            <div className="text-sm text-gray-600">Pending Reports</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{stats.riskApps}</div>
            <div className="text-sm text-gray-600">Risk Applications</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </div>
      </div> */}
      
      {/* Admin Actions */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Administrative Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Post a Risk App Card */}
          <a href="/adminRiskapp" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-red-100 p-4 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16极速-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Post Risk Application</h3>
            <p className="text-sm text-gray-600">Add a new risky application to the database</p>
            <div className="mt-4 text-red-600 font-medium flex items-center">
              Manage Risks
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          
          {/* Post a Report Card */}
          <a href="/report" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Create Report</h3>
            <p className="text-sm text-gray-600">Submit a new operational or incident report</p>
            <div className="mt-4 text-green-600 font-medium flex items-center">
              New Report
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          
          {/* Pending Requests Card */}
          <a href="/pending-requests" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-yellow-100 p-4 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Pending Requests</h3>
            <p className="text-sm text-gray-600">Review and approve pending report requests</p>
            <div className="mt-4 text-yellow-600 font-medium flex items-center">
              View Requests
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          
          {/* User Management Card */}
          <a href="/user-management" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 极速0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 极速 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">User Management</h3>
            <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
            <div className="mt-4 text-blue-600 font-medium flex items-center">
              Manage Users
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke极速="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5极速7 7-7 7" />
              </svg>
            </div>
          </a>
          
          {/* Analytics Card */}
          <a href="/analytics" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">System Analytics</h3>
            <p className="text-sm text-gray-600">View system usage and performance metrics</p>
            <div className="mt-4 text-purple-600 font-medium flex items-center">
              View Analytics
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          
          {/* Settings Card */}
          <a href="/admin-settings" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center group">
            <div className="bg-gray-100 p-4 rounded-full mb-4 group-hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 极速 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">System Settings</h3>
            <p className="text-sm text-gray-600">Configure system preferences and options</p>
            <div className="mt-4 text-gray-600 font-medium flex items-center">
              Configure
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 极速 0118 0z" />
            </svg>
            <span>Activity feed will appear here</span>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}