// main.js - Navigation and functionality for WasteConnect

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set up navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Common navigation setup for all pages
    setupNavigation();
    
    // Page-specific initialization
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'signup.html':
            initSignupPage();
            break;
        case 'seller.html':
            initSellerPage();
            break;
        case 'sellers-items.html':
            initSellersItemsPage();
            break;
        case 'sellers-profile.html':
            initSellersProfilePage();
            break;
        case 'buyers.html':
            initBuyersPage();
            break;
    }
}

// Setup navigation elements that appear on multiple pages
function setupNavigation() {
    // Handle login/signup buttons on homepage
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    // Setup sidebar navigation for buyer's dashboard
    const sidebarItems = document.querySelectorAll('.sidebar ul li');
    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.textContent.trim();
                
                switch(text) {
                    case 'Dashboard':
                        window.location.href = 'buyers.html';
                        break;
                    case 'Orders':
                        // Future implementation for orders page
                        alert('Orders page coming soon!');
                        break;
                    case 'Transactions':
                        // Future implementation for transactions page
                        alert('Transactions page coming soon!');
                        break;
                }
            });
        });
    }
}

// Home page specific functions
function initHomePage() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#login') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Start Selling Today button
    const startSellingBtn = document.querySelector('.btn');
    if (startSellingBtn) {
        startSellingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Check if user is logged in (using localStorage)
            const isLoggedIn = localStorage.getItem('userLoggedIn');
            
            if (isLoggedIn) {
                const userType = localStorage.getItem('userType');
                if (userType === 'seller') {
                    window.location.href = 'seller.html';
                } else {
                    // If buyer, redirect to buyer dashboard
                    window.location.href = 'buyers.html';
                }
            } else {
                // If not logged in, go to login page
                window.location.href = 'login.html';
            }
        });
    }
}

// Login page specific functions
function initLoginPage() {
    const loginForm = document.querySelector('.login-box');
    
    if (loginForm) {
        const submitBtn = loginForm.querySelector('.submit-btn');
        
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // For demo purposes - in a real app, this would communicate with a backend
            // Check if it's a seller or buyer login (simple check based on email)
            const userType = email.includes('seller') ? 'seller' : 'buyer';
            
            // Store login status
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userType', userType);
            
            // Redirect based on user type
            if (userType === 'seller') {
                window.location.href = 'seller.html';
            } else {
                window.location.href = 'buyers.html';
            }
        });
    }
    
    // Sign up link
    const signupLink = document.querySelector('.sign-up-link a');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
}

// Signup page specific functions
function initSignupPage() {
    const signupForm = document.querySelector('.login-box');
    
    if (signupForm) {
        const submitBtn = signupForm.querySelector('.submit-btn');
        
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const username = signupForm.querySelector('input[placeholder="Username"]').value;
            const email = signupForm.querySelector('input[placeholder="Email"]').value;
            const password = signupForm.querySelector('input[placeholder="Password"]').value;
            const termsAccepted = signupForm.querySelector('#check').checked;
            
            // Simple validation
            if (!username || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!termsAccepted) {
                alert('Please accept the terms and conditions');
                return;
            }
            
            // For demo purposes - in a real app, this would communicate with a backend
            // Determine user type based on email (simple check)
            const userType = email.includes('seller') ? 'seller' : 'buyer';
            
            // Store user data
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', username);
            localStorage.setItem('userType', userType);
            
            // Redirect based on user type
            if (userType === 'seller') {
                window.location.href = 'seller.html';
            } else {
                window.location.href = 'buyers.html';
            }
        });
    }
    
    // Login link
    const loginLink = document.querySelector('.sign-up-link a');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
}

// Seller page specific functions
function initSellerPage() {
    // Check if user is logged in and is a seller
    checkAuth('seller');
    
    const wasteForm = document.querySelector('form');
    
    if (wasteForm) {
        wasteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('title').value;
            const type = document.getElementById('type').value;
            const weight = document.getElementById('weight').value;
            const price = document.getElementById('price').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('desc').value;
            
            // Simple validation
            if (!title || !type || !weight || !price) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create waste item object
            const wasteItem = {
                id: Date.now(), // Unique ID based on timestamp
                title,
                type,
                weight,
                price,
                location,
                description,
                date: new Date().toLocaleDateString(),
                status: 'Available'
            };
            
            // Save to localStorage
            saveWasteItem(wasteItem);
            
            // Show success message
            alert('Waste listing posted successfully!');
            
            // Redirect to seller's items page
            window.location.href = 'sellers-items.html';
        });
    }
    
    // Setup navigation between seller pages
    const statusElement = document.querySelector('.status');
    if (statusElement) {
        statusElement.addEventListener('click', function() {
            window.location.href = 'sellers-profile.html';
        });
    }
}

// Seller's items page specific functions
function initSellersItemsPage() {
    // Check if user is logged in and is a seller
    checkAuth('seller');
    
    // Load and display seller's items
    displaySellerItems();
}

// Seller's profile page specific functions
function initSellersProfilePage() {
    // Check if user is logged in and is a seller
    checkAuth('seller');
    
    // Display seller information
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName') || 'John Doe'; // Default name
    
    // In a real app, you would fetch this data from a database
    document.querySelector('.profile-card').innerHTML = `
        <h2>Seller's Profile</h2>
        <div style="margin: 18px 0;">
            <div style="font-size:1.1rem;margin-bottom:8px;"><strong>Name:</strong> ${userName}</div>
            <div style="font-size:1.1rem;margin-bottom:8px;"><strong>Email:</strong> ${userEmail}</div>
            <div style="font-size:1.1rem;"><strong>Amount Earned:</strong> ₦0</div>
        </div>
        <p style="color:#228B22;">Update your profile details soon!</p>
    `;
}

// Buyer's dashboard specific functions
function initBuyersPage() {
    // Check if user is logged in
    checkAuth('buyer');
    
    // Add interactivity to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Viewing details for: ${title}`);
            // In a real app, this would show more details or navigate to a detailed view
        });
    });
    
    // Add interactivity to table rows
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const seller = this.cells[1].textContent;
            const amount = this.cells[3].textContent;
            alert(`Transaction details with ${seller} for ${amount}`);
            // In a real app, this would show a detailed transaction view
        });
    });
}

// Helper function to check authentication
function checkAuth(requiredType) {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    
    if (requiredType && userType !== requiredType) {
        // Show error if wrong user type
        alert(`You need to be a ${requiredType} to access this page`);
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Helper function to save waste item to localStorage
function saveWasteItem(item) {
    let items = JSON.parse(localStorage.getItem('sellerItems')) || [];
    items.push(item);
    localStorage.setItem('sellerItems', JSON.stringify(items));
}

// Helper function to display seller's items
function displaySellerItems() {
    const itemsContainer = document.getElementById('items-list');
    const items = JSON.parse(localStorage.getItem('sellerItems')) || [];
    
    if (items.length === 0) {
        itemsContainer.innerHTML = '<div class="empty">You haven\'t posted any items yet.</div>';
        return;
    }
    
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card';
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Weight:</strong> ${item.weight} kg</p>
            <p><strong>Price:</strong> ₦${item.price} per kg</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Status:</strong> ${item.status}</p>
            <p><strong>Posted on:</strong> ${item.date}</p>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Logout function (can be called from any page)
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    window.location.href = 'index.html';
}