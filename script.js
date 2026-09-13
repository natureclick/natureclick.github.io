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

    setupInteractions(currentPhotoId);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Like & Share Logic
function setupInteractions(id) {
    // 1. Fetch Likes from CounterAPI (Live & Working API)
    fetch(`https://api.counterapi.dev/v1/natureclick_munna/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("likeCount").innerText = data.count || 0;
        })
        .catch(() => {
            // Local fallback
            let localLikes = localStorage.getItem('like_' + id) || 0;
            document.getElementById("likeCount").innerText = localLikes;
        });

    // 2. Setup Social Share Links
    const currentURL = window.location.href;
    const shareText = encodeURIComponent("Check out this photo on Nature Click by Munna: ");
    
    document.getElementById("shareWA").href = `https://api.whatsapp.com/send?text=${shareText}${encodeURIComponent(currentURL)}`;
    document.getElementById("shareFB").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
}

// Like Button Click Function
function registerLike() {
    if (!currentPhotoId) return;

    fetch(`https://api.counterapi.dev/v1/natureclick_munna/${currentPhotoId}/up`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("likeCount").innerText = data.count;
        })
        .catch(() => {
            let localLikes = parseInt(localStorage.getItem('like_' + currentPhotoId) || 0) + 1;
            localStorage.setItem('like_' + currentPhotoId, localLikes);
            document.getElementById("likeCount").innerText = localLikes;
        });
}

// Copy Link Function
function copyPhotoLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
    });
}
