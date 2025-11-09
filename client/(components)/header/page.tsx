"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token , setToken] = useState(false);
  const [admin , setAdmin] = useState(false);

  useEffect(()=>{
    const fetchToken = async () =>{
        const res = await fetch(`https://bbs11pr8-5002.inc1.devtunnels.ms/auth/token` , {
            method : 'POST',
            credentials : 'include',
        })
        const data = await res.json();
        setToken(data.loggedIn);
    }
    const checkAdmin = async () =>{
        const res = await fetch(`https://bbs11pr8-5002.inc1.devtunnels.ms/auth/isAdmin` , {
            method : 'POST',
            credentials : 'include'
        })
        const data = await res.json();
        setAdmin(data.isAdmin);
    }
    fetchToken();
    checkAdmin();
  } , [])

  const handleLogout = async () =>{
   const res = await fetch('https://bbs11pr8-5002.inc1.devtunnels.ms/auth/logout' , {
    method : 'POST',
    credentials : 'include'
   });
   setToken(false);
   window.location.href="/login"
  }

  return (
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white shadow-lg border-b-4 border-green-600">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <svg className="h-9 w-9 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
          </svg>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-green-100 drop-shadow-lg">
            Vajra Portal
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 items-center font-medium">
            {admin ? <> <li>
            <a href="/admin" className="hover:text-green-300 transition">Admin</a>
          </li></> : <></>}
         

          <li>
            <a href="/" className="hover:text-green-300 transition">Home</a>
          </li>
          <li>
            <a href="/allreports" className="hover:text-green-300 transition">Reports</a>
          </li>
          <li>
            <a href="/chatbotAI" className="hover:text-green-300 transition">Vajra AI</a>
          </li>
          <li>
            <a href="/risk" className="hover:text-green-300 transition">Risks</a>
          </li>
          <li>
            <a href="/profile" className="hover:text-green-300 transition">Profile</a>
          </li>
          <div>
            {token ? <>
            <button
             onClick={handleLogout}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold shadow transition"
            >
              Logout
            </button>
          </> : <>
           <li>
            <a
              href="/login"
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold shadow transition"
            >
              Login
            </a>
          </li>
          </>
          }
          </div>
         
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-6 py-4 space-y-4 border-t border-green-600">
          <a href="/" className="block hover:text-green-300 transition">Home</a>
          <a href="/dashboard" className="block hover:text-green-300 transition">Dashboard</a>
          <a href="/about" className="block hover:text-green-300 transition">About</a>
          <a
            href="/report"
            className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-center font-semibold shadow transition"
          >
            Report
          </a>
        </div>
      )}
    </nav>
  );
}