import { icons } from './icons.js';
import { theme } from '../theme/theme.js';

export class Carousel {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.interval = null;
        this.themeCleanup = null;
    }

    init() {
        if (!this.container) {
            console.error('❌ Carousel: Container not found with ID:', this.containerId);
            return;
        }

        if (!this.images || this.images.length === 0) {
            console.error('❌ Carousel: No images provided or empty array');
            return;
        }

        this.render();
        this.startAutoSlide();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-2xl group">
                <div class="w-full h-full relative">
                    ${this.images.map((image, index) => `
                        <div class="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === this.currentIndex ? 'opacity-100' : 'opacity-0'}">
                            <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-black/40"></div>
                        </div>
                    `).join('')}
                </div>

                <div class="absolute bottom-5 left-1/2 -translate-x-1/2 text-white p-4 rounded-lg text-center bg-black/30 backdrop-blur-sm">
                    <h2 class="text-xl md:text-3xl font-bold">${this.images[this.currentIndex]?.alt}</h2>
                </div>

                <!-- Navigation Controls -->
                <button class="carousel-prev absolute top-1/2 -translate-y-1/2 left-4 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    ${icons.chevronLeft}
                </button>
                <button class="carousel-next absolute top-1/2 -translate-y-1/2 right-4 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    ${icons.chevronRight}
                </button>

                <!-- Indicators -->
                <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                    ${this.images.map((_, index) => `
                        <button class="carousel-indicator w-2 h-2 rounded-full transition-colors ${index === this.currentIndex ? 'bg-white' : 'bg-white/50'}"></button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    goToSlide(index) {
        if (index < 0 || index >= this.images.length) {
            console.error('❌ Carousel: Invalid slide index:', index);
            return;
        }

        this.currentIndex = index;
        this.render();
    }

    nextSlide() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.currentIndex = newIndex;
        this.render();
    }

    prevSlide() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.currentIndex = newIndex;
        this.render();
    }

    startAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setupEventListeners() {
    // Coba berbagai selector untuk menemukan button
    const prevBtnSelectors = ['.carousel-prev', 'button:first-child', '[class*="prev"]'];
    const nextBtnSelectors = ['.carousel-next', 'button:last-child', '[class*="next"]'];

    let prevBtn = null;
    let nextBtn = null;

    // Coba semua selector untuk prev button
    for (const selector of prevBtnSelectors) {
        prevBtn = this.container.querySelector(selector);
        if (prevBtn) break;
    }

    // Coba semua selector untuk next button
    for (const selector of nextBtnSelectors) {
        nextBtn = this.container.querySelector(selector);
        if (nextBtn) break;
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            this.stopAutoSlide();
            this.prevSlide();
            this.startAutoSlide();
        });
    } else {
        console.error('❌ Carousel: Previous button not found with any selector');
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        });
    } else {
        console.error('❌ Carousel: Next button not found with any selector');
    }

    // Indicators
    const indicators = this.container.querySelectorAll('.carousel-indicator');

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            this.stopAutoSlide();
            this.goToSlide(index);
            this.startAutoSlide();
        });
    });

    // Test event delegation sebagai fallback
    this.container.addEventListener('click', (e) => {
        // Cek jika klik pada button next/prev atau parent-nya
        if (e.target.closest('.carousel-next') || e.target.classList.contains('carousel-next')) {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        }

        if (e.target.closest('.carousel-prev') || e.target.classList.contains('carousel-prev')) {
            this.stopAutoSlide();
            this.prevSlide();
            this.startAutoSlide();
        }
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
        this.stopAutoSlide();
    });

    this.container.addEventListener('mouseleave', () => {
        this.startAutoSlide();
    });

    // Setup theme listener
    this.setupThemeListener();
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes
        this.themeCleanup = theme.registerListener(() => {
            // Re-render to ensure theme is applied correctly to content
            const currentIndex = this.currentIndex;
            this.render();
            this.currentIndex = currentIndex;

            // Restart auto slide after re-rendering
            this.startAutoSlide();
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    destroy() {
        this.stopAutoSlide();
        this.removeThemeListener(); // Remove theme listener
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}