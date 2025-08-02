// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// GSAP Registration
gsap.registerPlugin(ScrollTrigger)

// Global Variables
let isLoaded = false
let secretFactsVisible = false
let currentBottleIndex = 0
let current3DYear = "2024"

// Bottle data
const bottles = [
  { year: "1894", name: "Hutchinson Bottle", description: "The first Coca-Cola bottle with a wire stopper" },
  { year: "1915", name: "Contour Bottle", description: "The iconic shape that defined Coca-Cola" },
  { year: "1955", name: "King Size", description: "Larger size for sharing moments" },
  { year: "2024", name: "Sustainable Future", description: "Our commitment to sustainability and innovation" },
]

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Show loading screen
  showLoadingScreen()

  setTimeout(() => {
    hideLoadingScreen()
    isLoaded = true
    initializeAnimations()
    createParticles()
    createMapPins()
    createFooterFizz()
    setupScrollTriggers()
    startTypewriter()
    initializeBottleShowcase()
    initialize3DViewer()
  }, 2000)
})

// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  if (loadingScreen) {
    loadingScreen.style.display = "flex"
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  if (loadingScreen) {
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        loadingScreen.style.display = "none"
      },
    })
  }
}

// Main Animation Initialization
function initializeAnimations() {
  if (!isLoaded) return

  // Navigation entrance
  gsap.fromTo(
    "#navigation",
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "back.out(1.7)" },
  )

  // Hero animations timeline
  const heroTl = gsap.timeline()

  // Background can entrance
  heroTl.fromTo(
    "#backgroundCan",
    {
      scale: 0.3,
      rotation: -90,
      opacity: 0,
      y: 300,
      filter: "blur(10px)",
    },
    {
      scale: 1.2,
      rotation: 0,
      opacity: 0.8,
      y: 0,
      filter: "blur(0px)",
      duration: 3,
      ease: "elastic.out(1, 0.3)",
      delay: 0.2,
    },
  )

  // 3D Can entrance
  heroTl.fromTo(
    "#heroCan3D",
    { scale: 0, rotation: 360, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 2,
      ease: "elastic.out(1, 0.5)",
      delay: 1.2,
    },
    "-=2",
  )

  // Logo entrance with multiple layers
  heroTl.fromTo(
    "#heroLogo .logo-main",
    {
      scale: 0.3,
      opacity: 0,
      y: 200,
      rotationY: 180,
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 3,
      ease: "elastic.out(1, 0.5)",
      delay: 1,
    },
    "-=2",
  )

  // Description fade in
  heroTl.to(
    "#heroDescription",
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    },
    "-=1",
  )

  // CTA entrance
  heroTl.to(
    "#heroCTA",
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
    },
    "-=0.5",
  )

  // Start continuous animations after entrance
  setTimeout(() => {
    startContinuousAnimations()
  }, 4000)
}

// Continuous animations that run after entrance
function startContinuousAnimations() {
  // Background can floating animation
  gsap.to("#backgroundCan", {
    y: "+=30",
    rotation: "+=10",
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  })

  // Logo continuous glow animation
  gsap.to("#heroLogo .logo-main", {
    textShadow: "0 0 80px #fe0000, 0 0 160px #fe0000, 0 0 240px #fe0000",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  })

  // 3D can floating
  gsap.to("#heroCan3D", {
    y: "+=20",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  })

  // Floating cans animations
  gsap.to(".floating-can-1", {
    y: "+=25",
    rotation: "+=15",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  })

  gsap.to(".floating-can-2", {
    y: "+=20",
    rotation: "+=10",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    delay: 1,
  })

  gsap.to(".floating-can-3", {
    y: "+=30",
    rotation: "+=20",
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    delay: 2,
  })

  gsap.to(".floating-can-4", {
    y: "+=15",
    rotation: "+=8",
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    delay: 1.5,
  })
}

// Create fizz particles
function createParticles() {
  const container = document.getElementById("fizzParticles")
  if (!container) return

  // Clear existing particles
  container.innerHTML = ""

  // Create 50 fizz particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "fizz-particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 2 + "s"
    particle.style.animationDuration = Math.random() * 3 + 2 + "s"
    container.appendChild(particle)
  }
}

// Create sparkle particles for history section
function createSparkleParticles() {
  const container = document.getElementById("historySparkles")
  if (!container) return

  container.innerHTML = ""

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle-particle"
    sparkle.style.left = Math.random() * 100 + "%"
    sparkle.style.top = Math.random() * 100 + "%"
    sparkle.style.animationDelay = Math.random() * 3 + "s"
    sparkle.style.animationDuration = 1 + Math.random() + "s"
    container.appendChild(sparkle)
  }
}

