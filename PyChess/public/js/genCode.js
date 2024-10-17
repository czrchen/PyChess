document.getElementById('playButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    try {

        // Make a request to the server to generate a unique session ID
        const response = await fetch('/generate-session-id');

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // If successful, redirect to the game page
        if (data.success) {
            window.location.href = `/game?code=${data.sessionId}`; // Redirect to game.pug with the generated session ID
        } else {
            alert('Error generating session ID: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});