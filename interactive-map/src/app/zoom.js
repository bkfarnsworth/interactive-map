let standard = 1;
let height = 2901;
let width = 4498;
const MAX = 3;
const MIN = .325;
function zoom(event) {
    event.preventDefault();
    if (event.deltaY < 0 && standard < MAX) {
        standard += .1
    }
    if (event.deltaY > 0 && standard > MIN) {
        standard -= .1
    }
    // console.log('offsetX' + event.offsetX)
    let offsetX = event.offsetX;
    let offsetY = event.offsetY;
    let level = Math.min(Math.max(standard, MIN), MAX)
    let newHeight = height * level;
    let newWidth = width * level;
    document.querySelector('#bigMap').height = newHeight;
    document.querySelector('#bigMap').width = newWidth;
    // document.querySelector('#mapContainer').scrollTo(event.offsetX, event.offsetY)
    document.querySelector('#mapContainer').scrollBy(event.offsetX * level , event.offsetY * level)
}
export default zoom