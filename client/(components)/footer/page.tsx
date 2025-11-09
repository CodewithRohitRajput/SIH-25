import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <ShieldIcon />
              <span className="ml-2 text-xl font-bold text-green-100">Vajra Portal</span>
            </Link>
            <p className="mt-4 text-green-200 max-w-md">
              Secure platform for army personnel to submit reports, access resources, and manage military operations efficiently.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-green-200 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/dashboard" className="text-base text-green-100 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-base text-green-100 hover:text-white">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-base text-green-100 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-base text-green-100 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-green-200 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-green-100 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-green-100 hover:text-white">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-green-100 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-green-100 hover:text-white">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-green-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-green-300 hover:text-green-100">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-green-300 hover:text-green-100">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-base text-green-200 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Vajra Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
  </svg>
)