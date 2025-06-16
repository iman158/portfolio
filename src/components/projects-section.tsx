"use client"

import { useState } from "react"

interface ProjectsSectionProps {
  onCommand: (command: string) => void
}

export default function ProjectsSection({ onCommand }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      name: "Live Keylogger",
      type: "Offensive Security Tool",
      description:
        "Advanced keylogger with mail service integration to monitor keystrokes on a target system. Designed for security testing and educational purposes to demonstrate keystroke monitoring vulnerabilities. Features email-based exfiltration of captured data.",
      tech: ["Python", "SMTP", "Windows API", "Keyboard Hooks"],
      status: "COMPLETED",
      priority: "HIGH",
      github: "https://github.com/iman158/Live_keylogger",
    },
    {
      id: 2,
      name: "Python Web Scraping Script",
      type: "Automation Tool",
      description:
        "Specialized web scraping tool for extracting structured data from websites. Implements advanced parsing techniques to navigate complex DOM structures and extract targeted information. Includes data cleaning and export functionality.",
      tech: ["Python", "BeautifulSoup", "Requests", "Pandas"],
      status: "OPERATIONAL",
      priority: "MEDIUM",
      github: "https://github.com/iman158/Python-Web-Scraping-Script",
    },
    {
      id: 3,
      name: "Malware Analysis Framework",
      type: "Security Research",
      description:
        "Custom framework for analyzing malicious software in a controlled environment. Features static and dynamic analysis capabilities, sandbox integration, and automated reporting. Designed for educational purposes to understand malware behavior.",
      tech: ["Python", "Assembly", "Docker", "Yara Rules"],
      status: "IN_DEVELOPMENT",
      priority: "HIGH",
      github: "https://github.com/iman158",
    },
    {
      id: 4,
      name: "Network Packet Analyzer",
      type: "Network Security",
      description:
        "Tool for capturing and analyzing network traffic to identify security vulnerabilities and suspicious patterns. Implements deep packet inspection and protocol analysis to detect anomalies in network communications.",
      tech: ["Python", "Scapy", "Wireshark API", "TCP/IP"],
      status: "OPERATIONAL",
      priority: "MEDIUM",
      github: "https://github.com/iman158",
    },
    {
      id: 5,
      name: "Reverse Engineering Toolkit",
      type: "Binary Analysis",
      description:
        "Collection of custom tools for reverse engineering binary applications and firmware. Includes disassemblers, decompilers, and binary patching utilities designed to analyze software security and identify vulnerabilities.",
      tech: ["Python", "C/C++", "Assembly", "Radare2 API"],
      status: "IN_DEVELOPMENT",
      priority: "CRITICAL",
      github: "https://github.com/iman158",
    },
  ]

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4 text-green-300 text-xs">
        {"[ACCESSING PROJECT DATABASE...]"}
        <br />
        {"[FOUND " + projects.length + " SECURITY PROJECTS]"}
        <br />
        {"[CLEARANCE VERIFIED: ALPHA LEVEL]"}
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`border border-green-400 rounded p-3 cursor-pointer transition-all duration-300 ${
              selectedProject === project.id ? "bg-green-400 bg-opacity-10" : "hover:bg-green-400 hover:bg-opacity-5"
            }`}
            onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-green-400 font-bold text-sm">{project.name}</h3>
              <div className="flex gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === "COMPLETED"
                      ? "bg-green-600"
                      : project.status === "OPERATIONAL"
                        ? "bg-yellow-600"
                        : "bg-blue-600"
                  } text-black`}
                >
                  {project.status}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.priority === "CRITICAL"
                      ? "bg-red-600"
                      : project.priority === "HIGH"
                        ? "bg-orange-600"
                        : "bg-yellow-600"
                  } text-black`}
                >
                  {project.priority}
                </span>
              </div>
            </div>

            <p className="text-green-300 text-xs mb-2">{project.type}</p>

            {selectedProject === project.id && (
              <div className="mt-3 space-y-2 border-t border-green-400 pt-3">
                <p className="text-green-300 text-xs">{project.description}</p>

                <div>
                  <h4 className="text-green-400 font-bold text-xs mb-1">{"TECHNOLOGIES UTILIZED:"}</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="text-xs bg-green-400 text-black px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-400 border border-green-400 px-2 py-1 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {"[VIEW_CODE]"}
                  </a>
                  <button className="text-green-400 border border-green-400 px-2 py-1 rounded text-xs hover:bg-green-400 hover:text-black transition-colors">
                    {"[TECHNICAL_DETAILS]"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
