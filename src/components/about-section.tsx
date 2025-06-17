"use client"

import { useEffect, useState } from "react"

interface AboutSectionProps {
  onCommand: (command: string) => void
}

export default function AboutSection({ onCommand }: AboutSectionProps) {
  const [displayText, setDisplayText] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const fullText = `
PROFESSIONAL PROFILE - SECURITY CLEARANCE: CONFIDENTIAL
===============================================

Name: Imanpal Singh
Position: Cybersecurity Student & Researcher
Location: Remote
Focus: Security Operations, Bypass and Reveerse Engineering

PROFESSIONAL BACKGROUND:
Cybersecurity enthusiast and electronics student focusing on offensive 
development, reverse engineering, and electronic tech. Currently building 
practical experience through various projects while pursuing undergraduate 
studies. Passionate about malware analysis and reverse engineering.

CORE COMPETENCIES:
• Offensive Security & Penetration Testing
• Reverse Engineering & Malware Analysis
• Web Application Security
• Python Development & Automation
• Network Security Assessment
• Electronic Hardware Security

CERTIFICATIONS IN PROGRESS:
• Google Cyber Security Certificate

EDUCATION:
• Currently pursuing undergraduate degree
• Self-directed cybersecurity training
• Continuous practical project development
`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    let index = 0
    const speed = isMobile ? 10 : 20 // Faster on mobile for better UX
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [fullText, isMobile])

  return (
    <div className="p-2 sm:p-4 h-full overflow-y-auto">
      <div className="bg-black p-2 sm:p-4 rounded border border-green-400 font-mono text-xs mb-4">
        <pre className="whitespace-pre-wrap text-green-300 text-xs sm:text-sm">
          {displayText}
          <span className="animate-pulse">█</span>
        </pre>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border border-green-400 p-3 rounded">
          <h3 className="text-green-400 font-bold mb-2 text-sm">{"PROFESSIONAL FOCUS"}</h3>
          <div className="text-green-300 text-xs space-y-1">
            <p>{"• Offensive Security Development"}</p>
            <p>{"• Reverse Engineering"}</p>
            <p>{"• Malware Analysis"}</p>
            <p>{"• Electronic Hardware Security"}</p>
          </div>
        </div>

        <div className="border border-green-400 p-3 rounded">
          <h3 className="text-green-400 font-bold mb-2 text-sm">{"CURRENT STATUS"}</h3>
          <div className="text-green-300 text-xs space-y-1">
            <p>{"• Undergraduate Student"}</p>
            <p>{"• Building Practical Experience"}</p>
            <p>{"• Pursuing Security Certifications"}</p>
            <p>{"• Developing Security Tools"}</p>
          </div>
        </div>

        <div className="border border-green-400 p-3 rounded">
          <h3 className="text-green-400 font-bold mb-2 text-sm">{"PERSONAL INTERESTS"}</h3>
          <div className="text-green-300 text-xs space-y-1">
            <p>{"• Cybersecurity Research & Development"}</p>
            <p>{"• Chess Strategy & Competitions"}</p>
            <p>{"• Electronic Hardware Tinkering"}</p>
            <p>{"• Collecting Security Certifications"}</p>
          </div>
        </div>

        {/* Professional Links Section - Responsive */}
        <div className="border border-green-400 p-3 rounded">
          <h3 className="text-green-400 font-bold mb-3 text-sm">{"PROFESSIONAL NETWORKS"}</h3>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href="https://linkedin.com/in/iman158"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-300 hover:text-green-400 transition-colors group"
            >
              <div className="w-8 h-8 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-400 group-hover:text-black"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold">LinkedIn</div>
                <div className="text-xs">Professional Network</div>
              </div>
            </a>

            <a
              href="https://github.com/iman158"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-300 hover:text-green-400 transition-colors group"
            >
              <div className="w-8 h-8 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-400 group-hover:text-black"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold">GitHub</div>
                <div className="text-xs">Security Tools & Research</div>
              </div>
            </a>

            <a
              href="https://instagram.com/iman158_security"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-300 hover:text-green-400 transition-colors group"
            >
              <div className="w-8 h-8 border border-green-400 rounded flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-400 group-hover:text-black"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold">Instagram</div>
                <div className="text-xs">Security Content & Updates</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
