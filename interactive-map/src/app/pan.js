
var isDragging = false;
var mouseDownX, mouseDownY, mouseDownXOffset, mouseDownYOffset, scrollLeft, scrollTop, heightSnap;
// Handle mouse down event
export function panMouseDown(event) {
  origin(event)
}

// Handle mouse move event
export function panMouseMove(event) {
  let mouseOffset = getMouseOffset(event);
  document.querySelector('#coordView').innerHTML = `
  <span class='coord'>MAP - X:${event.offsetX} Y:${event.offsetY}</span>
  <span class='coord'>MAP CONTAINER - X:${Math.floor(mouseOffset.x)} Y:${Math.floor(mouseOffset.y)}</span>
  <span class='coord'>BROWSER - X:${event.clientX} Y:${event.clientY}</span>`
  if (!isDragging) {
    heightSnap = document.querySelector('#iconSpace').offsetHeight
    return
  };
  if (heightSnap != document.querySelector('#iconSpace').offsetHeight) {
    origin(event)
    heightSnap = document.querySelector('#iconSpace').offsetHeight
  }
  console.log(heightSnap)
  event.preventDefault();
  var deltaX = event.clientX - mouseDownX;
  var deltaY = event.clientY - mouseDownY;
  document.querySelector('#mapContainer').scrollTo(scrollLeft - deltaX, scrollTop - deltaY)
}

// Handle mouse up event
export function panMouseUp() {
  isDragging = false;
}

// Handle mouse leave event
export function panMouseLeave() {
  isDragging = false;
}

const getMouseOffset = function (e) {
  var rect = mapContainer.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element.
  return { x: x, y: y }
}

const origin = function (event) {
  event.preventDefault();
  let mouseOffset = getMouseOffset(event);
  isDragging = true;
  mouseDownX = event.clientX;
  mouseDownY = event.clientY;
  mouseDownXOffset = mouseOffset.x;
  mouseDownYOffset = mouseOffset.y;
  scrollLeft = document.querySelector('#mapContainer').scrollLeft;
  scrollTop = document.querySelector('#mapContainer').scrollTop;
  heightSnap = document.querySelector('#iconSpace').offsetHeight;
}