// Create map pins
function createMapPins() {
  const container = document.getElementById("mapPins")
  if (!container) return

  container.innerHTML = ""

  // Create 12 random map pins
  for (let i = 0; i < 12; i++) {
    const pin = document.createElement("div")
    pin.className = "map-pin"
    pin.style.left = 20 + Math.random() * 60 + "%"
    pin.style.top = 20 + Math.random() * 60 + "%"
    container.appendChild(pin)

    // Animate pin entrance
    gsap.fromTo(
      pin,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: i * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#impact",
          start: "top 60%",
        },
      },
    )
  }
}

// Create footer fizz particles
function createFooterFizz() {
  const container = document.getElementById("footerFizz")
  if (!container) return

  container.innerHTML = ""

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "footer-fizz-particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.bottom = Math.random() * 100 + "px"
    particle.style.animationDelay = Math.random() * 3 + "s"
    particle.style.animationDuration = 1 + Math.random() + "s"
    container.appendChild(particle)
  }
}

// Setup scroll triggers for sections
function setupScrollTriggers() {
  // Timeline animations
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    const isEven = index % 2 === 0

    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: isEven ? -200 : 200,
        scale: 0.8,
        rotationY: isEven ? -45 : 45,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Glow effect on scroll
    gsap.to(item, {
      boxShadow: "0 0 30px #fe0000, 0 0 60px #fe0000, 0 0 90px #fe0000",
      duration: 0.5,
      scrollTrigger: {
        trigger: item,
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
      },
    })
  })

  // Timeline line animation
  gsap.fromTo(
    "#timelineLine",
    { height: "0%" },
    {
      height: "100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    },
  )

  // Global stats counter animation
  const statNumbers = document.querySelectorAll("#globalStats .stat-number")
  statNumbers.forEach((stat) => {
    const target = Number.parseFloat(stat.dataset.target)

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: target < 10 ? 0.1 : 1 },
            onUpdate: function () {
              const value = Number.parseFloat(this.targets()[0].textContent)
              if (target < 10) {
                stat.textContent = value.toFixed(1) + "B"
              } else {
                stat.textContent = Math.round(value) + (target >= 500 ? "+" : "+")
              }
            },
          },
        )
      },
    })
  })

  // Section fade-ins
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0.8, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// Typewriter effect for hero tagline
function startTypewriter() {
  const element = document.getElementById("typewriterText")
  const text = "Open Happiness"
  let index = 0

  element.textContent = ""

  function typeChar() {
    if (index < text.length) {
      element.textContent += text.charAt(index)
      index++
      setTimeout(typeChar, 150)
    }
  }

  // Start typewriter after delay
  setTimeout(typeChar, 3000)
}

// Toggle secret facts
function toggleSecretFacts() {
  const factsContainer = document.getElementById("secretFacts")
  const factBubbles = factsContainer.querySelectorAll(".fact-bubble")

  if (!secretFactsVisible) {
    factsContainer.classList.add("show")

    // Animate each fact bubble
    factBubbles.forEach((bubble, index) => {
      setTimeout(() => {
        bubble.classList.add("animate")
      }, index * 200)
    })

    secretFactsVisible = true
  } else {
    // Hide facts
    factBubbles.forEach((bubble, index) => {
      setTimeout(() => {
        bubble.classList.remove("animate")
      }, index * 100)
    })

    setTimeout(
      () => {
        factsContainer.classList.remove("show")
      },
      factBubbles.length * 100 + 300,
    )

    secretFactsVisible = false
  }
}

// Initialize bottle showcase
function initializeBottleShowcase() {
  const dotsContainer = document.getElementById("bottleDots")
  if (!dotsContainer) return

  // Create dots
  bottles.forEach((bottle, index) => {
    const dot = document.createElement("div")
    dot.className = `bottle-dot ${index === currentBottleIndex ? "active" : ""}`
    dot.onclick = () => showBottle(index)
    dotsContainer.appendChild(dot)
  })

  // Show initial bottle
  showBottle(currentBottleIndex)
}

// Show specific bottle in showcase
function showBottle(index) {
  if (index < 0 || index >= bottles.length) return

  currentBottleIndex = index
  const bottle = bottles[index]

  // Update showcase info
  const showcaseYear = document.querySelector(".showcase-year")
  const showcaseName = document.querySelector(".showcase-name")
  const showcaseDescription = document.querySelector(".showcase-description")

  if (showcaseYear) showcaseYear.textContent = bottle.year
  if (showcaseName) showcaseName.textContent = bottle.name
  if (showcaseDescription) showcaseDescription.textContent = bottle.description

  // Update dots
  const dots = document.querySelectorAll(".bottle-dot")
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })

  // Animate bottle change
  const showcaseBottle = document.getElementById("showcaseBottle")
  if (showcaseBottle) {
    gsap.fromTo(
      showcaseBottle,
      { scale: 0.8, rotation: -10, opacity: 0.5 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
    )
  }
}

// Bottle navigation functions
function nextBottle() {
  showBottle((currentBottleIndex + 1) % bottles.length)
}

