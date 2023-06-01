let standard = 1;
const MAX = 3;
const MIN = .5;
function zoom(event){  
    event.preventDefault(); 
    if (event.deltaY === -102 && standard < MAX){
     standard += .1
    }
    if (event.deltaY === 102 && standard > MIN) {
     standard -= .1
    }
    let level = Math.min(Math.max(standard, MIN), MAX)
    document.body.style.transform = `scale(${level})`
}
export default zoom