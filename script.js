let currentPhotoId = "";

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
    
    currentPhotoId = imgElement.getAttribute("data-id");
    const location = imgElement.getAttribute("data-location");
    const desc = imgElement.getAttribute("data-description");
    
    captionText.innerHTML = `<h2>${imgElement.alt}</h2><p><strong>Location:</strong> ${location}</p><p>${desc}</p>`;

    // Update Social Links & Likes
    setupInteractions(currentPhotoId);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Like and Share logic
function setupInteractions(id) {
    // Fetch Likes
    fetch(`https://api.countapi.xyz/get/natureclick_portfolio/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("likeCount").innerText = data.value || 0;
        })
        .catch(() => document.getElementById("likeCount").innerText = 0);

    // Set Share URLs
    const currentURL = window.location.href;
    document.getElementById("shareWA").href = `https://api.whatsapp.com/send?text=Check out this photo on Nature Click: ${currentURL}`;
    document.getElementById("shareFB").href = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
}

function registerLike() {
    fetch(`https://api.countapi.xyz/hit/natureclick_portfolio/${currentPhotoId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("likeCount").innerText = data.value;
        });
}

function copyPhotoLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Photo page link copied to clipboard!");
}
