let currentImgIndex = 0;
let visibleImages = [];

function showTab(tabId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.getElementById('nav-' + tabId).classList.add('active');
}

function filterGallery(category, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalLocation = document.getElementById("modalLocation");
    const modalDesc = document.getElementById("modalDesc");

    // Get current visible gallery images
    visibleImages = Array.from(document.querySelectorAll('.photo-card'))
        .filter(card => card.style.display !== 'none')
        .map(card => card.querySelector('img'));

    currentImgIndex = visibleImages.indexOf(imgElement);

    updateModalData(imgElement);
    modal.style.display = "flex";
}

function updateModalData(imgElement) {
    const modalImg = document.getElementById("fullImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalLocation = document.getElementById("modalLocation");
    const modalDesc = document.getElementById("modalDesc");

    modalImg.src = imgElement.src;
    modalTitle.innerText = imgElement.alt || "Nature Click Photography";
    modalLocation.innerText = imgElement.getAttribute("data-location") || "Nature";
    modalDesc.innerText = imgElement.getAttribute("data-description") || "";
}

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

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Close Modal when clicking outside card
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
}
