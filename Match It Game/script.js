const cards = document.querySelectorAll(".card");
const movesCounter = document.querySelector(".moves-counter");
const retryButton = document.querySelector(".retry-button");
const cursorTrail = document.querySelector(".cursor-trail");

let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;
let moves = 0;

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        moves++;
        movesCounter.textContent = moves;
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        if (matchedCards == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCards = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
    moves = 0;
    movesCounter.textContent = moves;
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

retryButton.addEventListener("click", shuffleCard);

document.addEventListener("mousemove", (e) => {
    cursorTrail.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    cursorTrail.style.opacity = 1;
});

document.addEventListener("mouseleave", () => {
    cursorTrail.style.opacity = 0;
});
