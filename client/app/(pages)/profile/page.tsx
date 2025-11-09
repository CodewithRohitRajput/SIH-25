'use client'

import { useEffect, useState } from "react"
import Footer from '../../../(components)/footer/page'
import Header from '../../../(components)/header/page'

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    designation: '',
    phonenumber: '',
    unit: '',
    secretId: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://bbs11pr8-5002.inc1.devtunnels.ms/profile/me`, {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await res.json();
        console.log(data);
        
        setProfile({
          username: data.profile.username || '',
          email: data.profile.email || '',
          age: data.profile.age || '',
          designation: data.profile.designation || '',
          phonenumber: data.profile.phonenumber || '',
          unit: data.profile.unit || '',
          secretId: data.profile.secretId || ''
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDetail();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
            <div className="w-full space-y-4">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Header/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-700 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 bg-green-800 rounded-full flex items-center justify-center text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                {profile.username ? profile.username[0].toUpperCase() : 'A'}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{profile.username || 'Unknown User'}</h1>
                <p className="text-green-100">{profile.designation || 'Army Personnel'}</p>
                <p className="text-green-100 mt-1">{profile.unit || 'No unit assigned'}</p>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                      {profile.email || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                      {profile.age || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                      {profile.phonenumber || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Military Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Military Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Designation/Rank</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                      {profile.designation || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Unit</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                      {profile.unit || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Secret ID</label>
                    <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200 font-mono">
                      {profile.secretId || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Profile
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Request Support
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Information Card */}
        <div className="bg-white rounded-xl shadow-lg mt-6 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-700">24</div>
              <div className="text-gray-600">Reports Submitted</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-700">18</div>
              <div className="text-gray-600">Approved Reports</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-700">6</div>
              <div className="text-gray-600">Pending Reports</div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <Footer/>
    </div>
  );
}