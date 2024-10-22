// Author: Devany Walker
// ID#: 2300064
// Occurence: UM2 


// login.js
const savedUsername = 'testuser';
const savedPassword = 'password123';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === savedUsername && password === savedPassword) {
        window.location.href = 'product and service.html';
    } else {
        alert('Invalid credentials!');
    }
});
