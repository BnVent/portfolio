const aboutMeCards = document.getElementById('about-me-flex-container')
const projectsCards = document.getElementById('projects-grid-container')

let observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = '1.0'
            entry.target.style.transform = ''
            observer.unobserve(entry.target)
        }

    })

}, { threshold: 0.25 })

aboutMeCards.style.opacity = 0
aboutMeCards.style.transition = 'opacity 0.25s, transform 1s'
aboutMeCards.style.transform = 'translateY(1rem)'

projectsCards.style.opacity = 0
projectsCards.style.transition = 'opacity 0.25s, transform 1s'
projectsCards.style.transform = 'translateY(1rem)'

observer.observe(aboutMeCards)
observer.observe(projectsCards)
