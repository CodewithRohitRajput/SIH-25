'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/(components)/header/page";
import Footer from "@/(components)/footer/page";

const backendUrl = "https://bbs11pr8-5002.inc1.devtunnels.ms";

type Report = {
  _id?: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  status?: "pending" | "approved" | "rejected";
  createdBy?: string;
  createdAt?: string;
};

export default function ReportDetail() {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/report/detail/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load report");
        const data = await res.json();
        // expect API returns { report } or { reports: [...] }
        const item = data.report || (data.reports && data.reports[0]) || null;
        setReport(item);
      } catch (err: any) {
        setError(err.message || "Error loading report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-violet-100 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => router.back()} className="mb-6 text-sm text-indigo-600 hover:underline">
          ← Back
        </button>

        {loading ? (
          <div className="p-8 bg-white rounded-lg shadow text-center">Loading...</div>
        ) : error ? (
          <div className="p-8 bg-red-50 rounded-lg shadow text-center text-red-700">{error}</div>
        ) : !report ? (
          <div className="p-8 bg-white rounded-lg shadow text-center">Report not found.</div>
        ) : (
          <article className="bg-white rounded-xl shadow-md p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{report.title}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded ${report.status === 'approved' ? 'bg-indigo-100 text-indigo-700' : report.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {report.status}
                </span>
                <span>•</span>
                <span>Reported by: {report.createdBy || 'N/A'}</span>
                <span>•</span>
                <span>{report.createdAt ? new Date(report.createdAt).toLocaleString() : '—'}</span>
              </div>
            </header>

            <section className="prose prose-indigo max-w-none mb-6">
              <h4 className="text-sm font-medium text-gray-600">Description</h4>
              <p className="text-gray-800">{report.description}</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-semibold text-gray-500">Category</h5>
                <div className="mt-1 text-gray-800 font-medium">{report.category || '—'}</div>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-gray-500">Location</h5>
                <div className="mt-1 text-gray-800 font-medium">{report.location || '—'}</div>
              </div>
            </section>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}