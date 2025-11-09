'use client'
import { useState } from "react";
import Footer from "@/(components)/footer/page";
export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [secretId, setSecretId] = useState<string>('');
  const [role, setRole] = useState<string>('army');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Sending registration request...");
      const res = await fetch(`https://bbs11pr8-5002.inc1.devtunnels.ms/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify({
          username,
          email,
          password,
          age,
          designation,
          phonenumber,
          unit,
          secretId,
          role
        })
      });
      
      const data = await res.json();
      console.log("Registration response:", data);
      
      if (res.ok) {
        // Reset form
        setUsername('');
        setEmail('');
        setPassword('');
        setAge('');
        setDesignation('');
        setPhonenumber('');
        setUnit('');
        setSecretId('');
        setRole('army');
        
        // Redirect to home page
        window.location.href = 'https://bbs11pr8-3000.inc1.devtunnels.ms';
      } else {
        console.error('Registration failed:', data.message);
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Military Portal Registration</h1>
          <p className="text-gray-600 mt-2">Create your account to access the army portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Information</h2>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 text-green-700 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={e => setAge(e.target.value)}
                min="18"
                max="60"
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>
          
          {/* Military Information Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Military Information</h2>
            
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                id="designation"
                type="text"
                placeholder="Your designation/rank"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phonenumber"
                type="tel"
                placeholder="Your phone number"
                value={phonenumber}
                onChange={e => setPhonenumber(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                id="unit"
                type="text"
                placeholder="Your unit information"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="secretId" className="block text-sm font-medium text-gray-700 mb-1">Secret ID</label>
              <input
                id="secretId"
                type="text"
                placeholder="Your secret identification code"
                value={secretId}
                onChange={e => setSecretId(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-4 py-2 text-green-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="army">Army Personnel</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
          
          {/* Full width submit button */}
          <div className="md:col-span-2 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Register Account'
              )}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
      <Footer/>
    </div>
  );
}