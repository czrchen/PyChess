const cards = [
    {
        name: "Lock Card 🔒",
        function: "Locks specific chess pieces during the game.",
        when: "Before the game begins and as a punishment for certain in-game actions.",
        how: "The locked pieces stay locked until freed with an Unlock Card, and players keep the Lock Cards until the pieces are unlocked."
    },
    {
        name: "Unlock Card 🔓",
        function: "Presents a easy-difficulty question with instruction that Frees locked chess pieces.",
        when: "Before any chess piece is moved at the start of each round.",
        how: "A correct answer unlocks a piece, while a wrong answer ends the round."
    },
    {
        name: "50/50 Card ⚖️",
        function: "Presents a medium-difficulty question with specific instructions that may help or hinder the player.",
        when: "When a chess piece lands on an orange-highlighted square on the chessboard.",
        how: "A correct answer allows the player to follow the card's instructions. Incorrect answer results in drawing a Lock Card as a penalty."
    },
    {
        name: "Boost Card 🚀",
        function: "Contains a hard difficulty question with instructions that provide significant advantages to the player.",
        when: "When a chess piece lands on a green-highlighted square on the chessboard.",
        how: "A correct answer allows the player to follow beneficial instructions. Incorrect answer results in drawing two Lock Cards as penalty."
    }
];

let currentCardIndex = 0;

function updateCards() {

    const prevCard = document.getElementById('prevCard');
    const currentCard = document.getElementById('currentCard');
    const nextCard = document.getElementById('nextCard');

    const prevIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    const nextIndex = (currentCardIndex + 1) % cards.length;

    const cardName = document.getElementById('card-name');
    const cardFunction = document.getElementById('card-function');
    const cardWhen = document.getElementById('card-when');
    const cardHow = document.getElementById('card-how');

   // Update Previous Card
   prevCard.querySelector('.small-card-name').textContent = cards[prevIndex].name;

   // Update Current (Large) Card
   currentCard.querySelector('.large-card-name').textContent = cards[currentCardIndex].name;
   currentCard.querySelector('.large-card-function').textContent = cards[currentCardIndex].function;
   currentCard.querySelector('.large-card-when').textContent = cards[currentCardIndex].when;
   currentCard.querySelector('.large-card-how').textContent = cards[currentCardIndex].how;

   // Update Next Card
   nextCard.querySelector('.small-card-name').textContent = cards[nextIndex].name;
}

function prevCards() {
    currentCardIndex = (currentCardIndex > 0) ? currentCardIndex - 1 : cards.length - 1;
    updateCards();
}

function nextCards() {
    currentCardIndex = (currentCardIndex < cards.length - 1) ? currentCardIndex + 1 : 0;
    updateCards();
}

document.addEventListener("DOMContentLoaded", () => {
    updateCards();
});