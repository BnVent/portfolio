/*
 *
 * NAVBAR LOGIC
 * 
*/

const nav = document.getElementsByTagName('nav')[0]
const navLinks = nav.children[0].children

const DETECTED_MOBILE = window.innerWidth <= 720

const hideNavbar = () => {
    nav.style.top = '-100%';
    transparencyLayer.style.display = 'none'
    if (DETECTED_MOBILE) closeMenu()
}
const showNavbar = () => nav.style.top = 0

const showNavbarListener = () => {

    // When scroll, remove listener and show navbar.
    document.onscroll = null;
    showNavbar();
}

for (let i = 0; i < navLinks.length; i++) {

    // When click on nav links, hide navbar and add listener (with delay).
    navLinks[i].onclick = () => {
        hideNavbar()
        setTimeout(() => {
            document.onscroll = showNavbarListener
        }, 1000);
    }
}

/*
 *
 * MOBILE MENU LOGIC
 *
 */

const menu = document.getElementById('menu')
const transparencyLayer = document.getElementById('transparency-layer')

function closeMenu() {
    nav.children[0].style.display = 'none'
    menu.innerText = 'menu'
    transparencyLayer.style.display = 'none'
}

const showMenu = () => {
    nav.children[0].style.display = 'block'
    menu.innerText = 'close'
    transparencyLayer.style.display = 'block'
}

menu.onclick = () => {

    let displayValue = nav.children[0].style.display

    if (window.scrollY < 520) window.scroll({ top: 520 })

    if (displayValue === 'block') {
        closeMenu();
        return
    }

    showMenu();
}

transparencyLayer.onclick = closeMenu

/*
 *
 * LANGUAGE SWITCH LOGIC
 * 
 */

const headerLanguageSwitch = document.getElementById('language-selection-header');
const navbarLanguageSwitch = document.getElementById('language-selection-navbar');

var language = 'es' // Default value

const switchLanguage = () => {
    let nextLanguage = (language === 'es' ? 'en' : 'es')

    if (nextLanguage === 'es') {
        headerLanguageSwitch.children[0].style.left = '0.3rem'
        headerLanguageSwitch.children[1].style.color = '#000'
        headerLanguageSwitch.children[3].style.color = '#FFF'

        // Navbar (mobile devices)
        navbarLanguageSwitch.children[0].className = 'selected'
        navbarLanguageSwitch.children[2].className = ''
    }

    else {
        headerLanguageSwitch.children[0].style.left = '50%'
        headerLanguageSwitch.children[1].style.color = '#FFF'
        headerLanguageSwitch.children[3].style.color = '#000'

        // Navbar (mobile devices)
        navbarLanguageSwitch.children[0].className = ''
        navbarLanguageSwitch.children[2].className = 'selected'
    }

    language = nextLanguage

    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(`*:lang(${nextLanguage}){display: none}`, 0)
}

headerLanguageSwitch.onclick = switchLanguage
navbarLanguageSwitch.onclick = switchLanguage

/* 
 *
 * BIRTHDAY AND WORKING EXPERIENCE LOGIC
 * 
 */

const ageContainer = document.getElementById('age-in-number')
const expYearsContainer = document.getElementById('experience-in-number')
const expCardContainer = document.getElementById('experience-card-container').children
const expLabels = [expCardContainer[1], expCardContainer[2]]

// My age
let myBirthday = new Date(1999, 6, 12)
ageContainer.textContent = getYearsDifferenceInNumbers(myBirthday)

// Experience
let startOfMyJob = new Date(2022, 0, 1)
expYearsContainer.textContent = getYearsDifferenceInNumbers(startOfMyJob)

// Adding an 's' at the end of year/años word if it's required
if (getYearsDifferenceInNumbers(startOfMyJob) > 1) {
    expLabels.forEach(node => {
        let textNode = node.textContent.split(' ')
        textNode[0] += 's'
        node.textContent = textNode.join(' ')
    })
}

function getYearsDifferenceInNumbers(absoluteDate) {
    const dateToday = new Date()
    return dateToday.getMonth() >= absoluteDate.getMonth() && dateToday.getDate() >= absoluteDate.getDate()
        ? dateToday.getFullYear() - absoluteDate.getFullYear()
        : (dateToday.getFullYear() - absoluteDate.getFullYear()) - 1
}