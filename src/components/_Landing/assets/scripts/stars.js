import { TweenMax } from "gsap/TweenMax";

// Amount of stars
function createStars(numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
        placeStarRandomly();
    }
}
// Create Stars
function placeStarRandomly(){
    const tmpStar = document.createElement("figure");
    tmpStar.className = "star";
    tmpStar.style.top = 100*Math.random()+"%";
    tmpStar.style.left = 100*Math.random()+"%";
    document.getElementById("starryBackground").appendChild(tmpStar);
}

function animateStars() {
    const stars = document.querySelectorAll(".star");
    Array.prototype.forEach.call(stars, function(el,){
        TweenMax.to(el, Math.random() * 0.4 + 0.4, {opacity: Math.random(), onComplete: animateStars});
    });
}


export default function initStars(numberOfStars) {
    createStars(numberOfStars);
    animateStars();
}
