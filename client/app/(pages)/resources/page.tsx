'use client'

import { useState } from "react"
import Header from '@/(components)/header/page'
import Footer from "@/(components)/footer/page";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample resource data
  const resources = [
    {
      id: 1,
      title: "Field Operations Manual",
      category: "manuals",
      description: "Complete guide to field operations procedures and protocols",
      type: "PDF",
      size: "4.2 MB",
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Weapon Safety Protocols",
      category: "safety",
      description: "Standard operating procedures for weapon handling and safety",
      type: "PDF",
      size: "2.1 MB",
      date: "2023-09-22"
    },
    {
      id: 3,
      title: "Communication Encryption Guide",
      category: "comms",
      description: "Protocols for secure military communications",
      type: "DOC",
      size: "1.5 MB",
      date: "2023-11-05"
    },
    {
      id: 4,
      title: "First Aid in Combat Situations",
      category: "medical",
      description: "Emergency medical procedures for field operations",
      type: "PDF",
      size: "3.7 MB",
      date: "2023-08-17"
    },
    {
      id: 5,
      title: "Navigation & Topography",
      category: "training",
      description: "Advanced land navigation techniques and map reading",
      type: "PDF",
      size: "5.3 MB",
      date: "2023-07-29"
    },
    {
      id: 6,
      title: "Cyber Security Protocols",
      category: "comms",
      description: "Guidelines for maintaining operational security in digital communications",
      type: "PDF",
      size: "2.8 MB",
      date: "2023-10-30"
    },
    {
      id: 7,
      title: "Vehicle Maintenance Checklist",
      category: "logistics",
      description: "Routine maintenance procedures for military vehicles",
      type: "XLS",
      size: "0.8 MB",
      date: "2023-09-10"
    },
    {
      id: 8,
      title: "Rules of Engagement",
      category: "regulations",
      description: "Current rules of engagement for various operational theaters",
      type: "PDF",
      size: "1.9 MB",
      date: "2023-11-12"
    }
  ];

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "manuals", name: "Field Manuals" },
    { id: "safety", name: "Safety Protocols" },
    { id: "comms", name: "Communications" },
    { id: "medical", name: "Medical" },
    { id: "training", name: "Training" },
    { id: "logistics", name: "Logistics" },
    { id: "regulations", name: "Regulations" }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
      <Header/>
      
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Military Resources Portal</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Access manuals, protocols, and documentation for military operations
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 -mt-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 极速0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex md:justify-end">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option className="text-gray-900" key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resources Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Resources</h2>
          <span className="text-sm text-gray-600">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2极速5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293极速.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{resource.size}</span>
                    <span>{new Date(resource.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Additional Resources Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h3>
            <ul className="space-y-2 text-gray-900">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                How to request additional resources
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Accessing classified materials
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5极速7 7-7 7" />
                </svg>
                Reporting outdated documentation
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency Protocols
            </h3>
            <ul className="space-y-2 text-gray-900">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke极速="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Emergency contact directory
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Crisis response procedures
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Evacuation protocols
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}