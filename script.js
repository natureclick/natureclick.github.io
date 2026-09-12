// Function to switch between main tabs (Home, Photography, About, Contact)
function showTab(tabId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.remove('active'));

    const activeSection = document.getElementById(tabId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const activeNav = document.getElementById('nav-' + tabId);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Default filter activation when clicking Photography tab
    if (tabId === 'photography') {
        const mountainBtn = document.getElementById('btn-mountain');
        if (mountainBtn) {
            filterGallery('mountain', { target: mountainBtn });
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to filter photography categories (Mountain, Animals, Birds, Flowers)
function filterGallery(category, event) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Fullscreen Lightbox Modal Functions
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImg');
    const captionText = document.getElementById('caption');

    const title = imgElement.getAttribute('alt') || '';
    const location = imgElement.getAttribute('data-location') || '';
    const desc = imgElement.getAttribute('data-description') || '';

    modal.style.display = 'block';
    modalImg.src = imgElement.src;

    captionText.innerHTML = `
        <span class="modal-title">${title}</span>
        ${location ? `<span class="modal-location">📍 ${location}</span>` : ''}
        ${desc ? `<span class="modal-desc">${desc}</span>` : ''}
    `;
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close Modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Default setup on page load
document.addEventListener('DOMContentLoaded', () => {
    showTab('home');
});
