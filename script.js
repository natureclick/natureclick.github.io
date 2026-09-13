function showTab(tabId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    document.getElementById('nav-' + tabId).classList.add('active');
}

function filterGallery(category, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImg");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    
    const location = imgElement.getAttribute("data-location");
    const desc = imgElement.getAttribute("data-description");
    
    captionText.innerHTML = `<h2>${imgElement.alt}</h2><p><strong>Location:</strong> ${location}</p><p>${desc}</p>`;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
