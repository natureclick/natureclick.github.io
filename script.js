let currentPhotoIndex = 0;
let visiblePhotos = [];

// Tab Navigation Logic
function showTab(tabId) {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    sections.forEach(sec => sec.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    const activeSection = document.getElementById(tabId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    const activeNav = document.getElementById('nav-' + tabId);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    if (tabId === 'photography') {
        const mountainBtn = document.getElementById('btn-mountain');
        if (mountainBtn) mountainBtn.click();
    }
}

// Category Filter
function filterGallery(category, event) {
    const photoCards = document.querySelectorAll('.photo-card');
    const catButtons = document.querySelectorAll('.cat-btn');

    catButtons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    photoCards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open Modal
function openModal(imgElement) {
    const activeSection = document.querySelector('section.active');
    const photoCards = Array.from(activeSection.querySelectorAll('.photo-card'));
    
    visiblePhotos = photoCards.filter(card => card.style.display !== 'none')
                              .map(card => card.querySelector('img'));

    currentPhotoIndex = visiblePhotos.indexOf(imgElement);

    if (currentPhotoIndex !== -1) {
        updateModalContent(visiblePhotos[currentPhotoIndex]);
        document.getElementById('imageModal').classList.add('active-modal');
    }
}

// Update Modal Data
function updateModalContent(img) {
    const modalImg = document.getElementById('fullImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalLocation = document.getElementById('modalLocation');
    const locationRow = document.getElementById('locationRow');
    const modalAltitude = document.getElementById('modalAltitude');
    const altitudeRow = document.getElementById('altitudeRow');
    const modalDesc = document.getElementById('modalDesc');

    modalImg.src = img.src;
    modalTitle.innerText = img.getAttribute('alt') || 'Untitled';

    const loc = img.getAttribute('data-location');
    if (loc) {
        modalLocation.innerText = loc;
        locationRow.style.display = 'flex';
    } else {
        locationRow.style.display = 'none';
    }

    const alt = img.getAttribute('data-altitude');
    if (alt) {
        modalAltitude.innerText = alt;
        altitudeRow.style.display = 'flex';
    } else {
        altitudeRow.style.display = 'none';
    }

    modalDesc.innerText = img.getAttribute('data-description') || '';

    // Scroll description to top when changing photo
    const scrollArea = document.querySelector('.desc-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
}

// Navigation between photos
function changePhoto(direction) {
    if (visiblePhotos.length === 0) return;

    currentPhotoIndex += direction;

    if (currentPhotoIndex >= visiblePhotos.length) {
        currentPhotoIndex = 0;
    } else if (currentPhotoIndex < 0) {
        currentPhotoIndex = visiblePhotos.length - 1;
    }

    updateModalContent(visiblePhotos[currentPhotoIndex]);
}

// Close Modal
function closeModal() {
    document.getElementById('imageModal').classList.remove('active-modal');
}

// Close when clicking background
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Keyboard controls (Esc, Left/Right arrows)
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.classList.contains('active-modal')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'ArrowRight') changePhoto(1);
    }
});
