let currentPhotoIndex = 0;
let visiblePhotos = [];

// Tab Navigation
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
        document.getElementById('imageModal').style.display = 'flex';
    }
}

// Update Modal Data
function updateModalContent(img) {
    const modalImg = document.getElementById('fullImg');
    const captionText = document.getElementById('caption');
    const locationText = document.getElementById('location');
    const altitudeText = document.getElementById('altitude');
    const descText = document.getElementById('description');

    modalImg.src = img.src;
    captionText.innerText = img.getAttribute('alt') || '';
    
    const loc = img.getAttribute('data-location');
    locationText.innerText = loc ? '📍 ' + loc : '';

    const alt = img.getAttribute('data-altitude');
    altitudeText.innerText = alt ? '🏔️ ' + alt : '';

    descText.innerText = img.getAttribute('data-description') || '';
}

// Slider Controls
function changePhoto(direction, event) {
    if (event) event.stopPropagation();

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
    document.getElementById('imageModal').style.display = 'none';
}

// Keyboard controls (Esc, Left/Right arrows)
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'ArrowRight') changePhoto(1);
    }
});
