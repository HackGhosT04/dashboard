import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About BrilliantBridge</h3>
          <p className="text-sm">
            BrilliantBridge bridges the gap between learning and earning by offering customizable pathways, real-world projects, and career opportunities for high school, undergrad, and postgrad students.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/signup" className="hover:underline">
                Sign Up
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Log In
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:underline">
                Career Pathways
              </a>
            </li>
            <li>
              <a href="/mentorship" className="hover:underline">
                Mentorship
              </a>
            </li>
            <li>
              <a href="/marketplace" className="hover:underline">
                Freelance Marketplace
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm">
            Email: <a href="mailto:support@brilliantbridge.com" className="underline">support@brilliantbridge.com</a>
          </p>
          <p className="text-sm mt-2">Phone: +27 69 715 1858</p>
          <p className="text-sm mt-2">
            Address: 123 Learning St, Bridge City, Knowledge Land
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-gray-300" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 19c-5 0-8-4-8-8v-1c1 0 2 0 2-1a5 5 0 0 0 3 1c-1-1-3-1-3-3a5 5 0 0 0 2 1C4 7 7 5 10 5c0-1 1-2 3-2s3 2 3 4a8 8 0 0 0 5-2c-1 2-2 3-3 4 2 0 3-1 4-1-1 3-3 4-5 4a10 10 0 0 1-8 4" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 21h-4v-6c0-1-1-2-2-2s-2 1-2 2v6h-4v-11h4v2a3 3 0 0 1 6 0v9zM6 21h-4v-11h4zm-2-13a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm border-t border-indigo-500 pt-4">
        <p>© 2024 BrilliantBridge. All rights reserved.</p>
      </div>
    </footer>
    
    </>
  )
}

export default Footer