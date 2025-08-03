// Global variables
const currentSection = 0
const sections = ["hero", "origin", "evolution", "expansion", "culture", "future"]

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  setupScrollListeners()
  setupTimelineNavigation()
  createBubbles()
  createFizzParticles()
  setupIntersectionObserver()
})

// Initialize animations
function initializeAnimations() {
  // Animate progress bars in future section
  setTimeout(() => {
    const chartBars = document.querySelectorAll(".chart-bar")
    chartBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = progress + "%"
    })
  }, 1000)
}

// Setup scroll listeners
function setupScrollListeners() {
  window.addEventListener("scroll", () => {
    updateProgressBar()
    updateTimelineNavigation()
    handleScrollAnimations()
  })
}

// Update progress bar
function updateProgressBar() {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  document.getElementById("progressBar").style.width = scrollPercent + "%"
}

// Update timeline navigation
function updateTimelineNavigation() {
  const scrollPosition = window.pageYOffset
  const windowHeight = window.innerHeight

  sections.forEach((sectionId, index) => {
    const section = document.getElementById(sectionId)
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (
      scrollPosition >= sectionTop - windowHeight / 2 &&
      scrollPosition < sectionTop + sectionHeight - windowHeight / 2
    ) {
      updateActiveTimelineDot(index)
    }
  })
}

// Update active timeline dot
function updateActiveTimelineDot(index) {
  const dots = document.querySelectorAll(".timeline-dot")
  dots.forEach((dot) => dot.classList.remove("active"))
  if (dots[index]) {
    dots[index].classList.add("active")
  }
}

// Setup timeline navigation clicks
function setupTimelineNavigation() {
  const timelineDots = document.querySelectorAll(".timeline-dot")
  timelineDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetSection = document.getElementById(sections[index])
      targetSection.scrollIntoView({ behavior: "smooth" })
    })
  })
}

// Handle scroll animations
function handleScrollAnimations() {
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal")

  scrollRevealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("revealed")
    }
  })
}

// Create floating bubbles
function createBubbles() {
  const bubblesContainer = document.getElementById("bubblesContainer")
  const bubbleCount = 20

  for (let i = 0; i < bubbleCount; i++) {
    createBubble(bubblesContainer)
  }

  // Continuously create new bubbles
  setInterval(() => {
    createBubble(bubblesContainer)
  }, 2000)
}

// Create individual bubble
function createBubble(container) {
  const bubble = document.createElement("div")
  bubble.className = "bubble"

  const size = Math.random() * 60 + 20
  const left = Math.random() * 100
  const animationDuration = Math.random() * 4 + 4
  const delay = Math.random() * 2

  bubble.style.width = size + "px"
  bubble.style.height = size + "px"
  bubble.style.left = left + "%"
  bubble.style.animationDuration = animationDuration + "s"
  bubble.style.animationDelay = delay + "s"

  container.appendChild(bubble)

  // Remove bubble after animation
  setTimeout(
    () => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble)
      }
    },
    (animationDuration + delay) * 1000,
  )
}

// Create fizz particles
function createFizzParticles() {
  const fizzContainer = document.getElementById("fizzParticles")
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    createFizzParticle(fizzContainer)
  }

  // Continuously create new particles
  setInterval(() => {
    createFizzParticle(fizzContainer)
  }, 500)
}

// Create individual fizz particle
function createFizzParticle(container) {
  const particle = document.createElement("div")
  particle.className = "fizz-particle"

  const left = Math.random() * 100
  const animationDuration = Math.random() * 2 + 2
  const delay = Math.random() * 1

  particle.style.left = left + "%"
  particle.style.animationDuration = animationDuration + "s"
  particle.style.animationDelay = delay + "s"

  container.appendChild(particle)

  // Remove particle after animation
  setTimeout(
    () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    },
    (animationDuration + delay) * 1000,
  )
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")

        // Trigger specific animations based on section
        const sectionId = entry.target.closest(".section")?.id
        triggerSectionAnimations(sectionId)
      }
    })
  }, observerOptions)

  // Observe all scroll reveal elements
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el)
  })
}

