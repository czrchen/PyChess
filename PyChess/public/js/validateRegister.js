document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const userId = document.getElementById('user-id').value;
    const userEmail = document.getElementById('user-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const formData = { user_id: userId, user_email: userEmail, user_password: password, confirm_password: confirmPassword };

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    // If registration was successful (server sends 200 OK), redirect to login
    if (response.ok) {
        window.location.href = '/login'; // Handle the redirect client-side
    } else {
        const result = await response.json();
        showError(result.field, result.message);
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