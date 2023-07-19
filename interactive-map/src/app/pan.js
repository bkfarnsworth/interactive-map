
var isDragging = false;
var mouseDownX, mouseDownY, scrollLeft, scrollTop;

// Handle mouse down event
export function panMouseDown(event) {
  console.log(`OffsetX: ${event.offsetX} OffsetY: ${event.offsetY}`)
  console.log(`ClientX: ${event.clientX} ClientY: ${event.clientY}`)
  console.log(`SrollX: ${event.target.scrollTop} ScrollY: ${event.target.scrollLeft}`)
  event.preventDefault();
  isDragging = true;
  mouseDownX = event.offsetX;
  mouseDownY = event.offsetY;
  scrollLeft = document.querySelector('#mapContainer').scrollLeft;
  scrollTop = document.querySelector('#mapContainer').scrollTop;
}

// Handle mouse move event
export function panMouseMove(event) {
  if (!isDragging) return;
  event.preventDefault();
  var deltaX = event.offsetX - mouseDownX;
  var deltaY = event.offsetY - mouseDownY;
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

