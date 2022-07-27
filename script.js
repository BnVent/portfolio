import techDomain from './tech-list.json' assert {type: 'json'}

/*
 *
 * NAVBAR LOGIC
 * 
*/


const nav = document.getElementsByTagName('nav')[0]
const navLinks = nav.children[0].children

const hideNavbar = () => nav.style.top = '-100%'
const showNavbar = () => nav.style.top = 0


const showNavbarListener = () => {

    // When scroll, remove listener and show navbar.
    document.onscroll = null;
    showNavbar();
}

for (let i = 0; i < navLinks.length; i++) {

    // When click on nav links, hide navbar and add listener (with delay).
    navLinks[i].onclick = () => {
        hideNavbar();
        setTimeout(() => {
            document.onscroll = showNavbarListener
        }, 1000);
    }
}

/*
 *
 * TECH DOMAIN LOGIC
 * 
*/

const tbody = document.getElementsByTagName('tbody')[0]

function setCurrentTechDomain(area) {
    switch (area) {
        case 1: mapTableFromData(techDomain.mainTechnologies); break;
        case 2: mapTableFromData(techDomain.modulesAndPackages); break;
        case 3: mapTableFromData(techDomain.otherTechnologies); break;
    }
}

const captions = document.getElementsByClassName('caption')

function changeSelectedStyle(captionIndex) {

    captions[0].className = captions[1].className = captions[2].className = 'caption'
    captions[captionIndex - 1].className = 'caption selected'
}

captions[0].onclick = () => { setCurrentTechDomain(1); changeSelectedStyle(1) }
captions[1].onclick = () => { setCurrentTechDomain(2); changeSelectedStyle(2) }
captions[2].onclick = () => { setCurrentTechDomain(3); changeSelectedStyle(3) }

function mapTableFromData(data) {

    // Cleaning table content.
    tbody.innerHTML = ""

    data.forEach(element => {

        let newRow = document.createElement('tr');

        let calculateStyleFromLevel = level => {

            if (level <= 25) return 'domain-low';
            if (level <= 50) return 'domain-middle';
            if (level >= 50) return 'domain-high';
        }

        newRow.innerHTML = (`
            <td>
                <img src="${element.iconURL}">
                <span>${element.name}</span>
            </td>
            <td>
                <div class='${calculateStyleFromLevel(element.domain)}'
                style="width: ${element.domain}%"></div>
            </td>
        `)

        tbody.appendChild(newRow);
    })
}

// Map the first time
mapTableFromData(techDomain.mainTechnologies)

/*
 *
 * MENU LOGIC
 *
 */

const menu = document.getElementById('menu')
const transparencyLayer = document.getElementById('transparency-layer')

const closeMenu = () => {
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

    if (displayValue === 'block') {
        closeMenu();
        return
    }

    showMenu();
}

transparencyLayer.onclick = closeMenu