// Responsive Design Testing Script
console.log("📱 Starting Responsive Design Tests...\n")

// Test 1: Viewport Detection
console.log("🖥️ Test 1: Viewport Detection")
const viewport = {
  width: window.innerWidth,
  height: window.innerHeight,
  ratio: window.devicePixelRatio || 1,
  orientation: window.innerWidth > window.innerHeight ? "landscape" : "portrait",
}

console.log(`Current Viewport: ${viewport.width}x${viewport.height}`)
console.log(`Device Pixel Ratio: ${viewport.ratio}`)
console.log(`Orientation: ${viewport.orientation}`)

// Test 2: Breakpoint Testing
console.log("\n📐 Test 2: Breakpoint Analysis")
const breakpoints = {
  xs: { min: 0, max: 479, name: "Extra Small (Mobile)" },
  sm: { min: 480, max: 767, name: "Small (Mobile)" },
  md: { min: 768, max: 1023, name: "Medium (Tablet)" },
  lg: { min: 1024, max: 1279, name: "Large (Desktop)" },
  xl: { min: 1280, max: 1535, name: "Extra Large (Desktop)" },
  "2xl": { min: 1536, max: Number.POSITIVE_INFINITY, name: "2X Large (Wide Desktop)" },
}

let currentBreakpoint = ""
Object.entries(breakpoints).forEach(([key, bp]) => {
  const isActive = viewport.width >= bp.min && viewport.width <= bp.max
  const status = isActive ? "✅ ACTIVE" : "⚪"
  console.log(
    `${status} ${key.toUpperCase()}: ${bp.name} (${bp.min}px - ${bp.max === Number.POSITIVE_INFINITY ? "∞" : bp.max + "px"})`,
  )
  if (isActive) currentBreakpoint = key
})

// Test 3: Touch Device Detection
console.log("\n👆 Test 3: Touch Device Detection")
const touchSupport = {
  hasTouch: "ontouchstart" in window,
  maxTouchPoints: navigator.maxTouchPoints || 0,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
}

console.log(`Touch Support: ${touchSupport.hasTouch ? "✅ Yes" : "❌ No"}`)
console.log(`Max Touch Points: ${touchSupport.maxTouchPoints}`)
console.log(`Mobile Device: ${touchSupport.isMobile ? "✅ Yes" : "❌ No"}`)
console.log(`Tablet Device: ${touchSupport.isTablet ? "✅ Yes" : "❌ No"}`)

// Test 4: CSS Media Query Testing
console.log("\n🎨 Test 4: CSS Media Query Testing")
const mediaQueries = [
  "(max-width: 767px)",
  "(min-width: 768px) and (max-width: 1023px)",
  "(min-width: 1024px)",
  "(orientation: portrait)",
  "(orientation: landscape)",
  "(prefers-reduced-motion: reduce)",
  "(prefers-color-scheme: dark)",
]

mediaQueries.forEach((query) => {
  const matches = window.matchMedia(query).matches
  const status = matches ? "✅" : "❌"
  console.log(`${status} ${query}`)
})

// Test 5: Layout Shift Detection
console.log("\n📏 Test 5: Layout Stability Test")
let layoutShifts = 0
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === "layout-shift" && !entry.hadRecentInput) {
      layoutShifts += entry.value
    }
  }
})

try {
  observer.observe({ entryTypes: ["layout-shift"] })
  setTimeout(() => {
    observer.disconnect()
    const clsStatus = layoutShifts < 0.1 ? "✅" : layoutShifts < 0.25 ? "⚠️" : "❌"
    console.log(`${clsStatus} Cumulative Layout Shift: ${layoutShifts.toFixed(4)}`)
  }, 3000)
} catch (e) {
  console.log("⚠️ Layout Shift API not supported")
}

// Test 6: Responsive Image Testing
console.log("\n🖼️ Test 6: Responsive Image Support")
const imageFormats = ["webp", "avif", "jpeg", "png"]
imageFormats.forEach((format) => {
  const canvas = document.createElement("canvas")
  const supported = canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0
  const status = supported ? "✅" : "❌"
  console.log(`${status} ${format.toUpperCase()} Support`)
})

// Test 7: Accessibility Features
console.log("\n♿ Test 7: Accessibility Features")
const a11yFeatures = {
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  highContrast: window.matchMedia("(prefers-contrast: high)").matches,
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  screenReader: navigator.userAgent.includes("NVDA") || navigator.userAgent.includes("JAWS"),
}

Object.entries(a11yFeatures).forEach(([feature, enabled]) => {
  const status = enabled ? "✅ Enabled" : "⚪ Disabled"
  console.log(`${status} ${feature.replace(/([A-Z])/g, " $1").toLowerCase()}`)
})

// Test 8: Performance on Current Device
console.log("\n⚡ Test 8: Device Performance Analysis")
const performanceScore = {
  cores: navigator.hardwareConcurrency || 2,
  memory: navigator.deviceMemory || 4,
  connection: navigator.connection?.effectiveType || "4g",
}

let deviceScore = 0
if (performanceScore.cores >= 4) deviceScore += 25
else if (performanceScore.cores >= 2) deviceScore += 15

if (performanceScore.memory >= 8) deviceScore += 25
else if (performanceScore.memory >= 4) deviceScore += 15

if (performanceScore.connection === "4g") deviceScore += 25
else if (performanceScore.connection === "3g") deviceScore += 15

deviceScore += viewport.width >= 1024 ? 25 : viewport.width >= 768 ? 15 : 10

const scoreStatus =
  deviceScore >= 80 ? "✅ Excellent" : deviceScore >= 60 ? "⚠️ Good" : deviceScore >= 40 ? "⚠️ Fair" : "❌ Poor"

console.log(`Device Performance Score: ${deviceScore}/100 (${scoreStatus})`)

// Final Recommendations
console.log("\n🎯 Responsive Design Recommendations")
console.log("=====================================")

if (currentBreakpoint === "xs" || currentBreakpoint === "sm") {
  console.log("📱 Mobile Optimizations:")
  console.log("• Use larger touch targets (44px minimum)")
  console.log("• Implement swipe gestures")
  console.log("• Optimize for one-handed use")
  console.log("• Reduce animation complexity")
}

if (touchSupport.hasTouch) {
  console.log("👆 Touch Optimizations:")
  console.log("• Remove hover states on touch devices")
  console.log("• Implement touch feedback")
  console.log("• Use appropriate touch gestures")
}

if (deviceScore < 60) {
  console.log("⚡ Performance Optimizations:")
  console.log("• Reduce animation complexity")
  console.log("• Implement lazy loading")
  console.log("• Use smaller image sizes")
  console.log("• Enable performance mode")
}

console.log("\n✅ Responsive testing complete!")
