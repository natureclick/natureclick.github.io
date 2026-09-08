let currentCategory = 'mountain';

function showTab(tabId, updateHash = true) {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    sections.forEach(sec => sec.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    const targetSection = document.getElementById(tabId);
    const targetNav = document.getElementById('nav-' + tabId);

    if (targetSection) targetSection.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    if (tabId === 'photography') {
        filterGallery(currentCategory, null, false);
        if (updateHash) window.location.hash = currentCategory;
    } else if (updateHash) {
        window.location.hash = tabId;
    }
}

function filterGallery(category, evt, updateHash = true) {
    currentCategory = category;
    const cards = document.querySelectorAll('.photo-card');
    const catBtns = document.querySelectorAll('.cat-btn');

    catBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + category) || (evt ? evt.target : null);
    if (activeBtn) activeBtn.classList.add('active');

    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    if (updateHash) window.location.hash = category;
}

function openModal(imgElement, updateHash = true) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("fullImg");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    
    var title = imgElement.alt || "";
    var location = imgElement.getAttribute("data-location") || "";
    var desc = imgElement.getAttribute("data-description") || "";
    var photoId = imgElement.getAttribute("data-id") || encodeURIComponent(title);
    
    let locationHTML = location ? `<span class="modal-location">📍 ${location}</span>` : '';

    captionText.innerHTML = `
        <span class="modal-title">${title}</span>
        ${locationHTML}
        <span class="modal-desc">${desc}</span>
    `;

    if (updateHash) window.location.hash = 'photo-' + photoId;
}

function closeModal(updateHash = true) {
    document.getElementById("imageModal").style.display = "none";
    if (updateHash) window.location.hash = currentCategory;
}

function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
        showTab('home', false);
        return;
    }

    if (hash.startsWith('photo-')) {
        const photoId = hash.replace('photo-', '');
        showTab('photography', false);
        const targetImg = document.querySelector(`img[data-id="${photoId}"]`);
        if (targetImg) {
            const parentCard = targetImg.closest('.photo-card');
            const classes = Array.from(parentCard.classList);
            const category = classes.find(c => c !== 'photo-card');
            if (category) filterGallery(category, null, false);
            openModal(targetImg, false);
        }
    } else if (['mountain', 'animal', 'bird', 'flower'].includes(hash)) {
        showTab('photography', false);
        filterGallery(hash, null, false);
    } else if (['home', 'photography', 'about', 'contact'].includes(hash)) {
        showTab(hash, false);
    }
}

window.addEventListener('load', handleHashChange);
window.addEventListener('hashchange', handleHashChange);
