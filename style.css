let currentImgIndex = 0;
let visibleImages = [];

// Tab switching logic
function showTab(tabId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    const targetSection = document.getElementById(tabId);
    const targetNav = document.getElementById('nav-' + tabId);

    if (targetSection) targetSection.classList.add('active');
    if (targetNav) targetNav.classList.add('active');
    
    // Auto filter to first category when switching to Photography tab
    if (tabId === 'photography') {
        const mountainBtn = document.getElementById('btn-mountain');
        if (mountainBtn) mountainBtn.click();
    }
}

// Category Filtering logic
function filterGallery(category, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
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

// Modal Open Logic
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    
    // Get visible images based on active category
    visibleImages = Array.from(document.querySelectorAll('.photo-card'))
        .filter(card => getComputedStyle(card).display !== 'none')
        .map(card => card.querySelector('img'));

    currentImgIndex = visibleImages.indexOf(imgElement);
    if (currentImgIndex === -1) currentImgIndex = 0;

    updateModalData(imgElement);
    modal.classList.add('show');
}

// Update Modal Data
function updateModalData(imgElement) {
    if (!imgElement) return;

    const modalImg = document.getElementById("fullImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalLocation = document.getElementById("modalLocation");
    const modalDesc = document.getElementById("modalDesc");

    modalImg.src = imgElement.src;
    modalTitle.innerText = imgElement.alt || "Nature Click Photography";
    modalLocation.innerText = imgElement.getAttribute("data-location") || "Nature";
    modalDesc.innerText = imgElement.getAttribute("data-description") || "";
}

// Prev/Next Navigation
function changeImage(direction) {
    if (visibleImages.length === 0) return;
    
    currentImgIndex += direction;
    if (currentImgIndex < 0) {
        currentImgIndex = visibleImages.length - 1;
    } else if (currentImgIndex >= visibleImages.length) {
        currentImgIndex = 0;
    }
    
    updateModalData(visibleImages[currentImgIndex]);
}

// Modal Close
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.classList.remove('show');
}

// Close when clicking outside content area
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
}

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show mountain category by default
    filterGallery('mountain');
});
