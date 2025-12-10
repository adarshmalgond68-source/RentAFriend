document.getElementById('rentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the page from refreshing
    
    // REPLACE "YOUR_GROUP_ID" WITH YOUR ACTUAL INSTAGRAM PROFILE OR GROUP LINK
    const instagramUrl = "https://www.instagram.com/direct/t/YOUR_GROUP_ID"; 
    
    // Simulating a loading effect for user experience
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Connecting to Agent...";
    btn.classList.add('opacity-75', 'cursor-not-allowed');
    
    setTimeout(() => {
        alert("Thank you! Your details have been prepared. You are now being redirected to our Instagram Agent.");
        window.location.href = instagramUrl; 
    }, 1500);
});