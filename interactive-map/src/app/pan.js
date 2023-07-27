
var isDragging = false;
var mouseDownX, mouseDownY, mouseDownXOffset, mouseDownYOffset, scrollLeft, scrollTop;
let rawPerChangeSnap;
// Handle mouse down event
export function panMouseDown(event) {
  event.preventDefault();
  let mouseOffset = getMouseOffset(event);
  isDragging = true;
  mouseDownX = event.clientX;
  mouseDownY = event.clientY;
  mouseDownXOffset = mouseOffset.x;
  mouseDownYOffset = mouseOffset.y;
  scrollLeft = document.querySelector('#mapContainer').scrollLeft;
  scrollTop = document.querySelector('#mapContainer').scrollTop;
}

// Handle mouse move event
export function panMouseMove(event, rawPerChange) {
  if (!isDragging) {
    rawPerChangeSnap = rawPerChange
    return
  };
  let percentChange = Math.abs(rawPerChange)
  if (rawPerChangeSnap != rawPerChange) {
    if (rawPerChange > 0) {
      mouseDownY = mouseDownY + ((scrollTop * (1 + percentChange)) + (mouseDownYOffset * (1 + percentChange)) - mouseDownYOffset) - scrollTop;
      mouseDownX = mouseDownX + ((scrollLeft * (1 + percentChange)) + (mouseDownXOffset * (1 + percentChange)) - mouseDownXOffset) - scrollLeft;
      console.log('zooming in!!!')
    } else if (rawPerChange < 0) {
      mouseDownY = mouseDownY  ((scrollTop * (1 - percentChange)) + (mouseDownYOffset * (1 - percentChange)) - mouseDownYOffset) - scrollTop;
      mouseDownX = mouseDownX  ((scrollLeft * (1 - percentChange)) + (mouseDownXOffset * (1 - percentChange)) - mouseDownXOffset) - scrollLeft;
      console.log('zooming out!!!')
    }
    rawPerChangeSnap = rawPerChange
  }
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

