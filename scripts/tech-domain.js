// Tech domain data
const techDomain = await fetch('./tech-list.json').then(result => result.json()).then(data => data)

const gallery = document.getElementById('tech-domain-gallery')
const searchInput = document.getElementById('search-technology-input')
const searchButton = document.getElementById('search-technology-button')

const captions = document.getElementById('captions-container').children
const captionsArray = [captions[0], captions[1], captions[2]]

let FILTER_TEXT = ''
let CURRENT_TABLE_INDEX = 0

/* 
 *  UPDATE TECHNOLOGIES TO THE GALLERY
*/

function mapTableFromData() {

    // Cleaning table content.
    gallery.innerHTML = ""
    const techDomainArray = Object.values(techDomain)[CURRENT_TABLE_INDEX]

    let data = FILTER_TEXT
        ? techDomainArray.filter(tech => new RegExp(FILTER_TEXT, 'ig').test(tech.name))
        : techDomainArray

    if (data.length === 0) {
        gallery.innerHTML = `
            <h3 style='position: absolute; top: 4rem; left: 4rem'>
                <span lang='en'>❌ No items match the search pattern...</span>
                <span lang='es'>❌ Ningún elemento coincide con la búsqueda...</span>
            </h3>`
        return
    }

    data.forEach(element => {

        let techElement = document.createElement('div')

        techElement.innerHTML = (`
                <img src="${element.iconURL}" alt="${element.name} tech image">
                <span>${element.name}</span>`)

        gallery.appendChild(techElement)
    })
}

/*
 * CHANGE TECHNOLOGY CATEGORY
 */

const switchCaption = captionIndex => {

    const changeCaptionsStyle = () => captionsArray.forEach((caption, index) =>
        caption.className = index === captionIndex
            ? 'caption selected'
            : ' caption')

    CURRENT_TABLE_INDEX = captionIndex

    changeCaptionsStyle()
    mapTableFromData()

}

captions[0].onclick = () => switchCaption(0)
captions[1].onclick = () => switchCaption(1)
captions[2].onclick = () => switchCaption(2)

// Setting the default option
switchCaption(CURRENT_TABLE_INDEX)

/*
 * SEARCH TECHNOLOGY 
 */

const searchContainer = document.getElementById('technology-search-container')

searchInput.oninput = event => {
    FILTER_TEXT = event.target.value
    mapTableFromData(CURRENT_TABLE_INDEX)
}

searchButton.onclick = () => {

    const hideInput = () => {

        searchContainer.style.maxWidth = '0'
        searchInput.value = ' '
        searchButton.innerText = 'search'
        setTimeout(() => { searchContainer.style.width = '0' }, 1000);

        // Remove filter condition on close search input
        FILTER_TEXT = ""
        mapTableFromData()
    }

    const showInput = () => {
        searchButton.innerText = 'close'
        searchInput.value = ''
        searchContainer.style.maxWidth = '32%'
        searchContainer.style.width = '32%'
        searchInput.focus()
    }

    if (searchButton.innerText === 'close') hideInput()
    else showInput()
}