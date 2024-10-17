document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;

    // Clear any previous error messages
    clearErrors();

    const formData = { user_id: userId, user_password: password};

    try {
        // Send form data to server using Fetch API
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // If there is an error, focus on the appropriate field and display the error message
        if (result.error) { // Update to `if (result.err)` if your server returns `err`
            showError(result.field, result.message);
            document.getElementById(result.field).focus();
        }else{
            window.location.href = '/'; 
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        showError('password', "An unexpected error occurred. Please try again.");
    }
});

// Helper function to display error messages next to the relevant input fields
function showError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    const errorBox = document.createElement('p');
    errorBox.className = 'error-message';
    errorBox.style.color = 'red';
    errorBox.textContent = message;
    inputField.parentNode.appendChild(errorBox);
}

// Helper function to clear any previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}