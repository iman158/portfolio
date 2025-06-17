
"use client"

import { useEffect, useState } from "react"

interface SkillsSectionProps {
  onCommand: (command: string) => void
}

interface Skill {
  category: string
  level: number
  tools: string[]
  description: string
  icon: string
}

interface Certification {
  name: string
  status: "completed" | "in-progress" | "planned"
  provider: string
  description: string
  progress?: number
}

export default function SkillsSection({ onCommand }: SkillsSectionProps) {
  const [scanProgress, setScanProgress] = useState(0)
  const [showSkills, setShowSkills] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
  const [selectedCert, setSelectedCert] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const skills: Skill[] = [
    {
      category: "Programming Languages",
      level: 90,
      tools: ["Python", "JavaScript", "C/C++", "HTML/CSS", "Bash/Shell", "PowerShell"],
      description: "Proficient in multiple programming languages for security tool development and automation.",
      icon: "💻",
    },
    {
      category: "Offensive Security",
      level: 85,
      tools: [
        "Penetration Testing",
        "Exploit Development",
        "Vulnerability Assessment",
        "Social Engineering",
        "Red Team Operations",
      ],
      description: "Specialized in offensive security techniques and ethical hacking methodologies.",
      icon: "🔴",
    },
    {
      category: "Reverse Engineering",
      level: 80,
      tools: ["Binary Analysis", "Disassembly", "Debugging", "Malware Analysis", "Static Analysis", "Dynamic Analysis"],
      description: "Expert in analyzing and understanding malicious software and binary applications.",
      icon: "🔍",
    },
    {
      category: "Web Technologies",
      level: 88,
      tools: ["React", "Node.js", "Flask", "Web Scraping", "API Security", "OWASP Top 10"],
      description: "Full-stack web development with focus on security implementation and testing.",
      icon: "🌐",
    },
    {
      category: "DevOps & Tools",
      level: 75,
      tools: ["Git", "Docker", "CI/CD", "Linux", "Kali Linux", "Metasploit", "Burp Suite", "Wireshark"],
      description: "Proficient in development operations and security testing tools.",
      icon: "🛠️",
    },
    {
      category: "Hardware Security",
      level: 70,
      tools: ["Raspberry Pi", "Arduino", "Electronic Circuits", "IoT Security", "Hardware Hacking", "RFID/NFC"],
      description: "Understanding of hardware-level security and electronic system vulnerabilities.",
      icon: "🔧",
    },
    {
      category: "Network Security",
      level: 82,
      tools: [
        "Network Analysis",
        "Firewall Configuration",
        "VPN Setup",
        "IDS/IPS",
        "Network Monitoring",
        "Packet Analysis",
      ],
      description: "Comprehensive knowledge of network security protocols and monitoring systems.",
      icon: "🌐",
    },
    {
      category: "Cryptography",
      level: 78,
      tools: ["Encryption/Decryption", "Hash Functions", "Digital Signatures", "PKI", "Cryptanalysis", "Steganography"],
      description: "Strong foundation in cryptographic principles and implementation.",
      icon: "🔐",
    },
  ]

  const certifications: Certification[] = [
    {
      name: "Google Cyber Security Certificate",
      status: "in-progress",
      provider: "Google",
      description:
        "Comprehensive cybersecurity fundamentals covering threat detection, incident response, and security operations.",
      progress: 75,
    },
    {
      name: "eJPT - eLearnSecurity Junior Penetration Tester",
      status: "in-progress",
      provider: "eLearnSecurity",
      description: "Entry-level penetration testing certification focusing on practical hands-on skills.",
      progress: 60,
    },
    {
      name: "eCPPT - eLearnSecurity Certified Professional Penetration Tester",
      status: "planned",
      provider: "eLearnSecurity",
      description: "Advanced penetration testing certification with focus on professional methodologies.",
    },
    {
      name: "eCPTX - eLearnSecurity Certified Penetration Tester eXtreme",
      status: "planned",
      provider: "eLearnSecurity",
      description: "Expert-level penetration testing certification for advanced security professionals.",
    },
    {
      name: "OSCP - Offensive Security Certified Professional",
      status: "planned",
      provider: "Offensive Security",
      description: "Industry-standard penetration testing certification requiring hands-on exploitation skills.",
    },
    {
      name: "CEH - Certified Ethical Hacker",
      status: "planned",
      provider: "EC-Council",
      description: "Comprehensive ethical hacking certification covering various attack vectors and countermeasures.",
    },
  ]

  // Scanning animation effect
  useEffect(() => {
    const timer = setInterval(
      () => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setShowSkills(true)
            clearInterval(timer)
            return 100
          }
          return prev + (isMobile ? 4 : 2) // Faster on mobile
        })
      },
      isMobile ? 25 : 50,
    )

    return () => clearInterval(timer)
  }, [isMobile])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400"
      case "in-progress":
        return "text-yellow-400 bg-yellow-400"
      case "planned":
        return "text-blue-400 bg-blue-400"
      default:
        return "text-gray-400 bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "COMPLETED"
      case "in-progress":
        return "IN PROGRESS"
      case "planned":
        return "PLANNED"
      default:
        return "UNKNOWN"
    }
  }

  if (!showSkills) {
    return (
      <div className="p-2 sm:p-4 h-full overflow-y-auto">
        <div className="space-y-4">
          <div className="text-green-300 text-xs">
            {"[INITIATING SKILLS ASSESSMENT...]"}
            <br />
            {"[ANALYZING TECHNICAL CAPABILITIES...]"}
            <br />
            {"[SCANNING SECURITY EXPERTISE...]"}
            <br />
            {"[PROGRESS: " + scanProgress + "%]"}
          </div>

          <div className="w-full bg-gray-800 rounded-full h-4 border border-green-400 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full transition-all duration-100 flex items-center justify-center relative"
              style={{ width: `${scanProgress}%` }}
            >
              {scanProgress > 15 && (
                <span className="text-black text-xs font-bold absolute inset-0 flex items-center justify-center">
                  {scanProgress}%
                </span>
              )}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-green-300 opacity-75 animate-pulse"></div>
            </div>
          </div>

          <div className="text-green-300 text-xs space-y-1">
            <div className={scanProgress > 20 ? "text-green-400" : ""}>{"✓ Programming Languages Analyzed"}</div>
            <div className={scanProgress > 40 ? "text-green-400" : ""}>{"✓ Security Tools Catalogued"}</div>
            <div className={scanProgress > 60 ? "text-green-400" : ""}>{"✓ Certifications Verified"}</div>
            <div className={scanProgress > 80 ? "text-green-400" : ""}>{"✓ Technical Proficiency Assessed"}</div>
            <div className={scanProgress > 95 ? "text-green-400" : ""}>{"✓ Skills Database Updated"}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-2 sm:p-4 h-full overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-green-300 text-xs mb-4">
          {"[SKILLS ASSESSMENT COMPLETE]"}
          <br />
          {"[TECHNICAL CAPABILITY: ADVANCED]"}
          <br />
          {"[CERTIFICATION STATUS: IN PROGRESS]"}
          <br />
          {"[OPERATIONAL READINESS: 95%]"}
        </div>

        {/* Skills Grid */}
        <div className="space-y-3">
          <h3 className="text-green-400 font-bold text-sm border-b border-green-400 pb-1">
            {"TECHNICAL CAPABILITIES"}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                // Add 'group' class here
                className={`group border border-green-400 rounded p-3 cursor-pointer transition-all duration-300 ${
                  selectedSkill === index
                    ? "bg-green-400 bg-opacity-10 border-green-300"
                    : "hover:bg-green-400 hover:bg-opacity-5"
                }`}
                onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{skill.icon}</span>
                    {/* Apply hover/click effect to h4 */}
                    <h4
                      className={`font-bold text-sm ${
                        selectedSkill === index ? "text-black" : "text-green-300 group-hover:text-black"
                      }`}
                    >
                      {skill.category}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Level text also changes */}
                    <span
                      className={`text-xs ${
                        selectedSkill === index ? "text-black" : "text-green-300 group-hover:text-black"
                      }`}
                    >
                      {skill.level}%
                    </span>
                    <div className="w-16 bg-gray-800 rounded-full h-2 border border-green-400">
                      <div
                        className="bg-green-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>

                {selectedSkill === index && (
                  <div className="mt-3 space-y-2 border-t border-green-400 pt-3">
                    {/* Description text is always green-300 if not selected, and black if selected */}
                    <p
                      className={`text-xs ${selectedSkill === index ? "text-black" : "text-green-300"}`}
                    >
                      {skill.description}
                    </p>

                    <div>
                      <h5
                        className={`font-bold text-xs mb-1 ${
                          selectedSkill === index ? "text-black" : "text-green-400"
                        }`}
                      >
                        {"TOOLS & TECHNOLOGIES:"}
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {skill.tools.map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="text-xs bg-transparent border border-green-400 text-green-400 px-2 py-1 rounded hover:bg-green-400 hover:text-black transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-3">
          <h3 className="text-green-400 font-bold text-sm border-b border-green-400 pb-1">
            {"CERTIFICATIONS & TRAINING"}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                // Add 'group' class here
                className={`group border border-green-400 rounded p-3 cursor-pointer transition-all duration-300 ${
                  selectedCert === index
                    ? "bg-green-400 bg-opacity-10 border-green-300"
                    : "hover:bg-green-400 hover:bg-opacity-5"
                }`}
                onClick={() => setSelectedCert(selectedCert === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-2">
                  {/* Apply hover/click effect to h4 */}
                  <h4
                    className={`font-bold text-sm flex-1 ${
                      selectedCert === index ? "text-black" : "text-green-300 group-hover:text-black"
                    }`}
                  >
                    {cert.name}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded text-black ${getStatusColor(cert.status).split(" ")[1]}`}>
                    {getStatusText(cert.status)}
                  </span>
                </div>

                {/* Apply hover/click effect to provider text */}
                <div
                  className={`text-xs mb-2 ${
                    selectedCert === index ? "text-black" : "text-green-300 group-hover:text-black"
                  }`}
                >
                  {"Provider: " + cert.provider}
                </div>

                {cert.progress && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span
                        className={`${selectedCert === index ? "text-black" : "text-green-300"}`}
                      >
                        Progress
                      </span>
                      <span
                        className={`${selectedCert === index ? "text-black" : "text-green-400"}`}
                      >
                        {cert.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 border border-green-400">
                      <div
                        className="bg-yellow-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {selectedCert === index && (
                  <div className="mt-3 pt-3 border-t border-green-400">
                    <p className="text-green-300 text-xs">{cert.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Visualization */}
        <div className="border border-green-400 rounded p-3">
          <h3 className="text-green-400 font-bold text-sm mb-3">{"TECHNOLOGY STACK"}</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {/* Programming Languages */}
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                </svg>
              </div>
              <span className="text-green-300 text-xs text-center">Python</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                </svg>
              </div>
              <span className="text-green-300 text-xs text-center">JavaScript</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zM16.795 22.677c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 0 0 2.421-2.968l.135-.193.234-.02a23.63 23.63 0 0 0 3.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 0 1-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 0 1-3.234.501 24.674 24.674 0 0 1-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 0 0-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 0 0-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.824 6.855l-.134.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0 1 14.75 7.24zM7.206 22.677A2.38 2.38 0 0 1 6 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.291 2.429.496 3.785.609l.235.02.134.193a23.596 23.596 0 0 0 2.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.987.563 2.843-.305 4.8-2.208a24.998 24.998 0 0 1-2.052-2.545 24.976 24.976 0 0 1-3.233-.501zM12 16.878c-.823 0-1.669-.036-2.516-.106l-.235-.02-.135-.193a30.388 30.388 0 0 1-1.35-2.122 30.354 30.354 0 0 1-1.166-2.228l-.1-.213.1-.213a30.3 30.3 0 0 1 1.166-2.228c.414-.749.885-1.446 1.35-2.122l.135-.193.235-.02a29.785 29.785 0 0 1 5.033 0l.234.02.134.193a30.006 30.006 0 0 1 2.517 4.35l.101.213-.101.213a29.6 29.6 0 0 1-2.517 4.35l-.134.193-.234.02c-.847.07-1.694.106-2.517.106zm-2.197-1.084c1.48.111 2.914.111 4.395 0a29.006 29.006 0 0 0 2.196-3.798 28.585 28.585 0 0 0-2.197-3.798 29.031 29.031 0 0 0-4.394 0 28.477 28.477 0 0 0-2.197 3.798 29.114 29.114 0 0 0 2.197 3.798z" />
                </svg>
              </div>
              <span className="text-green-300 text-xs text-center">React</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="text-green-300 text-xs text-center">Git</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
                </svg>
              </div>
              <span className="text-green-300 text-xs text-center">Docker</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 border border-green-400 rounded flex items-center justify-center mb-1 group-hover:bg-green-400 group-hover:text-black transition-all">
                <span className="text-sm font-bold">🐧</span>
              </div>
              <span className="text-green-300 text-xs text-center">Linux</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-green-400 rounded p-3">
          <h3 className="text-green-400 font-bold text-sm mb-3">{"QUICK ACTIONS"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => onCommand("missions")}
              className="text-green-400 border border-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
            >
              {"[VIEW_PROJECTS]"}
            </button>
            <button
              onClick={() => onCommand("comms")}
              className="text-green-400 border border-green-400 px-3 py-2 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
            >
              {"[CONTACT_ME]"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}