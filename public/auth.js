// public/auth.js
// ... (start of file is the same)
document.addEventListener('DOMContentLoaded', () => {
    // ... (elements and toggle logic are the same)

    let isLogin = false; // Start in Sign Up mode
    
    // ... (toggleBtn logic is the same)


    // FORM SUBMISSION HANDLER
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = ''; 
        submitBtn.disabled = true;

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const contactNumber = document.getElementById('contactNumber').value;
        
        const endpoint = isLogin ? '/api/login' : '/api/signup';
        
        const body = { email, password };
        if (!isLogin) {
            body.name = name;
            body.contactNumber = contactNumber;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) {
                message.className = 'text-center mt-4 text-sm text-green-600';
                message.textContent = data.message;
                
                if (isLogin) {
                    // *** NEW CRITICAL STEP: SAVE USER DATA TO LOCAL STORAGE ***
                    localStorage.setItem('bengaluruBuddyUser', JSON.stringify(data.user));

                    // Redirect based on role
                    setTimeout(() => {
                        window.location.href = data.user.role === 'admin' ? 'admin.html' : 'index.html';
                    }, 1500);
                }

            } else {
                message.className = 'text-center mt-4 text-sm text-red-600';
                message.textContent = data.message || 'An unknown error occurred.';
            }

        } catch (error) {
            // ... (error handling is the same)
            message.textContent = 'Network error. Check server connection.';
            console.error(error);
        } finally {
            submitBtn.disabled = false;
        }
    });
});