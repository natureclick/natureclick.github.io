// বর্তমান সিলেক্ট করা ক্যাটাগরি মনে রাখার জন্য গ্লোবাল ভ্যারিয়েবল
let currentCategory = '';

// প্রতিটা সেকশনের জন্য আলাদা পেজ টাইটেল (SEO ও ব্রাউজার ট্যাবের জন্য)
const pageTitles = {
    home: 'Nature Click - Photography Portfolio by Munna',
    photography: 'Photography Gallery | Nature Click',
    about: 'About Munna | Nature Click',
    contact: 'Contact | Nature Click'
};

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

    // ব্রাউজার ট্যাবের টাইটেল আপডেট করা হলো
    if (pageTitles[tabId]) {
        document.title = pageTitles[tabId];
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Photography পেজ ব্ল্যাংক/রিসেট করার ফাংশন (মেনু ক্লিকের জন্য)
function clearPhotographyView() {
    currentCategory = ''; // ক্যাটাগরি ক্লিয়ার করা হলো
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}

// Category Filtering System
function filterGallery(category, event) {
    currentCategory = category; // সিলেক্ট করা ক্যাটাগরি সেভ রাখা হলো
    
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        const activeBtn = document.getElementById(`btn-${category}`);
        if (activeBtn) activeBtn.classList.add('active');
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

    if (title) {
        document.title = `${title} | Nature Click`;
    }

    if (photoId) {
        window.location.hash = photoId;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.title = pageTitles.photography;

    // ছবি বন্ধ করলে আগের ফিল্টার করা ক্যাটাগরি বজায় থাকবে
    if (currentCategory) {
        filterGallery(currentCategory);
        window.location.hash = 'photography';
    } else {
        window.location.hash = 'photography';
    }
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
    } else if (hash === 'photography') {
        showTab('photography');
        if (currentCategory) {
            filterGallery(currentCategory);
        } else {
            clearPhotographyView();
        }
    } else if (['about', 'contact'].includes(hash)) {
        showTab(hash);
    } else {
        // Direct link to photo
        const targetImg = document.querySelector(`img[data-id="${hash}"]`);
        if (targetImg) {
            showTab('photography');
            
            const parentCard = targetImg.closest('.photo-card');
            if (parentCard) {
                const cat = Array.from(parentCard.classList).find(c => c !== 'photo-card');
                if (cat) filterGallery(cat);
            }
            
            openModal(targetImg);
        } else {
            showTab('home');
        }
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
