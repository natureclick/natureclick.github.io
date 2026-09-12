// Tab Switcher (Home, Photography, About, Contact)
function showTab(tabId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Set active nav link
    const targetNav = document.getElementById('nav-' + tabId);
    if (targetNav) {
        targetNav.classList.add('active');
    }

    // If photography tab clicked, default to mountain category
    if (tabId === 'photography') {
        const mountainBtn = document.getElementById('btn-mountain');
        if (mountainBtn) {
            filterGallery('mountain', { target: mountainBtn });
        }
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Gallery Filter Functionality
function filterGallery(category, event) {
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Update active class on category buttons
    const catButtons = document.querySelectorAll('.cat-btn');
    catButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Lightbox Modal Functions
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImg');
    const captionText = document.getElementById('caption');

    const title = imgElement.alt || '';
    const location = imgElement.getAttribute('data-location') || '';
    const description = imgElement.getAttribute('data-description') || '';

    modal.style.display = 'block';
    modalImg.src = imgElement.src;

    captionText.innerHTML = `
        <span class="modal-title">${title}</span>
        <span class="modal-location">📍 ${location}</span>
        <p class="modal-desc">${description}</p>
    `;
    
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Close modal when pressing Esc key or clicking outside image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize default tab on page load
document.addEventListener('DOMContentLoaded', () => {
    filterGallery('mountain', { target: document.getElementById('btn-mountain') });
});
