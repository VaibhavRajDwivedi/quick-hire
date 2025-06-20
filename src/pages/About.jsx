import { useState, useEffect } from "react";
import teamLogo from "../assets/images/team/teamLogo.jpg";
import manas from "../assets/images/team/Manas.jpg";
import ayush from "../assets/images/team/Ayush.jpg";
import vaibhav from "../assets/images/team/Vaibhav.jpg";
import piyush from "../assets/images/team/Piyush.jpg";
import ankit from "../assets/images/team/Ankit.jpg";
import parth from "../assets/images/team/Parth.jpg";
import ritvika from "../assets/images/team/Ritvika.jpg";
import lavanya from "../assets/images/team/Lavanya.jpg";
import linkedinIcon from "../assets/images/team/download.png";
import whatsappIcon from "../assets/images/team/whatsapp.webp";

export default function About() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animatedMembers, setAnimatedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const teamMembers = [
    { name: "Manas", role: "Project Lead…", image: manas, linkedin: "https://in.linkedin.com/in/manas-sharma-715840322", whatsapp: "+91 9876543210", category: "leadership" },
    { name: "Ayush", role: "Content Writer…", image: ayush, linkedin: "https://www.linkedin.com/in/ayush-tilekar-a0a14a324/", whatsapp: "+91 1234567890", category: "content" },
    { name: "Vaibhav", role: "Created About Us…", image: vaibhav, linkedin: "https://www.linkedin.com/in/vaibhav-raj-dwivedi-38aba8317/", whatsapp: "+91 9988776655", category: "development" },
    { name: "Piyush", role: "Contributed to the Body…", image: piyush, linkedin: "https://www.linkedin.com/in/piyush-kumar-799014326/", whatsapp: "+91 1122334455", category: "design" },
    { name: "Ankit", role: "Designer…", image: ankit, linkedin: "https://www.linkedin.com/in/ankit-singh-5738b9328/", whatsapp: "+91 5544332211", category: "design" },
    { name: "Parth", role: "Coordinator…", image: parth, linkedin: "https://www.linkedin.com/in/parth-vijay-0a9427326/", whatsapp: "+91 6677889900", category: "leadership" },
    { name: "Ritvika", role: "Contributed to Footer", image: ritvika, linkedin: "https://www.linkedin.com/in/ritvika-singh-arya-374690330/", whatsapp: "+91 8877665544", category: "development" },
    { name: "Lavanya", role: "Contributed to Footer", image: lavanya, linkedin: "https://www.linkedin.com/in/lavanya-nagar-930491325/", whatsapp: "+91 7766554433", category: "development" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setAnimatedMembers(teamMembers);
    }, 1000);
  }, []);

  

  return (
    <div className="mt-15 bg-gradient-to-b from-green-950 via-yello-100 to-black min-h-screen p-8 overflow-x-hidden font-sans text-white">
      {/* Header */}
      <header className="flex justify-center py-8 mb-8">
        <div className="flex flex-col items-center">
          <img
            src={teamLogo}
            alt="Team Logo"
            className="w-36 h-36 rounded-full shadow-lg transition-transform duration-500 hover:scale-110 hover:shadow-xl animate-bounce"
          />
          <h1 className="mt-4 text-5xl text-green-400 font-bold animate-fadeInUp">CODE COLLAB</h1>
        </div>
      </header>

      {/* Description & Filters */}
      <div className="bg-black/20 rounded-xl shadow-md mx-auto max-w-3xl text-center p-8 transition-transform hover:-translate-y-1">
        <p className="text-lg mb-6">We are a dedicated team working on this project. Here is more about us.</p>
        {/* <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border-2 border-green-400 bg-black/30 text-white placeholder-white/70 focus:outline-none focus:border-green-600"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {["all", "leadership", "development", "design", "content"].map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-4 py-2 rounded-full border-2 transition ${
                  activeFilter === f
                    ? "bg-green-400 text-black border-green-600"
                    : "bg-black/30 text-white border-green-400 hover:bg-green-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div> */}
      </div>

      {/* Team Grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center py-16">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading team members...</p>
          </div>
        ) : animatedMembers.length === 0 ? (
          <div className="col-span-full text-center py-16 text-lg">No team members found.</div>
        ) : (
          animatedMembers.map((m, i) => (
            <div
              key={i}
              className="bg-black/30 rounded-xl p-6 shadow-md transform transition hover:-translate-y-2 hover:shadow-lg animate-fadeIn"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-4">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform hover:scale-110" />
                <div className="absolute bottom-0 w-full h-0 bg-green-400 bg-opacity-70 flex items-center justify-center overflow-hidden transition-all duration-500 hover:h-12">
                  <span className="text-white text-sm font-bold uppercase">{m.category}</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400 mb-2">{m.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{m.role}</p>
              <div className="flex justify-center items-center gap-4">
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 rounded-full" />
                </a>
                <div className="relative group">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8 rounded-full hover:opacity-75 transition" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black bg-opacity-80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.whatsapp}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Details */}
      <div className="bg-black/30 rounded-xl shadow-md max-w-4xl mx-auto p-8 mt-16">
        <h2 className="text-center text-3xl text-green-400 underline animate-slideIn">About Our Project</h2>
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <p className="flex-1 text-gray-200 leading-relaxed">
            <span className="font-bold text-green-400">QuickHire</span> is an online platform that connects freelancers with clients looking for specific projects to be completed. Clients post jobs or projects, and freelancers bid on these projects, offering their services at competitive rates. The platform covers a wide range of categories, such as web development, graphic design, writing, marketing, and more.
            <br /><br />
            <span className="font-bold text-green-400">QuickHire</span> facilitates project management, payments, and communication between both parties, charging a fee or commission for its services. It's popular for short-term, remote, and freelance work opportunities.
          </p>
          <div className="flex flex-wrap justify-center flex-1 gap-6 text-center">
            {[
              { num: "60M+", label: "Freelancers" },
              { num: "80%", label: "Bids in 60s" },
              { num: "90%", label: "Cost Saving" },
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center bg-black/20 rounded-lg p-4 min-w-[120px] transition hover:-translate-y-1">
                <span className="text-3xl font-bold text-green-400">{s.num}</span>
                <span className="text-gray-300 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-400 mt-8">&copy; CODE COLLAB</p>
      </div>
    </div>
  );
}
