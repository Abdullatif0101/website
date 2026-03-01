document.addEventListener('DOMContentLoaded', () => {

    // Simple Auth check (Mock)
    if (!localStorage.getItem('adminToken') && window.location.pathname.includes('admin.html')) {
        window.location.href = '/admin-login.html';
    }

    // View Routing logic
    const navLinks = document.querySelectorAll('.admin-nav-link[data-view]');
    const views = document.querySelectorAll('.admin-view');
    const titleObj = document.getElementById('current-view-title');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            link.classList.add('active');

            // View ID
            const viewId = link.getAttribute('data-view');

            // Hide all views
            views.forEach(v => v.classList.remove('active'));

            // Show target view
            document.getElementById(`view-${viewId}`).classList.add('active');

            // Update title
            titleObj.textContent = link.textContent.replace(/[^\w\s\/\-]/g, '').trim(); // Remove emojis
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login.html';
        });
    }

});
