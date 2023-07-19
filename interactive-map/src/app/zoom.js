let standard = 1;
let height = 2901;
let width = 4498;
const MAX = 2;
const MIN = .3;
function zoom(event) {
    event.preventDefault();
    let standardSnap = standard
    if (event.deltaY < 0 && standard < MAX) {
        standard += .1
    }else if (event.deltaY > 0 && standard > MIN) {
        standard = Math.max(standard - .1, MIN)
    }else{console.log('returning')
        return
    }

    let map = document.querySelector('#bigMap');
    let mapContainer = document.querySelector('#mapContainer');
    let mouseOffset = getMouseOffset(event);
    let currentScollTop = mapContainer.scrollTop;
    let currentScollLeft = mapContainer.scrollLeft;

    let level = Math.round(Math.min(Math.max(standard, MIN), MAX) * 10) / 10
    let oldLevel = Math.round(Math.min(Math.max(standardSnap, MIN), MAX) * 10) / 10
    let newHeight = Math.floor(height * level);
    let newWidth = Math.floor(width * level);
    let percentChange = Math.abs((level - oldLevel) / oldLevel);

    map.height = newHeight;
    map.width = newWidth;
    map.style.padding = `${newHeight/2}px ${newWidth/2}px`;


    if (event.deltaY < 0 && standardSnap < MAX) {
        let newScrollTop = (currentScollTop * (1 + percentChange)) + (mouseOffset.y * (1 + percentChange)) - mouseOffset.y;
        let newScrollLeft = (currentScollLeft * (1 + percentChange)) + (mouseOffset.x * (1 + percentChange)) - mouseOffset.x;
        mapContainer.scrollLeft = newScrollLeft
        mapContainer.scrollTop = newScrollTop;
    }
    if (event.deltaY > 0 && standard > MIN) {
        let newScrollTop = (currentScollTop * (1 - percentChange)) + (mouseOffset.y * (1 - percentChange)) - mouseOffset.y;
        let newScrollLeft = (currentScollLeft * (1 - percentChange)) + (mouseOffset.x * (1 - percentChange)) - mouseOffset.x;
        mapContainer.scrollLeft = newScrollLeft
        mapContainer.scrollTop = newScrollTop;

    }
    printStats(event, level, newWidth, newHeight, mouseOffset, percentChange, "After")
}

const getMouseOffset = function (e) {
    var rect = mapContainer.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    return { x: x, y: y }
}

const printStats = function (event, level, newWidth, newHeight, mouseOffset, percentChange, time) {
    let upperCornerMapRelToMC = {
        x: document.querySelector('#mapContainer').scrollLeft,
        y: document.querySelector('#mapContainer').scrollTop,
    }

    console.log(`-----------------------!!${time}!!------------------------------`)
    console.log(`%cstandard: ${standard}`, 'color: #fc8864')
    console.log(`%clevel: ${level}`, 'color: #fcc764')
    console.log(`%cnewWidth: ${newWidth} newHeight: ${newHeight}`, 'color: #48663e')
    console.log(`%cOffsetX: ${event.offsetX} OffsetY: ${event.offsetY}`, 'color: #68d89a')
    console.log(`%cMouseX: ${mouseOffset.x} MouseY: ${mouseOffset.y}`, 'color: #68cbd8')
    console.log(((() => upperCornerMapRelToMC) + ':').slice(4), upperCornerMapRelToMC);
    console.log(((() => percentChange) + ':').slice(4), percentChange);
    console.log(`altered standard: ${Math.round(standard*10)/10}`)
}
export default zoom