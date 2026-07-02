document.addEventListener("DOMContentLoaded", () => {
  // Activate title content on page load
  const titleContent = document.querySelector(".title-content")
  if (titleContent) {
    titleContent.classList.add("active")
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Team slider
  const teamMembers = [
    {
      name: "John Doe",
      position: "Fitness Trainer",
      image: "/static/images/team-member-1.jpg",
      bio: "John is a certified fitness trainer with over 10 years of experience in helping clients achieve their fitness goals.",
    },
    {
      name: "Jane Smith",
      position: "Yoga Instructor",
      image: "/static/images/team-member-2.jpg",
      bio: "Jane is a passionate yoga instructor who believes in the power of mindfulness and body awareness.",
    },
    {
      name: "Mike Johnson",
      position: "Nutritionist",
      image: "/static/images/team-member-3.jpg",
      bio: "Mike is a registered dietitian who specializes in creating personalized nutrition plans for athletes and fitness enthusiasts.",
    },
  ]

  let currentTeamMemberIndex = 0

  function updateTeamMember() {
    const teamMember = teamMembers[currentTeamMemberIndex]
    const teamMemberElement = document.querySelector(".team-member")
    if (teamMemberElement) {
      teamMemberElement.innerHTML = `
                <img src="${teamMember.image}" alt="${teamMember.name}">
                <h3>${teamMember.name}</h3>
                <p class="position">${teamMember.position}</p>
                <p class="bio">${teamMember.bio}</p>
            `
      teamMemberElement.classList.remove("active")
      void teamMemberElement.offsetWidth
      teamMemberElement.classList.add("active")
    }
  }

  const prevButton = document.querySelector(".nav-button.prev")
  const nextButton = document.querySelector(".nav-button.next")

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      currentTeamMemberIndex = (currentTeamMemberIndex - 1 + teamMembers.length) % teamMembers.length
      updateTeamMember()
    })

    nextButton.addEventListener("click", () => {
      currentTeamMemberIndex = (currentTeamMemberIndex + 1) % teamMembers.length
      updateTeamMember()
    })

    updateTeamMember()
  }

  // Store category filter
  const categoryButtons = document.querySelectorAll(".category-filter button")
  const productCards = document.querySelectorAll(".product-card")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category")
      productCards.forEach((card) => {
        if (category === "All" || card.querySelector(".category").textContent === category) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })

      categoryButtons.forEach((btn) => btn.classList.remove("btn-primary"))
      button.classList.add("btn-primary")
    })
  })

  // Blog "Learn More" functionality
  const learnMoreButtons = document.querySelectorAll(".learn-more")
  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const postId = button.getAttribute("data-post-id")
      alert(`Full blog post ${postId} content will be displayed here.`)
    })
  })
})

