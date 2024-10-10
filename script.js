let IMAGES = [
    "./icons/c-logo.png",
    "./icons/html-5.png",
    "./icons/js.png",
    "./icons/mysql.png",
    "./icons/php.png",
    "./icons/physics.png",
    "./icons/python.png",
    "./icons/technology.png",
    "./icons/typescript.png",
    "./icons/visual-basic.png",
];


window.onload = () => {
    const gameElement = document.getElementById("game");

    IMAGES.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (4 * 5) / 2; i++) {
        gameElement.insertAdjacentHTML("beforeend", `<div class="card" onclick="csc(this);" style="--imgurl: url(${IMAGES[i]});"></div>`);
    }
    IMAGES.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (4 * 5) / 2; i++) {
        gameElement.insertAdjacentHTML("beforeend", `<div class="card" onclick="csc(this);" style="--imgurl: url(${IMAGES[i]});"></div>`);
    }
}

let points = 0;
let tries = 0;
let selectedCards = [];

function checkWin() {
    if (points !== (4 * 5) / 2)return;
    const gameElement = document.getElementById("game");
    gameElement.classList.add("finished");
}

/** @param {HTMLElement} card */
function csc(card) {
    if (selectedCards.includes(card) || card.disabled == true) return;
    selectedCards.push(card);
    card.classList.add("flipped");


    if (selectedCards.length >= 2) {
        if (getComputedStyle(selectedCards[0]).getPropertyValue('--imgurl') === getComputedStyle(selectedCards[1]).getPropertyValue('--imgurl')) {
            selectedCards = [];
            points++;
            const triesTitle = document.getElementById("tries");
            triesTitle.innerText = "Tries: " + tries;
        } else {
            const gameElement = document.getElementById("game");
            [...gameElement.children].forEach(c => c.disabled = true);
            setTimeout(() => {
                selectedCards.forEach(c => c.classList.remove("flipped"));
                selectedCards = [];
                [...gameElement.children].forEach(c => c.disabled = false);
            }, 1000)
        }
        tries++;
    }

    checkWin();
}