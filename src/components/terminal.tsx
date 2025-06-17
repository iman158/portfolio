"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface TerminalProps {
  history: string[]
  onCommand: (command: string) => void
}

export default function Terminal({ history, onCommand }: TerminalProps) {
  const [input, setInput] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const interval = setInterval(() => {
    setShowCursor((prev) => {
      const newShowCursor = !prev; // Calculate the new value
      console.log("toggling cursor to:", newShowCursor); // Log the new value
      return newShowCursor; // Return the new value to update state
    });
  }, 500);
  return () => clearInterval(interval);
}, []);
  

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const commands = ["sitrep", "profile", "missions", "loadout", "comms", "clear", "recon", "base"]
      const matches = commands.filter((cmd) => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <div className="h-full flex flex-col ">
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-green-400">
        <div className="flex items-center">
          <span className="text-green-400 mr-2">TACTICAL@operative:~$</span>
        <input
  ref={inputRef}
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={handleKeyDown}
  className="flex-1 text-green-400 terminal-input-reset"
  autoFocus
/>
         <span className="ml-1 terminal-cursor-animated">█</span> {/* Use the animated class directly */}
        </div>
      </form>
    </div> 
  )
}