// Trigger section-specific animations
function triggerSectionAnimations(sectionId) {
  switch (sectionId) {
    case "expansion":
      animateExpansionDots()
      break
    case "culture":
      animateTVs()
      break
    case "future":
      animateProgressBars()
      break
  }
}

// Animate expansion dots
function animateExpansionDots() {
  const dots = document.querySelectorAll(".expansion-dot")
  dots.forEach((dot, index) => {
    setTimeout(() => {
      dot.style.animation = "expandPulse 2s ease-in-out infinite"
    }, index * 500)
  })
}

// Animate TV screens
function animateTVs() {
  const tvs = document.querySelectorAll(".retro-tv")
  tvs.forEach((tv, index) => {
    setTimeout(() => {
      tv.style.animation = "tvGlow 3s ease-in-out infinite alternate"
    }, index * 300)
  })
}

// Animate progress bars
function animateProgressBars() {
  const bars = document.querySelectorAll(".chart-bar")
  bars.forEach((bar, index) => {
    setTimeout(() => {
      const progress = bar.getAttribute("data-progress") || 75
      bar.style.width = progress + "%"
    }, index * 200)
  })
}

// Bottle evolution hover effects
document.addEventListener("DOMContentLoaded", () => {
  const bottleEras = document.querySelectorAll(".bottle-era")
  bottleEras.forEach((era) => {
    era.addEventListener("mouseenter", () => {
      const year = era.getAttribute("data-year")
      updateMorphingBottle(year)
    })
  })
})

// Update morphing bottle based on era
function updateMorphingBottle(year) {
  const morphingBottle = document.getElementById("morphingBottle")
  if (!morphingBottle) return

  morphingBottle.className = "morphing-bottle"

  switch (year) {
    case "1890s":
      morphingBottle.style.borderRadius = "5px 5px 10px 10px"
      morphingBottle.style.background = "linear-gradient(45deg, #4a90e2, #7bb3f0)"
      break
    case "1915":
      morphingBottle.style.borderRadius = "40px 40px 10px 10px"
      morphingBottle.style.background = "linear-gradient(45deg, #2ecc71, #58d68d)"
      break
    case "1950s":
      morphingBottle.style.borderRadius = "20px"
      morphingBottle.style.height = "300px"
      morphingBottle.style.background = "linear-gradient(45deg, #e74c3c, #ec7063)"
      break
    case "modern":
      morphingBottle.style.borderRadius = "15px"
      morphingBottle.style.height = "250px"
      morphingBottle.style.background = "linear-gradient(45deg, #9b59b6, #bb8fce)"
      break
  }
}

// CTA Button interaction
document.getElementById("ctaButton")?.addEventListener("click", () => {
  // Simulate shop redirect with animation
  const button = document.getElementById("ctaButton")
  button.style.transform = "scale(0.95)"
  button.textContent = "Opening Shop..."

  setTimeout(() => {
    button.style.transform = "scale(1)"
    button.textContent = "Shop Coca-Cola"
    // In a real implementation, this would redirect to the shop
    alert("Welcome to the Coca-Cola Shop! 🥤")
  }, 1000)
})

// Heartbeat animation for footer
function animateHeartbeat() {
  const heartbeatLine = document.getElementById("heartbeatLine")
  if (heartbeatLine) {
    setInterval(() => {
      heartbeatLine.style.animation = "none"
      setTimeout(() => {
        heartbeatLine.style.animation = "heartbeat 2s ease-in-out infinite"
      }, 10)
    }, 3000)
  }
}

// Initialize heartbeat animation
document.addEventListener("DOMContentLoaded", animateHeartbeat)

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add CSS animation keyframes dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes tvGlow {
        0% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
        100% { box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3), 0 0 50px rgba(255, 0, 0, 0.2); }
    }
`
document.head.appendChild(style)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    updateProgressBar()
    updateTimelineNavigation()
    handleScrollAnimations()
  }, 16),
) // ~60fps
