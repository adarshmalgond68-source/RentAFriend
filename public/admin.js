// public/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is pretending to be an admin (SIMPLE CHECK for MVP)
    const storedUser = JSON.parse(localStorage.getItem('bengaluruBuddyUser'));
    
    if (!storedUser || storedUser.role !== 'admin') {
        // If not logged in as admin, show an error and hide the content
        document.getElementById('fetchDataBtn').style.display = 'none';
        document.getElementById('loadingStatus').classList.remove('hidden');
        document.getElementById('loadingStatus').textContent = 'Access Denied. Please log in as an Admin.';
        document.getElementById('userTableBody').innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-500">Authentication Required.</td></tr>';
        return; 
    }

    // If check passes, load data and set up button listener
    fetchUserData();
    document.getElementById('fetchDataBtn').addEventListener('click', fetchUserData);
});

async function fetchUserData() {
    const tableBody = document.getElementById('userTableBody');
    const status = document.getElementById('loadingStatus');

    tableBody.innerHTML = ''; // Clear existing data
    status.textContent = 'Fetching data...';
    status.classList.remove('hidden');

    try {
        // API call to your Node.js backend to get all users
        const response = await fetch('/api/admin/users');
        
        if (response.status === 200) {
            const users = await response.json();
            renderTable(users);
            status.classList.add('hidden');
        } else {
            status.textContent = `Error: Failed to fetch users (${response.statusText}).`;
        }
    } catch (error) {
        status.textContent = 'Network error. Is the server running?';
        console.error('Fetch error:', error);
    }
}

function renderTable(users) {
    // ... (rendering logic is the same)
    const tableBody = document.getElementById('userTableBody');
    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-400">No users found in the database.</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.className = user.role === 'admin' ? 'bg-indigo-50 font-bold' : 'hover:bg-gray-50'; 

        row.innerHTML = `
            <td class="py-3 px-4 border-b">${user.id}</td>
            <td class="py-3 px-4 border-b">${user.name}</td>
            <td class="py-3 px-4 border-b">${user.email}</td>
            <td class="py-3 px-4 border-b">${user.contactNumber}</td>
            <td class="py-3 px-4 border-b"><span class="px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-800'}">${user.role.toUpperCase()}</span></td>
            <td class="py-3 px-4 border-b">${new Date(user.createdAt).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}