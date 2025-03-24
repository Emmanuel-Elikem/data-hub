let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');

document.querySelectorAll('.slide-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const targetIndex = parseInt(btn.dataset.index);
        const currentIndex = getCurrentSlideIndex();
        
        if(targetIndex === currentIndex) return;
        
        const totalSlides = 4;
        let direction;
        let steps;
        
        // Calculate shortest path
        const forwardSteps = (targetIndex - currentIndex + totalSlides) % totalSlides;
        const backwardSteps = (currentIndex - targetIndex + totalSlides) % totalSlides;
        
        if(forwardSteps <= backwardSteps) {
            direction = 'next';
            steps = forwardSteps;
        } else {
            direction = 'prev';
            steps = backwardSteps;
        }
        
        // Animate each step with proper delays
        for(let i = 0; i < steps; i++) {
            await new Promise(resolve => {
                showSlider(direction);
                setTimeout(resolve, 300);
            });
        }
    });
});

function getCurrentSlideIndex() {
    return Array.from(SliderDom.querySelectorAll('.item'))
               .indexOf(SliderDom.querySelector('.item:first-child'));
}

function showSlider(type) {
    // 1. Move slides
    let slides = SliderDom.querySelectorAll('.item');
    if(type === 'next') {
        SliderDom.appendChild(slides[0]);
    } else {
        SliderDom.prepend(slides[slides.length - 1]);
    }

    // 2. Update thumbnails to match new order
    const newActiveSlideIndex = getCurrentSlideIndex();
    const thumbnails = thumbnailBorderDom.querySelectorAll('.item');
    const activeThumbnail = thumbnails[newActiveSlideIndex];
    
    // Move active thumbnail to end
    thumbnailBorderDom.appendChild(activeThumbnail);

    // 3. Trigger animations
    carouselDom.classList.add(type);
    setTimeout(() => {
        carouselDom.classList.remove(type);
    }, 300);
}