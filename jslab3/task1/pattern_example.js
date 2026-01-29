
function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Примеры
// true
console.log(validateEmail("test@example.com")); 
// false
console.log(validateEmail("wrong-email")); 
