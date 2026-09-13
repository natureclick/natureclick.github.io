// Tab Switching System with Dynamic URL Routing
function showTab(tabId, updateHash = true) {
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

    // Update URL hash when clicking navigation tabs
    if (updateHash) {
        if (tabId === 'home') {
            history.pushState("", document.title, window.location.pathname);
        } else {
            window.location.hash = tabId;
        }
    }

    if (tabId === 'photography') {
        const mountainBtn = document.getElementById('btn-mountain');
        if (mountainBtn) {
            filterGallery('mountain', { target: mountainBtn });
        }
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

// Image Modal System with Unique URL
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

    // Update URL Hash with photo ID
    if (photoId) {
        window.location.hash = photoId;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Reset URL Hash back to Photography tab when modal is closed
    window.location.hash = 'photography';
}

// Close Modal on Outside Click
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Handle Direct Links & Page Reloads (Deep Linking)
function handleRouting() {
    const hash = window.location.hash.substring(1);

    if (!hash || hash === 'home') {
        showTab('home', false);
    } else if (['photography', 'about', 'contact'].includes(hash)) {
        showTab(hash, false);
    } else {
        // If hash belongs to a specific photo, open Photography tab + Photo Modal directly
        const targetImg = document.querySelector(`img[data-id="${hash}"]`);
        if (targetImg) {
            showTab('photography', false);
            
            // Auto-select correct category filter for the target photo
            const parentCard = targetImg.closest('.photo-card');
            if (parentCard) {
                const categoryClass = Array.from(parentCard.classList).find(c => c !== 'photo-card');
                const catBtn = document.getElementById(`btn-${categoryClass}`);
                if (catBtn) filterGallery(categoryClass, { target: catBtn });
            }
            
            openModal(targetImg);
        } else {
            showTab('home', false);
        }
    }
}

// Event Listeners for Page Load and Browser Back/Forward buttons
window.addEventListener('DOMContentLoaded', handleRouting);
window.addEventListener('hashchange', handleRouting);
