"use client";

import { useState, useEffect } from "react";
import Header from "@/(components)/header/page";
import Footer from "@/(components)/footer/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

const backendUrl = "https://bbs11pr8-5002.inc1.devtunnels.ms";

type Report = {
  _id?: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  status?: "pending" | "approved" | "rejected";
  createdBy?: string;
};

export default function AllReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getReports = async () => {
      const res = await fetch(`${backendUrl}/report/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setReports(data.reports || []);
      }
    };
    getReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-green-900 mb-8 text-center tracking-tight">
          All Reports
        </h1>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No reports found.
              </div>
            ) : (
              reports.map((report, idx) => (
                <div
                  key={report._id || idx}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-200 flex flex-col h-full transform hover:-translate-y-1"
                >
                  {/* Status indicator bar */}
                  <div className={`h-2 rounded-t-2xl ${
                    report.status === "approved" ? "bg-green-500" :
                    report.status === "rejected" ? "bg-red-500" :
                    "bg-yellow-500"
                  }`}></div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-lg mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight">
                          {report.title}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize flex items-center whitespace-nowrap ml-2 ${
                          report.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : report.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.status === "approved" && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {report.status === "rejected" && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        {report.status === "pending" && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {report.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-base mb-5 line-clamp-3 flex-1">
                      {report.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="font-medium text-gray-600">Category:</span>
                        <span className="ml-1 text-gray-800 font-semibold">{report.category}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium text-gray-600">Location:</span>
                        <span className="ml-1 text-gray-800 font-semibold">{report.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-between items-center">
                    <div className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                     Reported by{" "}
                      {report.createdBy ? (report.createdBy) : "N/A"}
                    </div>
                   <Link href={`/allreports/${report._id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
+                      View Details
{/* +                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
+                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
+                      </svg> */}
+                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}