// Global variables
const BASE_URL = '/api/users';

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    bindEvents();
    loadUsers();
}

function bindEvents() {
    // Registration form
    document.getElementById('registrationForm').addEventListener('submit', function (e) {
        e.preventDefault();
        registerUser();
    });

    // Edit form
    document.getElementById('editForm').addEventListener('submit', function (e) {
        e.preventDefault();
        updateUser();
    });

    // Refresh button
    document.getElementById('refreshUsers').addEventListener('click', function () {
        loadUsers();
    });

    // Cancel edit
    document.getElementById('cancelEdit').addEventListener('click', function () {
        closeEditModal();
    });

    // Close modal on outside click
    document.getElementById('editModal').addEventListener('click', function (e) {
        if (e.target.id === 'editModal') {
            closeEditModal();
        }
    });
}

async function registerUser() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData();

    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('profile_picture', document.getElementById('profile_picture').files[0]);

    try {
        showLoading(true);

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showNotification('User registered successfully! Email confirmation sent.', 'success');
            form.reset();
            loadUsers();
        } else {
            showNotification(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

async function loadUsers() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.success) {
            displayUsers(data.users);
        } else {
            showNotification('Failed to load users', 'error');
        }
    } catch (error) {
        showNotification('Error loading users: ' + error.message, 'error');
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');

    if (users.length === 0) {
        usersList.innerHTML = `
            <div class="text-center py-16">
                <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No Users Yet</h3>
                <p class="text-gray-500">Register your first user to get started!</p>
            </div>
        `;
        return;
    }

    usersList.innerHTML = users.map(function (user) {
        return `
            <div class="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div class="flex items-center space-x-6">
                    <div class="flex-shrink-0">
                        ${user.profile_picture ?
                `<img src="/uploads/${user.profile_picture}" alt="${user.name}" 
                                 class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg">` :
                `<div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-4 border-white">
                                <span class="text-white font-bold text-2xl">${user.name.charAt(0).toUpperCase()}</span>
                             </div>`
            }
                    </div>
                    <div class="flex-grow">
                        <h3 class="text-2xl font-bold text-gray-800 mb-1">${user.name}</h3>
                        <div class="space-y-1">
                            <p class="flex items-center text-gray-600">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                                ${user.email}
                            </p>
                            <p class="flex items-center text-gray-600">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                ${user.phone}
                            </p>
                            <p class="flex items-center text-sm text-gray-500">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 9a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                                Registered: ${new Date(user.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button onclick="editUser(${user.id})" 
                                class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 transition-all duration-200 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit
                        </button>
                        <button onclick="deleteUser(${user.id})" 
                                class="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 transform hover:scale-105 transition-all duration-200 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function editUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`);
        const data = await response.json();

        if (data.success) {
            const user = data.user;
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editName').value = user.name;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPhone').value = user.phone;

            showEditModal();
        } else {
            showNotification('Failed to load user data', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

async function updateUser() {
    const form = document.getElementById('editForm');
    const formData = new FormData();
    const userId = document.getElementById('editUserId').value;

    formData.append('name', document.getElementById('editName').value);
    formData.append('email', document.getElementById('editEmail').value);
    formData.append('phone', document.getElementById('editPhone').value);

    const profilePicture = document.getElementById('editProfilePicture').files[0];
    if (profilePicture) {
        formData.append('profile_picture', profilePicture);
    }

    try {
        showLoading(true);

        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showNotification('User updated successfully!', 'success');
            closeEditModal();
            loadUsers();
        } else {
            showNotification(data.error || 'Update failed', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        return;
    }

    try {
        showLoading(true);

        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('User deleted successfully!', 'success');
            loadUsers();
        } else {
            showNotification(data.error || 'Delete failed', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

function showEditModal() {
    const modal = document.getElementById('editModal');
    const modalContent = document.getElementById('editModalContent');

    modal.classList.remove('hidden');

    // Animate modal appearance
    setTimeout(function () {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    const modalContent = document.getElementById('editModalContent');

    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');

    setTimeout(function () {
        modal.classList.add('hidden');
        document.getElementById('editForm').reset();
    }, 300);
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function showNotification(message, type) {
    type = type || 'success';

    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(function (notif) {
        notif.remove();
    });

    // Create new notification with TailwindCSS classes
    const notification = document.createElement('div');
    const baseClasses = 'notification fixed top-6 right-6 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-50 transform translate-x-full transition-transform duration-300 max-w-md';

    const typeClasses = type === 'success'
        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
        : 'bg-gradient-to-r from-red-500 to-pink-600';

    notification.className = baseClasses + ' ' + typeClasses;

    // Add icon based on type
    const icon = type === 'success'
        ? '<svg class="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        : '<svg class="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

    notification.innerHTML = `
        <div class="flex items-center">
            ${icon}
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(function () {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Hide notification after 4 seconds
    setTimeout(function () {
        notification.classList.add('translate-x-full');
        setTimeout(function () {
            notification.remove();
        }, 300);
    }, 4000);
}

// Utility functions for form validation (optional)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    if (!name || name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long' };
    }

    if (!validateEmail(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }

    if (!validatePhone(phone)) {
        return { valid: false, message: 'Please enter a valid phone number' };
    }

    return { valid: true };
}

// Enhanced registration function with validation
async function registerUserWithValidation() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData();

    formData.append('name', document.getElementById('name').value.trim());
    formData.append('email', document.getElementById('email').value.trim());
    formData.append('phone', document.getElementById('phone').value.trim());
    formData.append('profile_picture', document.getElementById('profile_picture').files[0]);

    // Validate form data
    const validation = validateForm(formData);
    if (!validation.valid) {
        showNotification(validation.message, 'error');
        return;
    }

    // Check if profile picture is selected
    if (!document.getElementById('profile_picture').files[0]) {
        showNotification('Please select a profile picture', 'error');
        return;
    }

    try {
        showLoading(true);

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showNotification('User registered successfully! Email confirmation sent.', 'success');
            form.reset();
            loadUsers();
        } else {
            showNotification(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}
