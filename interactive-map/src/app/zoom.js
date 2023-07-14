let standard = 1;
let height = 2901;
let width = 4498;
const MAX = 3;
const MIN = .1;
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
    let map = document.querySelector('#bigMap');
    let mapContainer = document.querySelector('#mapContainer');
    let mouseRelToMC = getMouseOffset(event);

    // for this one we are just going to get the container scrollTop, which is the exact same thing as the maps "scroll offset"
    console.log("");
    console.log('######### BEFORE ZOOM #########')
    printStats(event, level)

    let oldLevel = level - .1;
    let percentChange = (level - oldLevel) / oldLevel;
    console.log(((()=>percentChange)+':').slice(4), percentChange);

    let currentScollTop = mapContainer.scrollTop;
    let currentScollLeft = mapContainer.scrollLeft;

    map.height = newHeight;
    map.width = newWidth;

    // just use the current height/width of the map! that will always give us enough room to scroll up
    map.style.paddingBottom = newHeight + 'px';
    map.style.paddingRight = newWidth + 'px';

    let newScrollTop = (currentScollTop * (1 + percentChange)) + (mouseRelToMC.y * (1 + percentChange)) - mouseRelToMC.y;
    let newScrollLeft = (currentScollLeft * (1 + percentChange)) + (mouseRelToMC.x * (1 + percentChange)) - mouseRelToMC.x;
    mapContainer.scrollLeft = newScrollLeft
    mapContainer.scrollTop = newScrollTop;




    console.log('######### AFTER ZOOM #########')
    printStats(event, level)
}

const getMouseOffset = function(e){
    var rect = document.querySelector('#mapContainer').getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    return {x:x,y:y}
}

const printStats = function(event, level) {
    let upperCornerMapRelToMC = {
        x: document.querySelector('#mapContainer').scrollLeft,
        y: document.querySelector('#mapContainer').scrollTop,
    }
    let mouseRelToMC = getMouseOffset(event);
    let houseRelToMC;
    let houseRelToMap;
    console.log(((()=>level)+':').slice(4), level);
    console.log(((()=>upperCornerMapRelToMC)+':').slice(4), upperCornerMapRelToMC);
    console.log(((()=>mouseRelToMC)+':').slice(4), mouseRelToMC);
}



export default zoom