"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRef } from 'react';
import Crosshair from "@/src/components/Crosshair"
import Terminal from "@/src/components/terminal"
import AboutSection from "@/src/components/about-section"
import ProjectsSection from "@/src/components/projects-section"
import SkillsSection from "@/src/components/skills-section"
import ContactSection from "@/src/components/contact-section"
import BackgroundAnimations from "@/src/components/background-animations"

export default function Portfolio() {
   
  const [currentSection, setCurrentSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "TACTICAL NETWORK INTERFACE INITIALIZED",
    "Portfolio Systems: ACTIVE",
    "Interactive Interface: READY",
    "Welcome back, Operative.",
    "",
    'Type "sitrep" for mission status.',
  ])

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])


  
  // Memoized command handler for performance
  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim()

    switch (cmd) {
      case "sitrep":
      case "help":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "",
          "TACTICAL COMMAND INTERFACE",
          "═══════════════════════════════════",
          "  profile    - Operative dossier",
          "  missions   - Operation history",
          "  loadout    - Equipment & skills",
          "  comms      - Communication channel",
          "  linkedin   - Open LinkedIn profile",
          "  github     - Open GitHub repository",
          "  instagram  - Open Instagram profile",
          "  scan       - System scan",
          "  clear      - Clear terminal",
          "  recon      - Run reconnaissance scan",
          "",
          "Stay sharp, Operative.",
        ])
        break
      case "profile":
        setCurrentSection("about")
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Accessing operative file...",
          "CLASSIFIED PERSONNEL RECORD",
          "",
        ])
        break
      case "missions":
        setCurrentSection("projects")
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Loading mission database...",
          "Retrieving operation records...",
          "",
        ])
        break
      case "loadout":
        setCurrentSection("skills")
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Analyzing tactical capabilities...",
          "Equipment assessment in progress...",
          "",
        ])
        break
      case "comms":
        setCurrentSection("contact")
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Opening secure communication channel...",
          "Encryption protocols active...",
          "",
        ])
        break
      case "linkedin":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Opening secure LinkedIn connection...",
          "Redirecting to professional network...",
          "Connection established.",
          "",
        ])
        window.open("https://linkedin.com/in/imanpal-singh-170030306/", "_blank")
        break
      case "github":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Accessing GitHub repository...",
          "Loading security tools and research...",
          "Repository access granted.",
          "",
        ])
        window.open("https://github.com/iman158", "_blank")
        break
      case "instagram":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Opening Instagram profile...",
          "Loading security content and updates...",
          "Social media connection established.",
          "",
        ])
        window.open("https://instagram.com/imanpal_singh", "_blank")
        break
      case "scan":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Initiating system scan...",
          "Scanning portfolio components...",
          "All systems operational",
          "",
        ])
        break
      case "clear":
        setTerminalHistory([])
        break
      case "recon":
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Initiating reconnaissance protocol...",
          "Scanning target systems... [████████████████████] 100%",
          "Analysis complete",
          "No vulnerabilities detected in perimeter.",
          "Target maintains strong defensive posture.",
          "",
        ])
        break
      case "base":
      case "home":
        setCurrentSection("home")
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          "Returning to command center...",
          "Standing by for orders.",
          "",
        ])
        break
      default:
        setTerminalHistory((prev) => [
          ...prev,
          "> " + command,
          `Unknown command: ${command}`,
          'Type "sitrep" for available commands.',
          "Maintain operational security.",
          "",
        ])
    }
  }, [])

  // Memoized section title
  const sectionTitle = useMemo(() => {
    switch (currentSection) {
      case "home":
        return "TACTICAL OPERATIONS CENTER"
      case "about":
        return "OPERATIVE DOSSIER"
      case "projects":
        return "MISSION ARCHIVE"
      case "skills":
        return "EQUIPMENT LOADOUT"
      case "contact":
        return "TACTICAL COMMUNICATIONS"
      default:
        return "TACTICAL OPERATIONS CENTER"
    }
  }, [currentSection])
  const [dateTime, setDateTime] = useState("")
  useEffect(() => {
    const now = new Date().toLocaleString()
    setDateTime(now)
  }, [])
  return (
        <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Background Animations */}
       <div className="absolute inset-0 z-0"> {/* New wrapper div */}
      <BackgroundAnimations />
    </div>  
      

      {/* Header Bar - Responsive */}
      <div className="relative z-20 bg-gray-900 bg-opacity-90 border-b border-green-400 px-2 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-green-400 font-bold text-xs sm:text-sm">TACTICAL@OPERATIVE</div>
          <div className="text-green-300 text-xs hidden sm:block">
            {dateTime} | CLEARANCE: ALPHA | INTERFACE: ACTIVE
          </div>
          <div className="text-green-300 text-xs sm:hidden">ALPHA | ACTIVE</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-green-300 text-xs hidden md:block">SECTION: {currentSection.toUpperCase()}</div>

          {/* Header Social Links - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
        
              href="https://linkedin.com/in/imanpal-singh-170030306/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 sm:w-6 sm:h-6 border border-green-400 rounded flex items-center justify-center hover:bg-green-400 hover:text-black transition-all group"
              title="LinkedIn Profile"
            >
              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://github.com/iman158"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 sm:w-6 sm:h-6 border border-green-400 rounded flex items-center justify-center hover:bg-green-400 hover:text-black transition-all group"
              title="GitHub Repository"
            >
              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://instagram.com/imanpal_singh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 sm:w-6 sm:h-6 border border-green-400 rounded flex items-center justify-center hover:bg-green-400 hover:text-black transition-all group"
              title="Instagram Profile"
            >
              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs sm:text-sm">SECURE</span>
          </div>
        </div>
      </div>

      {/* Main Interface - Responsive Layout */}
      {isMobile ? (
        // Mobile Layout - Stacked
        <div className="relative z-10 flex-1 flex flex-col gap-2 p-2 overflow-y-auto">
          {/* Mobile Navigation */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded p-3 shadow-lg shadow-green-400/20">
            <div className="text-green-400 text-xs font-bold mb-2">NAVIGATION</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCommand("profile")}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  currentSection === "about"
                    ? "bg-green-400 text-black border-green-400"
                    : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                }`}
              >
                PROFILE
              </button>
              <button
                onClick={() => handleCommand("missions")}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  currentSection === "projects"
                    ? "bg-green-400 text-black border-green-400"
                    : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                }`}
              >
                MISSIONS
              </button>
              <button
                onClick={() => handleCommand("loadout")}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  currentSection === "skills"
                    ? "bg-green-400 text-black border-green-400"
                    : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                }`}
              >
                LOADOUT
              </button>
              <button
                onClick={() => handleCommand("comms")}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  currentSection === "contact"
                    ? "bg-green-400 text-black border-green-400"
                    : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                }`}
              >
                COMMS
              </button>
            </div>
          </div>

          {/* Mobile Main Content */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded flex-1 shadow-lg shadow-green-400/20">
            <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center justify-between">
              <span className="text-green-400 text-sm font-bold">{sectionTitle}</span>
              <div className="text-green-300 text-xs">MOBILE</div>
            </div>

            <div className="h-full overflow-hidden">
              {currentSection === "home" && (
                <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                  <div className="mb-6">
                    <h1 className="text-xl font-bold mb-4 text-green-400 animate-pulse">
                      {"TACTICAL CYBER OPERATIONS"}
                    </h1>
                    <div className="text-sm text-green-300 space-y-2">
                      <p>{"[OPERATIVE STATUS: ACTIVE]"}</p>
                      <p>{"[INTERFACE: ONLINE]"}</p>
                      <p>{"[SYSTEMS: READY]"}</p>
                    </div>
                  </div>

                  <div className="text-green-300 text-xs mb-4">{"Use navigation buttons to explore"}</div>

                  <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                    <button
                      onClick={() => handleCommand("profile")}
                      className="bg-transparent border border-green-400 text-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      {"PROFILE"}
                    </button>
                    <button
                      onClick={() => handleCommand("missions")}
                      className="bg-transparent border border-green-400 text-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      {"MISSIONS"}
                    </button>
                    <button
                      onClick={() => handleCommand("loadout")}
                      className="bg-transparent border border-green-400 text-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      {"LOADOUT"}
                    </button>
                    <button
                      onClick={() => handleCommand("comms")}
                      className="bg-transparent border border-green-400 text-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      {"COMMS"}
                    </button>
                  </div>
                </div>
              )}

              {currentSection === "about" && <AboutSection onCommand={handleCommand} />}
              {currentSection === "projects" && <ProjectsSection onCommand={handleCommand} />}
              {currentSection === "skills" && <SkillsSection onCommand={handleCommand} />}
              {currentSection === "contact" && <ContactSection onCommand={handleCommand} />}
            </div>
          </div>

          {/* Mobile Terminal */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded h-64 overflow-hidden shadow-lg shadow-green-400/20">
            <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="ml-2 text-green-400 text-xs">TACTICAL@operative:~$</span>
            </div>
            <Terminal history={terminalHistory} onCommand={handleCommand} />
          </div>
        </div>
      ) : (
        // Desktop Layout - Simplified Grid
        <div className="relative z-10 flex-1 grid grid-cols-12 gap-2 p-2">
          {/* Navigation Control Panel - Top Left */}
          <div className="col-span-9 row-span-1 max-h-32">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded h-full p-2 shadow-lg shadow-green-400/20">
              <div className="text-green-400 text-xs font-bold mb-1">NAVIGATION</div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleCommand("profile")}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    currentSection === "about"
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  }`}
                >
                  PROFILE
                </button>
                <button
                  onClick={() => handleCommand("missions")}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    currentSection === "projects"
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  }`}
                >
                  MISSIONS
                </button>
                <button
                  onClick={() => handleCommand("loadout")}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    currentSection === "skills"
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  }`}
                >
                  LOADOUT
                </button>
                <button
                  onClick={() => handleCommand("comms")}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    currentSection === "contact"
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  }`}
                >
                  COMMS
                </button>
              </div>
            </div>
          </div>

          {/* Status Panel - Top Right */}
          <div className="col-span-3 row-span-1 max-h-32">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded h-full p-2 shadow-lg shadow-green-400/20">
              <div className="text-green-400 text-xs font-bold mb-1">OPERATIONAL STATUS</div>
              <div className="space-y-0.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-green-300">READINESS:</span>
                  <span className="text-green-400">MAXIMUM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">SECURITY:</span>
                  <span className="text-green-400">ALPHA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">STATUS:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal - Bottom Left */}
          <div className="col-span-6 row-span-3">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded h-full overflow-hidden shadow-lg shadow-green-400/20">
              <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-green-400 text-sm">TACTICAL@operative:~$</span>
              </div>
              <Terminal history={terminalHistory} onCommand={handleCommand} />
            </div>
          </div>

          {/* Main Content Panel - Bottom Right */}
          <div className="col-span-6 row-span-3">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-green-400 rounded h-full shadow-lg shadow-green-400/20">
              <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center justify-between">
                <span className="text-green-400 text-sm font-bold">{sectionTitle}</span>
                <div className="text-green-300 text-xs">SECTION: {currentSection.toUpperCase()}</div>
              </div>

              <div className="h-full overflow-hidden">
                {currentSection === "home" && (
                  <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold mb-4 text-green-400 animate-pulse">
                        {"TACTICAL CYBER OPERATIONS"}
                      </h1>
                      <div className="text-lg text-green-300 space-y-2">
                        <p>{"[OPERATIVE STATUS: ACTIVE]"}</p>
                        <p>{"[INTERFACE: ONLINE]"}</p>
                        <p>{"[SYSTEMS: READY]"}</p>
                      </div>
                    </div>

                    <div className="text-green-300 text-sm mb-4">
                      {"Use navigation buttons or terminal commands to explore"}
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <button
                        onClick={() => handleCommand("profile")}
                        className="bg-transparent border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50"
                      >
                        {"PROFILE"}
                      </button>
                      <button
                        onClick={() => handleCommand("missions")}
                        className="bg-transparent border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50"
                      >
                        {"MISSIONS"}
                      </button>
                      <button
                        onClick={() => handleCommand("loadout")}
                        className="bg-transparent border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50"
                      >
                        {"LOADOUT"}
                      </button>
                      <button
                        onClick={() => handleCommand("comms")}
                        className="bg-transparent border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50"
                      >
                        {"COMMS"}
                      </button>
                    </div>
                  </div>
                )}

                {currentSection === "about" && <AboutSection onCommand={handleCommand} />}
                {currentSection === "projects" && <ProjectsSection onCommand={handleCommand} />}
                {currentSection === "skills" && <SkillsSection onCommand={handleCommand} />}
                {currentSection === "contact" && <ContactSection onCommand={handleCommand} />}
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  )
}
