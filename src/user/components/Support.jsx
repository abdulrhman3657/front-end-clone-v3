import React from "react";
import { FaXing, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg- text-gray-800 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Side: Information */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Support</h1>

          <div className="mb-8">
            <h3 className="text-lg font-bold">Startup Evaluation Hub</h3>
            <p className="mt-2 text-sm">
              Connecting innovative startups with investors and community
              feedback.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a
                href="#"
                aria-label="Xing"
                className="text-gray-800 hover:text-gray-500"
              >
                <FaXing size={24} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-800 hover:text-gray-500"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-800 hover:text-gray-500"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-800 hover:text-gray-500"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold">Platform</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Explore Ideas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Submit Idea
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Featured Ideas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Watch Meetings
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-gray-100 shadow-2xl rounded-lg p-5">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <ul className="space-y-4">
            {/* Name Field */}
            <li>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </li>

            {/* Email Field */}
            <li>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </li>

            {/* Message Field */}
            <li>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </li>

            {/* Submit Button */}
            <li>
              <button
                type="submit"
                className="w-full bg-[#1E40AF] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
