document.addEventListener("DOMContentLoaded", () => {

    const gridContainer = document.querySelector(".grid-container");
    const scoreDisplay = document.querySelector(".score");

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;

    scoreDisplay.textContent = score;

    const testData = [
        { "name": "alden", "image": "assets/alden.png" },
        { "name": "junnie", "image": "assets/junnie.png" },
        { "name": "malupiton", "image": "assets/malupiton.png" },
        { "name": "kalbo", "image": "assets/kalbo.png" },
        { "name": "tearsofjoy", "image": "assets/tearsofjoy.png" },
        { "name": "pacqute", "image": "assets/pacqute.png" }
    ];


    cards = [...testData, ...testData];
    shuffleCards();
    generateCards();

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    function generateCards() {
        gridContainer.innerHTML = "";

        cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.dataset.name = card.name;

            cardElement.innerHTML = `
                <div class="front">
                    <img src="${card.image}" class="front-image">
                </div>
                <div class="back"></div>
            `;

            cardElement.addEventListener("click", flipCard);
            gridContainer.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        score++;
        scoreDisplay.textContent = score;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const match = firstCard.dataset.name === secondCard.dataset.name;
        match ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 800);
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    window.restart = function () {
        score = 0;
        scoreDisplay.textContent = score;
        resetBoard();
        shuffleCards();
        generateCards();
    };

});
