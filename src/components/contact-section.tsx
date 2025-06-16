"use client"

import type React from "react"

import { useState } from "react"

interface ContactSectionProps {
  onCommand: (command: string) => void
}

export default function ContactSection({ onCommand }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4 text-green-300 text-xs">
        {"[ESTABLISHING SECURE COMMUNICATION CHANNEL...]"}
        <br />
        {"[ENCRYPTION: TLS 1.3 WITH AES-256-GCM]"}
        <br />
        {"[STATUS: SECURE CONNECTION ESTABLISHED]"}
      </div>

      {submitted ? (
        <div className="border border-green-400 rounded p-4 text-center">
          <div className="text-green-400 text-sm font-bold mb-2">{"[MESSAGE RECEIVED]"}</div>
          <div className="text-green-300 text-xs">
            {"Your message has been securely transmitted."}
            <br />
            {"Expected response time: 24-48 hours"}
            <br />
            {"Thank you for your professional inquiry."}
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-3 text-green-400 border border-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
          >
            {"[SEND_NEW_MESSAGE]"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-green-400 text-xs font-bold mb-1">{"FULL NAME:"}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-black border border-green-400 text-green-300 px-2 py-1 rounded focus:outline-none focus:border-green-300 font-mono text-xs"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block text-green-400 text-xs font-bold mb-1">{"EMAIL ADDRESS:"}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-black border border-green-400 text-green-300 px-2 py-1 rounded focus:outline-none focus:border-green-300 font-mono text-xs"
                placeholder="your.email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-400 text-xs font-bold mb-1">{"SUBJECT:"}</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-black border border-green-400 text-green-300 px-2 py-1 rounded focus:outline-none focus:border-green-300 font-mono text-xs"
              placeholder="Inquiry subject..."
            />
          </div>

          <div>
            <label className="block text-green-400 text-xs font-bold mb-1">{"MESSAGE:"}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full bg-black border border-green-400 text-green-300 px-2 py-1 rounded focus:outline-none focus:border-green-300 font-mono text-xs resize-none"
              placeholder="Enter your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-transparent border border-green-400 text-green-400 px-4 py-2 rounded font-bold text-xs hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "[SENDING...]" : "[SEND_SECURE_MESSAGE]"}
          </button>
        </form>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-green-400 rounded p-3">
          <h3 className="text-green-400 font-bold mb-2 text-xs">{"CONTACT INFORMATION"}</h3>
          <div className="text-green-300 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">📧</span>
              <span>john.doe@secureconsulting.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">📍</span>
              <span>Washington, D.C.</span>
            </div>
          </div>
        </div>

        <div className="border border-green-400 rounded p-3">
          <h3 className="text-green-400 font-bold mb-2 text-xs">{"AVAILABILITY"}</h3>
          <div className="text-green-300 text-xs space-y-1">
            <p>{"[STATUS] Available for consulting"}</p>
            <p>{"[LOCATION] Remote / On-site"}</p>
            <p>{"[RESPONSE] 24-48 hours"}</p>
          </div>
        </div>
      </div>

      {/* Professional Links Section */}
      <div className="mt-4 border border-green-400 rounded p-3">
        <h3 className="text-green-400 font-bold mb-3 text-xs">{"PROFESSIONAL NETWORKS"}</h3>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/johndoe-security"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-300 hover:text-green-400 transition-colors group"
          >
            <div className="w-6 h-6 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-400 group-hover:text-black"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span className="text-xs">LinkedIn Profile</span>
          </a>

          <a
            href="https://github.com/johndoe-security"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-300 hover:text-green-400 transition-colors group"
          >
            <div className="w-6 h-6 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-400 group-hover:text-black"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <span className="text-xs">GitHub Repository</span>
          </a>

          <a
            href="https://instagram.com/iman158_security"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-300 hover:text-green-400 transition-colors group"
          >
            <div className="w-6 h-6 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-400 group-hover:text-black"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="text-xs">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  )
}
