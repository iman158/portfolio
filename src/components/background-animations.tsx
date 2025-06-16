"use client"

import CyberGrid from "./cyber-grid"
import { useState, useEffect } from "react"

export default function BackgroundAnimations() {
  const [mounted, setMounted] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  // Performance detection and optimization
  useEffect(() => {
    setMounted(true)

    // Detect low performance devices
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
      const isSlowConnection =
        (navigator as any).connection && (navigator as any).connection.effectiveType === "slow-2g"

      setIsLowPerformance(isMobile || isLowMemory || isSlowConnection)
    }

    checkPerformance()
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <CyberGrid isLowPerformance={isLowPerformance} />
    </div>
  )
}
