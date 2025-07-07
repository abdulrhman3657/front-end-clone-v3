import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import image from "../public/images/Startup-life-amico.png";
import { Link } from 'react-router';
import  logo  from "../public/images/fullLogo.png";

export default function Landing() {
    const [isOpen, setIsOpen] = useState(false);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
  const menuItems = ["Home", "Solutions", "Success Stories", "Contact"];

  return (
        <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">

      {/* Navbar */}
     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between ">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          {menuItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-700 transition relative group"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 scale-x-0 origin-left transform transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex space-x-3">
          <motion.button
            className="px-6 py-2 text-sm font-semibold border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <Link to={"/signin"} >Log In</Link>  
          </motion.button>
          <motion.button
            className="px-6 py-2 text-sm font-semibold bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           <Link  to={"/signup"}>Get Started</Link> 
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-gray-700 hover:text-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Link to={"/signin"} className="w-full px-4 py-2 text-sm border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition">
              Log In
            </Link>
            <Link to={"/signup"} className="w-full px-4 py-2 text-sm bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white  h-screen px-6 overflow-hidden">
  <div className="absolute inset-0 z-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="250" cy="150" rx="400" ry="200" fill="currentColor" className="text-blue-400" />
      <ellipse cx="1200" cy="650" rx="500" ry="250" fill="currentColor" className="text-indigo-400" />
      <ellipse cx="700" cy="400" rx="300" ry="150" fill="currentColor" className="text-purple-400" />
    </svg>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      
      {/* Text Content */}
      <div className="text-center lg:text-left lg:max-w-xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Turn Your Startup Ideas Into Reality
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Submit your startup concepts, get valuable feedback from our community, and connect with investors ready to fund your next big idea.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/signin"
            className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Our Solutions
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <img
          src={image}
          alt="Dashboard Preview"
          className="mx-auto w-full max-w-2xl "
        />
      </motion.div>
    </div>
  </div>
</section>

      {/* Features / Solutions Section */}
     <section id="solutions" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 text-center">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-7xl mx-auto"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-gray-900 tracking-tight">
      How It Works
    </h2>

    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {[
        {
          icon:"https://cdn-icons-png.flaticon.com/128/7202/7202291.png" ,
          title: "Submit Your Idea",
          description:
            "Share your startup concept with detailed description, MVP links, and choose relevant industry tags.",
        },
        {
          icon: 'https://cdn-icons-png.flaticon.com/128/3100/3100276.png',
          title: "Get Community Votes",
          description:
            "Receive feedback and votes from our diverse community of critics, entrepreneurs, and industry experts.",
        },
        {
          icon: 'https://cdn-icons-png.flaticon.com/128/18575/18575848.png',
          title: "Get Featured",
          description:
            "Ideas with 100+ upvotes get featured to investors who can schedule live meetings with you.",
        },
      ].map((feature, i) => (
        <motion.div
          key={i}
          variants={fadeIn}
          whileHover={{ y: -10, boxShadow: '0px 10px 30px rgba(0,0,0,0.08)' }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group text-left relative overflow-hidden"
        >
          {/* Decorative background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <img src={feature.icon} className="text-5xl mb-6 text-blue-600 relative z-10" width={50}/>
          <h3 className="text-xl font-bold mb-3 text-gray-900 relative z-10">{feature.title}</h3>
          <p className="text-base text-gray-600 leading-relaxed relative z-10">
            {feature.description}
          </p>

         
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</section>


      {/* Testimonials / Success Stories Section */}
    <section id="success-stories" className=" bg-gradient-to-b from-gray-50 to-white py-24 px-6">
  <div className="max-w-7xl mx-auto text-center">
    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-teal-600 font-semibold uppercase text-sm mb-3 tracking-wider"
    >
      Client Voices
    </motion.p>

    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
    >
      Success Stories: Real Results for Real Startups
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
    >
      Hear directly from founders who've partnered with us to achieve significant milestones and accelerate their growth.
    </motion.p>

    {/* Testimonials Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {[
        {
          role: "IntelliCite",
          comment:
            "StartUp Arena platform was the real starting point for IntelliCite. She helped us crystallize the idea, presented it to the community, and gathered valuable feedback that developed the project and brought it closer to the researchers' needs.",
        },
        {
          role: "Bassar",
          comment:
            "Your platform was the first place we showed Memory Hub. We received support, ratings, and analysis that helped us understand our audience and develop an emotional and artistic product that meets the needs of many users.",
        },
        {
          role: "Bus Line",
          comment:
            "Thanks to StartUp Arena we were able to turn a simple idea into a project that serves thousands of users every day. Our design of the product came after our interaction with the platform community, who helped us with real suggestions.",
        },
    /*     {
          role: "Memory Hub",
          comment:
            "منصتكم كانت المكان الأول اللي عرضنا فيه Memory Hub. تلقينا دعم، تقييمات، وتحليلات ساعدتنا نفهم جمهورنا ونطوّر منتج عاطفي وفني يلبي حاجة كثير من المستخدمين.",
        }, */
      ].map((feedback, i) => (
        <motion.div
          key={i}
          variants={fadeIn}
          whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          {/* Decorative accent line on left */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Stars */}
          <div className="flex text-yellow-400 mb-4 text-xl">★★★★★</div>

          {/* Comment Text */}
          <p className="text-gray-700 leading-relaxed mb-6 italic">
            “{feedback.comment}”
          </p>

          {/* Author */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <p className="font-medium text-gray-900">{feedback.role}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


      {/* Call to Action (CTA) Section */}
     <section className="bg-blue-800  text-white py-24 md:py-32 px-6 relative overflow-hidden">
  {/* Background decoration */}
  <div className="absolute inset-0 opacity-10 z-0">
    <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="720" cy="400" r="500" fill="currentColor" className="text-blue-300" />
    </svg>
  </div>

  <div className="relative z-10 max-w-5xl mx-auto text-center">
    {/* Headline */}
    <motion.h2
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Ready to Launch Your Startup?
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      Join our community of entrepreneurs and investors. Submit your idea today and get the feedback you need to succeed.
    </motion.p>

    {/* CTA Button */}
    <motion.div
      className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
    >
      <Link
        to={"/signin"}
        className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
      >
        Submit Your Startup Idea
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  </div>
</section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-full md:col-span-1 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-white mb-3">
              StartUp Arena
            </h1>
            <p className="text-sm leading-relaxed">
              Empowering startups to build, grow, and conquer their markets with expert guidance and cutting-edge solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Solutions</a></li>
              <li><a href="#success-stories" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact/Social */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {/* Replace with actual SVG icons from a library like Heroicons, Font Awesome, etc. */}
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:-translate-y-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.502 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:-translate-y-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.278 3.738a.75.75 0 0 0-1.056 0L3.136 11.83a.75.75 0 1 0 1.06 1.06L11.5 6.561V20.25a.75.75 0 0 0 1.5 0V6.561l7.303 7.304a.75.75 0 0 0 1.06-1.06l-8.086-8.086Z" clipRule="evenodd" /></svg>
              </a>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} GrowthPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
