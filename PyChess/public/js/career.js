document.addEventListener('DOMContentLoaded', function () {
    // Set the width of the bars based on win/lose/draw rates
    document.getElementById('winBar').style.width = winRate + '%';
    document.getElementById('loseBar').style.width = loseRate + '%';
    document.getElementById('drawBar').style.width = drawRate + '%';

    // Optional: Add classes for styling
    document.getElementById('winBar').classList.add('win-color'); // Add class for win bar
    document.getElementById('loseBar').classList.add('lose-color'); // Add class for lose bar
    document.getElementById('drawBar').classList.add('draw-color'); // Add class for draw bar

    // Styling the circle dynamically
    const winRateCircle = document.getElementById('winRateCircle');

    // Set the background using conic-gradient based on win rate
    winRateCircle.style.background = `conic-gradient(#4CAF50 ${winRate}%, #eee ${100 - winRate}%)`;
});