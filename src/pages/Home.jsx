import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import logo from "../assets/images/logo.png";
import adobe from "../assets/images/brands/adobe-logo-darkmode.png";
import facebook from "../assets/images/brands/facebook-corporate-logo2-darkmode.png";
import deloitte from "../assets/images/brands/deloitte-logo2-darkmode.png";
import nasa from "../assets/images/brands/nasa-logo-v4.webp";
import ibm from "../assets/images/brands/ibm-logo2-darkmode.png";
import google from "../assets/images/brands/google-logo-darkmode.png";
import nyt from "../assets/images/brands/the-new-york-times-darkmode.png";
import wsj from "../assets/images/brands/wall-street-journal-darkmode.png";
import cnn from "../assets/images/brands/cnn-darkmode.png";
import bloomberg from "../assets/images/brands/bloomberg-darkmode.png";
import yahoo from "../assets/images/brands/yahoo-finance-darkmode.png";
import business from "../assets/images/brands/business-insider-darkmode.png";
import forbes from "../assets/images/brands/forbes-darkmode.png";

import portfolio1 from "../assets/images/portfolio/img1_1.jpg";
import portfolio2 from "../assets/images/portfolio/img1_2.jpg";
import portfolio3 from "../assets/images/portfolio/img1_3.jpeg";
import portfolio4 from "../assets/images/portfolio/img1_4.jpeg";
import portfolio5 from "../assets/images/portfolio/img1_5.jpg";

import video1Src from "../assets/videos/vd1.mp4";
import video2Src from "../assets/videos/vd2.mp4";
import video3Src from "../assets/videos/vd3.mp4";

