// CARDS ANIMATIONS AND TRANSITIONS HANDLING ON STATE CHANGE:
function changeCardsState (state) {
    switch (state) {
        case 0:
            // Click -> add an animation
            CUBE_CARDS.forEach( (element) => {element.classList.remove("arrange-plain")});
            CUBE.classList.add("animation-rotation");
            CUBE.style.animationPlayState = "running";
            break;
        case 1:
            // Click -> pause animation -> get actual position -> remove animation ->
            // -> transform smoothly to starting point
            CUBE.style.animationPlayState = "paused";
            let pausedTransformValue = getComputedStyle(CUBE).getPropertyValue("transform");
            CUBE.classList.remove("animation-rotation");
            CUBE.style.setProperty("transform", pausedTransformValue);
           
            // Important notice is that I can transform element with adding the transition only after some time (so in this case i use setTimeoute method to get some delay, otherwise it doesn't work !!!)
            setTimeout(() => {CUBE.style.removeProperty("transform")}, 200);
            break;
        case 2:
            // Click -> arrange cards from cube to stack -> arrange cards in plane
            CUBE_CARDS.forEach( (element) => {element.classList.add("arrange-plain")});
            setTimeout( () => {
                CUBE_CARDS.forEach( (element) => {
                    element.classList.add("pos_2d");
                    element.classList.remove("arrange-plain");
                });
            }, 3000);
            break;
        case 3:
            //Click -> Put cards back into a cube
            CUBE_CARDS.forEach( (element) => {element.classList.add("arrange-reverse")});
            setTimeout( () => {
                CUBE_CARDS.forEach( (element) => {
                    element.classList.remove("arrange-reverse", "pos_2d");
                });
            }, 3000);
    }
}
// STATE BAR HANDLING ON STATE CHANGE (smooth transitions of ".state-elements" from right to left):
async function changeElemenPositionToEnd (element, endPosition) {
    element.style.setProperty("transition-duration", "0s");
    element.style.setProperty("left", endPosition);
    await new Promise ( (resolve) => {
        setTimeout ( () => {
        element.style.removeProperty("transition-duration");
        resolve();
        }, 10);
    });
    return true;  
}

function updateStateBar (state) {
    const numberOfStateElements = 4;
    const statePositions = ["-10rem", "1rem", "12rem", "23rem", "34rem"];

    STATE_ELEMENTS.forEach( (element, index) => {
        let elementPositionIndex = (numberOfStateElements + index - state) % numberOfStateElements;

        if ( elementPositionIndex === 3) {
            changeElemenPositionToEnd (element, statePositions[numberOfStateElements])
            .then( (response) => { 
                console.log (`changeElemenPositionToEnd PROMISE resolved: ${response}`);
                element.style.setProperty("left", statePositions[elementPositionIndex]);
            });
        } else if (elementPositionIndex === 2) {
            element.style.setProperty("left", statePositions[elementPositionIndex]);
            element.classList.add("element-emphasis");
        } else if (elementPositionIndex === 1) {
            element.style.setProperty("left", statePositions[elementPositionIndex]);
            element.classList.remove("element-emphasis");
        } else {
            element.style.setProperty("left", statePositions[elementPositionIndex]);
        }
    });
}
// EVENT LISTENERS:
function changeStateOnClick () {
    changeCardsState(state);
    updateStateBar(state);
    state = (state + 1) % 4;
}

// MAIN APP SCRIPT:
const CUBE = document.querySelector(".cube");
const CUBE_CARDS = document.querySelectorAll(".cube_card");
const STATE_ELEMENTS = document.querySelectorAll(".state-element");

// Setting initial values:
STATE_ELEMENTS[1].classList.add("element-emphasis");
let state = 0;
CUBE.addEventListener("click", changeStateOnClick);
