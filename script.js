// Tab Switching System
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

    // Reset Category Buttons when switching to Photography Tab
    if (tabId === 'photography') {
        const buttons = document.querySelectorAll('.cat-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Hide all photo cards until a sub-tab is clicked
        const cards = document.querySelectorAll('.photo-card');
        cards.forEach(card => card.style.display = 'none');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category Filtering System
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

// Image Modal System
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImg');
    const captionText = document.getElementById('caption');

    const title = imgElement.getAttribute('alt') || '';
    const location = imgElement.getAttribute('data-location') || '';
    const desc = imgElement.getAttribute('data-description') || '';
    const photoId = imgElement.getAttribute('data-id') || '';

    modal.style.display = 'block';
    modalImg.src = imgElement.src;

    captionText.innerHTML = `
        <span class="modal-title">${title}</span>
        ${location ? `<span class="modal-location">📍 ${location}</span>` : ''}
        ${desc ? `<span class="modal-desc">${desc}</span>` : ''}
    `;
    
    document.body.style.overflow = 'hidden';

    // Update URL Hash for Photo
    if (photoId) {
        window.location.hash = photoId;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Reset URL back to Photography section
    window.location.hash = 'photography';
}

// Close Modal on Outside Click
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Router Logic based on URL Hash
function handleRoute() {
    const hash = window.location.hash.replace('#', '');

    if (!hash || hash === 'home') {
        showTab('home');
    } else if (['photography', 'about', 'contact'].includes(hash)) {
        showTab(hash);
    } else {
        // If Hash is a photo ID
        const targetImg = document.querySelector(`img[data-id="${hash}"]`);
        if (targetImg) {
            showTab('photography');
            
            // Auto-filter to correct category only when direct photo link is opened
            const parentCard = targetImg.closest('.photo-card');
            if (parentCard) {
                const cat = Array.from(parentCard.classList).find(c => c !== 'photo-card');
                const catBtn = document.getElementById(`btn-${cat}`);
                if (catBtn) filterGallery(cat, { target: catBtn });
            }
            
            openModal(targetImg);
        } else {
            showTab('home');
        }
    }
}

// Listen to URL changes and page loads
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
