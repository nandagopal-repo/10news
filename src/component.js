const urlParser  = (url) => {
    let sIndex = 0
    let eIndex = 0
    for (let i = 0; i < url.length; i++) {
        if (url[i] === '/' && url[i - 1] === '/') {
            sIndex = i + 1
        }
        else if (url[i] === '/' && sIndex != 0) {
            eIndex = i
            break
        }
    }
    return url.slice(sIndex, eIndex)
}

export default urlParser