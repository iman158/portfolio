"use client"

import { useState, useEffect } from "react"

export default function FloatingTerminal() {
  const [logs, setLogs] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const securityLogs = [
    "[RECON] Satellite surveillance active...",
    "[SCAN] Monitoring tactical frequencies...",
    "[OK] No hostile contacts detected",
    "[INFO] Perimeter security: SECURED",
    "[SCAN] Analyzing network traffic...",
    "[OK] All systems operational",
    "[INFO] Counter-surveillance: ACTIVE",
    "[SCAN] Threat assessment in progress...",
    "[OK] Mission parameters verified",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = securityLogs[Math.floor(Math.random() * securityLogs.length)]
      const timestamp = new Date().toLocaleTimeString()

      setLogs((prev) => {
        const newLogs = [...prev, `${timestamp} ${randomLog}`]
        return newLogs.slice(-5) // Keep only last 5 logs
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-900 border border-green-400 rounded-lg shadow-lg shadow-green-400/20 z-50">
      <div className="bg-gray-800 px-3 py-2 border-b border-green-400 flex items-center justify-between">
        <span className="text-green-400 text-xs font-bold">TACTICAL_MONITOR.EXE</span>
        <button onClick={() => setIsVisible(false)} className="text-green-400 hover:text-green-300 text-xs">
          ✕
        </button>
      </div>

      <div className="p-3 h-32 overflow-y-auto text-xs font-mono">
        {logs.map((log, index) => (
          <div key={index} className="text-green-300 mb-1">
            {log}
          </div>
        ))}
        <div className="text-green-400 animate-pulse">█</div>
      </div>
    </div>
  )
}
