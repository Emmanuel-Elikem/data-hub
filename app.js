// Replace your entire app.js with this
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);


document.addEventListener("DOMContentLoaded", function() {
    // --- AJAX Call to Load External HTML ---
    fetch('rotating.html')
      .then(response => response.text())
      .then(html => {
        // Insert the external HTML into the container
        document.getElementById('rotating-container').innerHTML = html;
      })
      .catch(error => console.error('Error loading rotating.html:', error));
});

// Direct slide buttons
document.querySelectorAll('.slide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetIndex = parseInt(btn.dataset.index);
        const currentIndex = getCurrentSlideIndex();
        
        if(targetIndex === currentIndex) return;
        
        const steps = (targetIndex > currentIndex) 
            ? targetIndex - currentIndex 
            : (4 - currentIndex) + targetIndex;
        
        for(let i = 0; i < steps; i++) {
            setTimeout(() => showSlider('next'), i * 300);
        }
    });
});

function getCurrentSlideIndex() {
    const firstSlideImg = SliderDom.querySelector('.item:first-child img').src;
    return Array.from(thumbnailItemsDom).findIndex(
        thumb => thumb.querySelector('img').src === firstSlideImg
    );
}

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = document.querySelectorAll('.thumbnail .item');
    
    if(type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, 300);
}

