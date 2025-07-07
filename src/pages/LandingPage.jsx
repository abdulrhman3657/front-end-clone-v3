import { headerImage } from "../public/ExporImage";
import { MdRocketLaunch } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { logoWhite } from "../public/ExporImage";
import image from "../public/images/Startup-life-amico.png";

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-800">
        {/* Navbar */}
        <section className="sticky top-0 z-50 bg-blue-800 text-white py-1 px-1">
          <nav className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
            {/* Logo + Hamburger */}
            <div className="w-full flex justify-between items-center md:w-auto">
              {/* <p className=" font-bold">Startup Arena Hub</p> */}
              <img src={logoWhite} alt="" className="h-18 w-20" />
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Links + Button */}
            <div
              className={`w-full md:flex md:items-center md:justify-between ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="w-full flex justify-center md:justify-center ">
                <ul className="flex flex-col md:flex-row gap-10 my-4 md:my-0 text-center">
                  <li className="hover:text-yellow-300 cursor-pointer">
                    Explore
                  </li>
                  <li className="hover:text-yellow-300 cursor-pointer">
                    Dashboard
                  </li>
                  <li className="hover:text-yellow-300 cursor-pointer">
                    Watch Meetings
                  </li>
                </ul>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link to="signin">
                  <button className="py-1 px-6 rounded border text-white hover:bg-blue-700 font-medium">
                    SignIn
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-800 to-white py-16 px-4">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
                Turn Your Startup Ideas Into Reality
              </h1>
              <p className="text-lg text-white max-w-xl mx-auto lg:mx-0 mb-8">
                Submit your startup concepts, get valuable feedback from our
                community, and connect with investors ready to fund your next
                big idea.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button className="flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 px-6 rounded hover:bg-yellow-500 transition-all duration-300 shadow-md">
                  <MdRocketLaunch size={22} /> Submit Your Startup Idea
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-md mx-auto">
              <img
                src={image}
                alt="Startup Illustration"
                className="w-full h-auto rounded-lg "
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold  mb-2">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get your startup idea in front of investors
              and the community
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-6 rounded-lg  transition transform hover:scale-105">
              <p className="inline-block py-2 px-4 rounded-full bg-blue-800 text-white font-bold mb-4">
                1
              </p>
              <h3 className="text-xl font-semibold mb-2">Submit Your Idea</h3>
              <p className="text-sm text-gray-600">
                Share your startup concept with detailed description, MVP links,
                and choose relevant industry tags.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6 rounded-lg  transition transform hover:scale-105">
              <p className="inline-block py-2 px-4 rounded-full bg-yellow-400 text-white font-bold mb-4">
                2
              </p>
              <h3 className="text-xl font-semibold mb-2">
                Get Community Votes
              </h3>
              <p className="text-sm text-gray-600">
                Receive feedback and votes from our diverse community of
                critics, entrepreneurs, and industry experts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6 rounded-lg transition transform hover:scale-105">
              <p className="inline-block py-2 px-4 rounded-full bg-green-600 text-white font-bold mb-4">
                3
              </p>
              <h3 className="text-xl font-semibold mb-2">Get Featured</h3>
              <p className="text-sm text-gray-600">
                Ideas with 100+ upvotes get featured to investors who can
                schedule live meetings with you.
              </p>
            </div>
          </div>
        </section>

        {/* Trending Ideas */}
        <section className="bg-gray-50 py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
                Top Trending Ideas
              </h2>
              <a
                href="#"
                className="text-blue-700 font-bold flex items-center hover:underline"
              >
                View All <FaArrowRight className="ml-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Example */}
              <div className="border border-gray-200 rounded-lg shadow bg-white p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Technology
                  </span>
                  <span className="flex items-center text-yellow-300 font-bold">
                    <GoArrowUp /> 430
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Innovative Tech Solutions
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Explore the latest advancements in technology that can drive
                  your startup forward.
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>By: Shahad Riyadh</span>
                  <span>2 days ago</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg shadow bg-white p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    Education
                  </span>
                  <span className="flex items-center text-yellow-300 font-bold">
                    <GoArrowUp /> 423
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Online Learning Platforms
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Discover how to create engaging online learning experiences
                  for students.{" "}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>By: shouq Alkharj</span>
                  <span>2 days ago</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg shadow bg-white p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Health
                  </span>
                  <span className="flex items-center text-yellow-300 font-bold">
                    <GoArrowUp /> 412
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Health Tech Innovations
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Uncover the potential of technology in transforming healthcare
                  services.{" "}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>By: Saad Aljouf</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        {/*  <section className="py-12 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of entrepreneurs and investors already using our
              platform
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xl font-bold text-gray-600">
              <span>TechCorp VC</span>
              <span>Innovation Fund</span>
              <span>StartupX Capital</span>
              <span>Future Ventures</span>
            </div>
          </div>
        </section> */}

        {/* Testimonials / Ratings */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto flex flex-col gap-6">
            {/* Rating Card */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-center sm:text-left ">
                Testimonials
              </h2>
            </div>{" "}
            <div className="container m-0 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg shadow p-4 hover:shadow-xl transition transform hover:scale-105">
                <div className="flex mb-2 text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Explore the latest advancements in technology that can drive
                  your startup forward.
                </p>
                <div className="text-xs text-gray-500">
                  <p>By: Shouq Alkharj</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg shadow p-4 hover:shadow-xl transition transform hover:scale-105">
                <div className="flex mb-2 text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Amazing community feedback helped me refine my product before
                  launch. The analytics are incredibly detailed.
                </p>
                <div className="text-xs text-gray-500">
                  <p>By:Abdualrhman Qassem</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg shadow p-4 hover:shadow-xl transition transform hover:scale-105">
                <div className="flex mb-2 text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  As an investor, this platform saves me time by showing only
                  the most promising, community-validated ideas
                </p>
                <div className="text-xs text-gray-500">
                  <p>By: Shahad Riyadh</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/*  <section className="bg-blue-800 text-white py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Launch Your Startup?
            </h2>
            <p className="text-lg mb-6 max-w-xl mx-auto">
              Join our community of entrepreneurs and investors. Submit your
              idea today and get the feedback you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 font-medium">
                Submit Your Idea Now
              </button>
              <button className="border border-white text-white py-2 px-6 rounded hover:bg-white hover:text-blue-800">
                Browse Existing Ideas
              </button>
            </div>
          </div>
        </section>
 */}
        {/* Footer */}
        <footer className="bg-[#0B1841] text-white py-8 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <img src={logoWhite} alt="" className="w-18 h-16" />
              <h3 className="text-lg font-bold mb-2">Startup Evaluation Hub</h3>
              <p className="text-sm text-gray-300">
                Connecting innovative startups with investors and community
                feedback.
              </p>
              <div className="flex gap-3 mt-2">
                <FaXTwitter />
                <FaLinkedin />
                <FaFacebook />
                <FaInstagram />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Platform</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="hover:text-white cursor-pointer">
                  Explore Ideas
                </li>
                <li className="hover:text-white cursor-pointer">Submit Idea</li>
                <li className="hover:text-white cursor-pointer">
                  Featured Ideas
                </li>
                <li className="hover:text-white cursor-pointer">
                  Watch Meetings
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Resources</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Guidelines</li>
                <li className="hover:text-white cursor-pointer">
                  API Documentation
                </li>
                <li className="hover:text-white cursor-pointer">
                  Success Stories
                </li>
              </ul>
            </div>
            <div>
              <button className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 font-medium w-full">
                Partner With Us
              </button>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2024 Startup Evaluation Hub. All rights reserved.
            <div className="flex justify-center gap-6 mt-2">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
