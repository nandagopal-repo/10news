import './style.css';
import urlParser from "./component";
import moment from "../node_modules/moment/dist/moment"

const container = document.querySelector('#container')
const readMore = document.querySelector('#readMore')
const loader = document.querySelector('#loader')
const numberOfnews = 16

const startAnimation = () =>{
    loader.style.display = "block"
    loader.style.animation = "spin 1s linear infinite"
}

const endAnimation = () =>{
    loader.style.animation = "none"
    loader.style.display = "none"
}
 
function renderNews(res){
    if(res.title === "" || res.kids == null || res.url == null) return
    const receivedTime = new Date(res.time * 1000)
    const time = moment(receivedTime).fromNow()
    const sName = urlParser(res.url)
    const newsContainer = document.createElement('div')
    newsContainer.classList.add('news')
    newsContainer.innerHTML= `
        <p class="news__rating">${res.score} points</p>
        <p class="news__title-link"><a href="${res.url}" class="news__title">${res.title}</a> <a href="${res.url}" class="news__link">(${sName})</a></p>
        <p class="news__details">by ${res.by}  |  ${time}  |  ${res.kids.length} comments</p>
    `
    container.appendChild(newsContainer)
}


function fetchFunction(url){
    startAnimation()
    return fetch(url).then(res => res.json())
}

async function main(numberOfnews){
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    const newsId = await fetchFunction(url)
    const reducedNewsId = newsId.slice(0, numberOfnews)
    reducedNewsId.forEach( async (id) => {
        const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        const news = await fetchFunction(url)
        await renderNews(news)
    })
    endAnimation()
}

main(numberOfnews)


readMore.addEventListener('click' , () => {
    main(numberOfnews + 15)
})