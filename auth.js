document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example validation for username and password
    if (username.length >= 3 && password.length >= 6) {
        // Assuming login is successful
        displayLoginNotification('Login successful', 'success');
        
        // Redirect to index.html after a short delay
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to homepage
        }, 1000); // 1-second delay to allow the user to see the success message
    } else {
        displayLoginNotification('Invalid username or password', 'error');
    }
});

function displayLoginNotification(message, type) {
    const notification = document.getElementById('login-notification');
    notification.textContent = message;
    notification.className = type === 'success' ? 'notification success' : 'notification error';
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