function previousBottle() {
  showBottle((currentBottleIndex - 1 + bottles.length) % bottles.length)
}

// Initialize 3D viewer
function initialize3DViewer() {
  const eraButtons = document.querySelectorAll(".era-btn")

  eraButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const year = button.dataset.year
      select3DEra(year)
    })
  })

  // Initialize with default year
  select3DEra(current3DYear)
}

// Select 3D era
function select3DEra(year) {
  current3DYear = year

  // Update active button
  const eraButtons = document.querySelectorAll(".era-btn")
  eraButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.year === year)
  })

  // Update detail year
  const detailYear = document.getElementById("detailYear")
  if (detailYear) {
    detailYear.textContent = year
  }

  // Animate 3D model change
  const bottle3D = document.querySelector(".bottle-3d-model")
  if (bottle3D) {
    gsap.fromTo(
      bottle3D,
      { scale: 0.8, rotationY: 180, opacity: 0.5 },
      { scale: 1, rotationY: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
    )
  }
}

// 3D Viewer controls
function resetView() {
  const bottle3D = document.querySelector(".bottle-3d-model")
  if (bottle3D) {
    gsap.to(bottle3D, {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
  }
}

function zoomIn() {
  const bottle3D = document.querySelector(".bottle-3d-model")
  if (bottle3D) {
    gsap.to(bottle3D, {
      scale: "+=0.2",
      duration: 0.3,
      ease: "power2.out",
    })
  }
}

function zoomOut() {
  const bottle3D = document.querySelector(".bottle-3d-model")
  if (bottle3D) {
    gsap.to(bottle3D, {
      scale: "-=0.2",
      duration: 0.3,
      ease: "power2.out",
    })
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Navigation logo hover effects
document.addEventListener("DOMContentLoaded", () => {
  const navLogo = document.querySelector(".nav-logo")

  if (navLogo) {
    navLogo.addEventListener("mouseenter", function () {
      gsap.to(this, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" })
    })

    navLogo.addEventListener("mouseleave", function () {
      gsap.to(this, { scale: 1, duration: 0.3, ease: "back.out(1.7)" })
    })
  }
})

// 3D Model interaction
document.addEventListener("DOMContentLoaded", () => {
  const bottle3D = document.querySelector(".bottle-3d-model")
  let isDragging = false
  let startX = 0
  let startY = 0
  let currentRotationY = 0
  let currentRotationX = 0

  if (bottle3D) {
    bottle3D.addEventListener("mousedown", (e) => {
      isDragging = true
      startX = e.clientX
      startY = e.clientY
      bottle3D.style.cursor = "grabbing"
    })

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return

      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      currentRotationY += deltaX * 0.5
      currentRotationX -= deltaY * 0.5

      // Limit X rotation
      currentRotationX = Math.max(-30, Math.min(30, currentRotationX))

      bottle3D.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`

      startX = e.clientX
      startY = e.clientY
    })

    document.addEventListener("mouseup", () => {
      isDragging = false
      if (bottle3D) {
        bottle3D.style.cursor = "grab"
      }
    })

    // Touch events for mobile
    bottle3D.addEventListener("touchstart", (e) => {
      isDragging = true
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
    })

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      e.preventDefault()

      const touch = e.touches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY

      currentRotationY += deltaX * 0.5
      currentRotationX -= deltaY * 0.5

      currentRotationX = Math.max(-30, Math.min(30, currentRotationX))

      bottle3D.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`

      startX = touch.clientX
      startY = touch.clientY
    })

    document.addEventListener("touchend", () => {
      isDragging = false
    })
  }
})

// Responsive handling
function handleResize() {
  // Refresh ScrollTrigger on resize
  ScrollTrigger.refresh()
}

window.addEventListener("resize", handleResize)

// Initialize sparkle particles when history section is in view
ScrollTrigger.create({
  trigger: "#history",
  start: "top 80%",
  onEnter: createSparkleParticles,
  once: true,
})

// Vault glow animation
ScrollTrigger.create({
  trigger: "#vault",
  start: "top 50%",
  end: "bottom 50%",
  onEnter: () => {
    gsap.to("#vault", {
      boxShadow: "0 0 50px #fe0000, 0 0 100px #fe0000, 0 0 150px #fe0000",
      duration: 2,
      repeat: -1,
      yoyo: true,
    })
  },
  onLeave: () => {
    gsap.killTweensOf("#vault")
  },
})

// Social icons pulse animation
document.addEventListener("DOMContentLoaded", () => {
  const socialIcons = document.querySelectorAll(".social-icon")
  socialIcons.forEach((icon, index) => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 1,
      delay: index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  })
})

// Performance optimization - pause animations when not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.globalTimeline.pause()
  } else {
    gsap.globalTimeline.resume()
  }
})

// Initialize everything
console.log("🥤 Coca-Cola Website Loaded - Open Happiness! 🎉")