function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [portfolioHover, setPortfolioHover] = useState(null);
  const [count, setCount] = useState({ freelancers: 0, jobs: 0, clients: 0 });
  
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const imagesSectionRef = useRef(null);
  
  const skills = [
    "Web Development", 
    "Graphic Design", 
    "Content Writing", 
    "Video Editing", 
    "Digital Marketing",
    "App Development",
    "UI/UX Design",
    "Data Analysis"
  ];
  const [currentSkill, setCurrentSkill] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill(prev => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const targetCounts = { freelancers: 60, jobs: 125, clients: 93 };
    const duration = 2000;
    const frameRate = 50;
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      setCount({
        freelancers: Math.ceil((targetCounts.freelancers / totalFrames) * frame),
        jobs: Math.ceil((targetCounts.jobs / totalFrames) * frame),
        clients: Math.ceil((targetCounts.clients / totalFrames) * frame)
      });
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(counter);
  }, []);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === secondSectionRef.current) {
            setActiveSection('second');
          } else if (entry.target === thirdSectionRef.current) {
            setActiveSection('third');
          } else if (entry.target === imagesSectionRef.current) {
            setActiveSection('images');
          }
        }
      });
    }, options);
    
    if (secondSectionRef.current) observer.observe(secondSectionRef.current);
    if (thirdSectionRef.current) observer.observe(thirdSectionRef.current);
    if (imagesSectionRef.current) observer.observe(imagesSectionRef.current);
    
    return () => {
      if (secondSectionRef.current) observer.unobserve(secondSectionRef.current);
      if (thirdSectionRef.current) observer.unobserve(thirdSectionRef.current);
      if (imagesSectionRef.current) observer.unobserve(imagesSectionRef.current);
    };
  }, []);
  
  const handlePortfolioHover = (index) => {
    setPortfolioHover(index);
  };

  return (
    <main className="overflow-x-hidden">
      <section className="relative w-full h-screen overflow-hidden">
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-6000 hover:scale-105"
        >
          <source src={video1Src} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-end pr-10 z-10">
          <motion.div 
            className="max-w-xl text-white p-6 bg-black/50 backdrop-blur-lg rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Hire the best <br />
              <span className="text-[#a5ff2f]">
                {skills[currentSkill]} 
              </span><br />
              freelancer online.
            </h1>
            <ul className="space-y-3 mb-8">
              <motion.li 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="mr-2 text-[#a5ff2f]">→</span> Fastest growing freelance marketplace
              </motion.li>
              <motion.li 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="mr-2 text-[#a5ff2f]">→</span> Any job you can possibly think of
              </motion.li>
              <motion.li 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <span className="mr-2 text-[#a5ff2f]">→</span> Save up to 90% & get quotes for free
              </motion.li>
              <motion.li 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="mr-2 text-[#a5ff2f]">→</span> Pay only when you're 100% happy
              </motion.li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="px-8 py-3 bg-[#3d8c08] text-white rounded-full border-2 border-[#3d8c08] font-medium hover:bg-[#62d100] hover:border-[#62d100] hover:shadow-lg hover:shadow-[#9acd32]/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire a freelancer
              </motion.button>
              <motion.button 
                className="px-8 py-3 bg-transparent text-white rounded-full border-2 border-[#3d8c08] font-medium hover:bg-[#3d8c08] hover:shadow-lg hover:shadow-[#9acd32]/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Earn money freelancing
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        
      </section>

      <div className="bg-black py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <h3 className="text-3xl font-bold text-[#a5ff2f] mb-2">{count.freelancers}M+</h3>
            <p className="text-white">Freelancers</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-[#a5ff2f] mb-2">{count.jobs}K+</h3>
            <p className="text-white">Jobs Posted Daily</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-[#a5ff2f] mb-2">{count.clients}%</h3>
            <p className="text-white">Client Satisfaction</p>
          </div>
        </div>
      </div>

      <div className="bg-black py-12 border-t border-[#a5ff2f]/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10 relative after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-[#a5ff2f] after:left-1/4 after:-bottom-2 after:hover:w-full after:hover:left-0 after:transition-all">
            As used by
          </h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[
              { src: adobe, alt: "Adobe", height: 40 },
              { src: facebook, alt: "Facebook", height: 40 },
              { src: deloitte, alt: "Deloitte", height: 40 },
              { src: nasa, alt: "NASA", height: 35 },
              { src: ibm, alt: "IBM", height: 40 },
              { src: google, alt: "Google", height: 40 }
            ].map((brand, index) => (
              <motion.div 
                key={index}
                className="filter grayscale hover:grayscale-0 transition-all"
                whileHover={{ scale: 1.2 }}
              >
                <img 
                  src={brand.src} 
                  alt={brand.alt} 
                  style={{ height: `${brand.height}px` }}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <section 
        ref={secondSectionRef} 
        className="relative w-full min-h-screen overflow-hidden bg-black"
      >
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-8000 hover:scale-105"
        >
          <source src={video2Src} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 container mx-auto py-28 px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'second' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#a5ff2f]">Make it real</span>
            <br />
            with QuickHire
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all"
              initial={{ opacity: 0, x: -50 }}
              animate={activeSection === 'second' ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4">The Best Talent</h2>
              <p className="text-gray-200">
                Discover reliable professionals by exploring their portfolios and 
                immersing yourself in the feedback shared on their profiles.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all"
              initial={{ opacity: 0, x: 50 }}
              animate={activeSection === 'second' ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4">Fast bids</h2>
              <p className="text-gray-200">
                Get quick, no-obligation quotes from skilled freelancers. 80% of jobs
                receive bids within 60 seconds. Your idea is just moments from reality.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all"
              initial={{ opacity: 0, x: -50 }}
              animate={activeSection === 'second' ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4">Quality work</h2>
              <p className="text-gray-200">
                With QuickHire's talent pool of over 60 million professionals at your
                fingertips, you'll find quality talent to get what you need done.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all"
              initial={{ opacity: 0, x: 50 }}
              animate={activeSection === 'second' ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4">BE in control</h2>
              <p className="text-gray-200">
                Stay in the loop while on the move. Chat with your freelancers and get
                real time updates with our mobile app. Anytime, anywhere.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'second' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Make your dreams a reality.
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/signup" 
                className="inline-block px-8 py-3 text-xl font-bold text-[#a5ff2f] border-2 border-[#a5ff2f] rounded-full hover:bg-[#3d8c08] hover:text-white hover:shadow-lg hover:shadow-[#9acd32]/40 transition-all"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        ref={imagesSectionRef}
        className="bg-black py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-[#a5ff2f] after:left-1/2 after:-bottom-4 after:-translate-x-1/2">
            See what our freelancers can create
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Web Development",
                description: "Modern responsive websites built with the latest technologies",
                bgColor: "from-blue-600 to-purple-600",
                icon: "💻"
              },
              {
                title: "Graphic Design",
                description: "Creative visual solutions for brands and businesses",
                bgColor: "from-pink-500 to-red-500",
                icon: "🎨"
              },
              {
                title: "UI/UX Design",
                description: "User-focused interfaces that drive engagement",
                bgColor: "from-green-500 to-teal-500",
                icon: "📱"
              },
              {
                title: "Video Production",
                description: "Professional video content for any platform",
                bgColor: "from-yellow-500 to-orange-500",
                icon: "🎬"
              },
              {
                title: "Content Writing",
                description: "Engaging storytelling that connects with your audience",
                bgColor: "from-indigo-500 to-blue-500",
                icon: "✍️"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl group h-full cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={activeSection === 'images' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => handlePortfolioHover && handlePortfolioHover(index + 1)}
                onMouseLeave={() => handlePortfolioHover && handlePortfolioHover(null)}
              >
                <div className={`w-full h-64 md:h-80 bg-gradient-to-br ${item.bgColor} transition-transform duration-500 group-hover:scale-110 flex items-center justify-center`}>
                  <span className="text-6xl opacity-20">{item.icon}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 text-[#a5ff2f] opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                  ↗
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={thirdSectionRef}
        className="relative w-full min-h-screen overflow-hidden bg-[#032f10]"
      >
        {/* Video Background with Fallback */}
        <div className="absolute inset-0">
          {video3Src ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-8000 hover:scale-105"
              onError={(e) => {
                console.log('Video failed to load:', e);
                e.target.style.display = 'none';
              }}
            >
              <source src={video3Src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#032f10] via-[#065a1e] to-[#032f10] animate-pulse">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#a5ff2f] rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#a5ff2f] rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-[#a5ff2f] rounded-full blur-3xl animate-bounce delay-2000"></div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto py-28 px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-16 text-center md:text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'third' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#a5ff2f]">Tap into a</span>
            <br className="hidden md:block" />
            <span className="block md:inline"> global talent network</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:border-[#a5ff2f]/50 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={activeSection === 'third' ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4 flex items-center">
                <span className="mr-3 text-3xl">📝</span>
                Post Your Job
              </h2>
              <p className="text-gray-200 leading-relaxed">
                It's free and easy! Get lots of competitive bids that suit your
                budget in minutes. Start making your dreams reality.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:border-[#a5ff2f]/50 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={activeSection === 'third' ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4 flex items-center">
                <span className="mr-3 text-3xl">👥</span>
                Choose Freelancers
              </h2>
              <p className="text-gray-200 leading-relaxed">
                No job is too big or complex. We've got freelancers for jobs of any size
                or budget, across 2700+ skills. Let our talent bring your ideas to life.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:border-[#a5ff2f]/50 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={activeSection === 'third' ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4 flex items-center">
                <span className="mr-3 text-3xl">💳</span>
                Pay Safely
              </h2>
              <p className="text-gray-200 leading-relaxed">
                Only pay for work when you are 100% satisfied with the outcome.
                Our milestone payment system protects you every step of the way.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:bg-gray-900/80 hover:border-[#a5ff2f]/50 hover:shadow-lg hover:shadow-[#9acd32]/20 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={activeSection === 'third' ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#a5ff2f] mb-4 flex items-center">
                <span className="mr-3 text-3xl">🤝</span>
                We're Here To Help
              </h2>
              <p className="text-gray-200 leading-relaxed">
                Your time is precious. Let our team of expert recruiters and co-pilots
                save you time finding talent, even managing your job if needed.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl text-center max-w-2xl mx-auto border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'third' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Create the future.
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-block px-8 py-3 text-xl font-bold text-[#a5ff2f] border-2 border-[#a5ff2f] rounded-full hover:bg-[#a5ff2f] hover:text-black hover:shadow-lg hover:shadow-[#9acd32]/40 transition-all duration-300"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="bg-black py-12 border-t border-[#a5ff2f]/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10 relative after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-[#a5ff2f] after:left-1/4 after:-bottom-2 after:hover:w-full after:hover:left-0 after:transition-all">
            As featured in
          </h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[
              { src: nyt, alt: "New York Times", height: 20 },
              { src: wsj, alt: "Wall Street Journal", height: 18 },
              { src: cnn, alt: "CNN", height: 20 },
              { src: bloomberg, alt: "Bloomberg", height: 20 },
              { src: yahoo, alt: "Yahoo Finance", height: 20 },
              { src: business, alt: "Business Insider", height: 13 },
              { src: forbes, alt: "Forbes", height: 20 }
            ].map((brand, index) => (
              <motion.div 
                key={index}
                className="filter grayscale hover:grayscale-0 transition-all"
                whileHover={{ scale: 1.2 }}
              >
                <img 
                  src={brand.src} 
                  alt={brand.alt} 
                  style={{ height: `${brand.height}px` }}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Home;