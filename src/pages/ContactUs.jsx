"use client";

import { useState } from "react";
import Footer from "../components/Footer";

function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setFormSubmitted(true);

      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start p-8 mt-4">
        <div className="flex flex-col gap-6 justify-center h-full">
          <div className="bg-black/70 border border-white/10 rounded-xl p-6 shadow-lg text-center">
            <i className="bx bx-envelope text-4xl text-lime-400 mb-2" />
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p className="text-gray-300">contact@example.com</p>
          </div>

          <div className="bg-black/70 border border-white/10 rounded-xl p-6 shadow-lg text-center">
            <i className="bx bx-phone-call text-4xl text-lime-400 mb-2" />
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p className="text-gray-300">+91 98765 43210</p>
          </div>

          <div className="bg-black/70 border border-white/10 rounded-xl p-6 shadow-lg text-center">
            <i className="bx bx-map text-4xl text-lime-400 mb-2" />
            <h3 className="text-xl font-semibold mb-1">Address</h3>
            <p className="text-gray-300">Bangalore, Karnataka, India</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">Send Us a Message</h2>
          <p className="text-gray-300 mb-6">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          {formSubmitted ? (
            <div className="text-center py-12">
              <i className="bx bx-check-circle text-5xl text-lime-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-300">
                Thank you for contacting us. We'll respond to your inquiry shortly.
              </p>
            </div>
          ) : (
            <>
              {error && <p className="text-red-400 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-md text-white focus:outline-none focus:border-lime-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-md text-white focus:outline-none focus:border-lime-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-md text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-md text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <i className="bx bx-send text-xl" />
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default ContactUs;
