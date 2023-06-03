
var isDragging = false;
var mouseDownX, mouseDownY, scrollLeft, scrollTop;

// Handle mouse down event
document.querySelector('body').addEventListener('mousedown', function (event) {
    isDragging = true;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;
    scrollLeft = this.scrollLeft;
    scrollTop = this.scrollTop;
    console.log(event)
});

// Handle mouse move event
document.querySelector('body').addEventListener('mousemove', function (event) {
    if (!isDragging) return;
    var deltaX = event.clientX - mouseDownX;
    var deltaY = event.clientY - mouseDownY;
    this.scrollLeft = scrollLeft - deltaX;
    this.scrollTop = scrollTop - deltaY;
    console.log(event)
});

// Handle mouse up event
document.querySelector('body').addEventListener('mouseup', function () {
    isDragging = false;
    console.log("hohoho")
});

// Handle mouse leave event
document.querySelector('body').addEventListener('mouseleave', function () {
    isDragging = false;
    console.log("haha")
});
