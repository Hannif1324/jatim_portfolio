// js/components/ui/modal_locasi.js
import { Notification } from '../../components/ui/notification.js';

class ModalLocasi {
    constructor() {
        this.isOpen = false;
        this.currentItem = null;
    }

    async open(title, item) {
        this.currentItem = item;
        this.isOpen = true;

        // Remove existing modal if present
        const existingModal = document.getElementById('modal-locasi');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'modal-locasi';
        modal.className = 'modal-locasi fixed inset-0 z-50 overflow-y-auto';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.backdropFilter = 'blur(4px)';

        // Generate modal content based on item type
        const modalContent = await this.generateModalContent(item);

        modal.innerHTML = `
            <div class="modal-container relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 w-full sm:mt-0">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold leading-6 text-gray-900 dark:text-white">${title}</h3>
                                    ${item.kota ? `<p class="text-gray-600 dark:text-gray-400 mt-1">📍 ${item.kota}</p>` : ''}
                                </div>
                                <div class="flex space-x-2 ml-4">
                                    <button
                                        class="close-modal p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        aria-label="Tutup"
                                    >
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="modal-content mt-4">
                                ${modalContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body
        document.body.appendChild(modal);

        // Setup event listeners
        this.setupEventListeners(modal);
    }

    async generateModalContent(item) {
        let content = '';

        // Main image and basic info side by side on desktop
        content += `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Main Image -->
                <div class="lg:col-span-2">
                    ${this.generateMainImage(item)}
                </div>

                <!-- Quick Info Card -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    ${this.generateQuickInfo(item)}
                </div>
            </div>
        `;

        // Maps and Location Section
        content += `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Maps Section -->
                <div class="space-y-4">
                    ${await this.generateLocationInfo(item)}
                </div>

                <!-- Additional Details -->
                <div class="space-y-4">
                    ${this.generateAdditionalInfo(item)}
                </div>
            </div>
        `;

        // Description
        if (item.deskripsi) {
            content += `
                <div class="description-section mt-6">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Deskripsi</h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${item.deskripsi}</p>
                </div>
            `;
        }

        return content;
    }

    generateMainImage(item) {
        if (!item.gambar) return '';

        return `
            <div class="modal-image">
                <img src="${item.gambar}"
                     alt="${item.nama}"
                     class="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                     onclick="this.classList.toggle('scale-150')">
                ${this.generateImageOverlay(item)}
            </div>
        `;
    }

    generateImageOverlay(item) {
        // Price badge removed from image to avoid overlapping with close button
        return '';
    }

    generateQuickInfo(item) {
        let infoContent = '';

        // Rating with improved display
        if (item.rating) {
            infoContent += `
                <div class="info-item mb-4">
                    <label class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Rating</label>
                    <div class="flex items-center">
                        <div class="flex text-yellow-400">
                            ${this.generateStarRating(item.rating)}
                        </div>
                        <span class="ml-2 text-gray-900 dark:text-white font-bold">${item.rating}</span>
                        <span class="text-gray-500 dark:text-gray-400 ml-1">/5</span>
                    </div>
                </div>
            `;
        }

        // Category with icon
        if (item.kategori) {
            infoContent += `
                <div class="info-item mb-4">
                    <label class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Kategori</label>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        <p class="text-gray-900 dark:text-white font-medium">${item.kategori}</p>
                    </div>
                </div>
            `;
        }

        // Population for cities
        if (item.populasi) {
            infoContent += `
                <div class="info-item mb-4">
                    <label class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Populasi</label>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <p class="text-gray-900 dark:text-white font-medium">${item.populasi.toLocaleString('id-ID')} jiwa</p>
                    </div>
                </div>
            `;
        }

        return infoContent || `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>Tidak ada informasi tambahan</p>
            </div>
        `;
    }

    generateAdditionalInfo(item) {
        let additionalContent = '';

        // helper kecil supaya kode tidak berantakan
        const kategori = (item.kategori || '').toLowerCase();
        const isKuliner = item.type === 'kuliner' || ['makanan', 'minuman'].some(k => kategori.includes(k));
        const isWisata = item.type === 'wisata' || kategori.includes('wisata');

        // Show price information in a dedicated section
        if ((item.harga && isKuliner) || (item.hargaTiket && isWisata)) {
            const price = item.harga ?? item.hargaTiket;
            const priceLabel = item.harga ? 'Harga Per Porsi' : 'Harga Tiket Masuk';
            const priceIcon = item.harga
                ? `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>`
                : `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>`;

            additionalContent += `
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center">
                        ${priceIcon}
                        ${priceLabel}
                    </h4>
                    <p class="text-yellow-700 dark:text-yellow-300 text-lg font-bold">
                        ${this.formatCurrency(price)}
                    </p>
                </div>
            `;
        }


        // Type specific additional info
        if (item.type === 'kuliner' || ['makanan', 'minuman'].some(k => item.kategori?.toLowerCase().includes(k))) {
            additionalContent += `
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Info Kuliner
                    </h4>
                    <p class="text-blue-700 dark:text-blue-300 text-sm">
                        Harga dapat bervariasi tergantung lokasi dan porsi. Disarankan untuk memesan langsung di tempat.
                    </p>
                </div>
            `;
        } else if (item.type === 'wisata' || item.kategori?.toLowerCase().includes('wisata')) {
            additionalContent += `
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Tips Wisata
                    </h4>
                    <p class="text-green-700 dark:text-green-300 text-sm">
                        Harga tiket dapat berubah. Disarankan untuk menghubungi langsung atau cek website resmi untuk info terbaru.
                    </p>
                </div>
            `;
        }

        return additionalContent;
    }

    async generateLocationInfo(item) {
    let locationContent = '';

    // Use mapsImage from dataService
    if (item.mapsImage) {
        locationContent += `
            <div class="location-map">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Lokasi
                </h4>
                <div class="map-container rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600">
                    <img src="${item.mapsImage}"
                         alt="Peta lokasi ${item.nama}"
                         class="w-full h-48 sm:h-56 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                         onclick="window.open('${item.mapsUrl}', '_blank')">
                    <div class="bg-white dark:bg-gray-800 p-3 text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Klik gambar untuk melihat peta interaktif</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Fallback sederhana - hanya tampilkan tombol buka maps
        locationContent += `
            <div class="location-map">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Lokasi
                </h4>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">Peta tidak tersedia</p>
                </div>
            </div>
        `;
    }

    // LANGSUNG gunakan mapsUrl dari dataService - TANPA FALLBACK
    const mapsUrl = item.mapsUrl;

    locationContent += `
        <div class="maps-action mt-4">
            <a href="${mapsUrl}"
               target="_blank"
               rel="noopener noreferrer"
               class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <span class="font-semibold">Buka di Google Maps</span>
            </a>
        </div>
    `;

    return locationContent;
    }

    // Format currency for Indonesian rupiah
    formatCurrency(amount) {
        if (!amount) return 'Tidak tersedia';

        // If already formatted as rupiah string, return as-is
        if (typeof amount === 'string' && amount.includes('Rp')) {
            return amount;
        }

        // If it's a number, format it properly
        let num;
        if (typeof amount === 'string') {
            // Extract numeric value from string (e.g., "Rp 15,000" or "15000")
            const numericValue = amount.replace(/[^\d,]/g, '').replace(',', '.');
            num = parseFloat(numericValue);
        } else {
            num = amount;
        }

        if (isNaN(num)) return 'Tidak tersedia';

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num);
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += `<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        }

        // Half star
        if (hasHalfStar) {
            stars += `<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><defs><linearGradient id="half-star"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += `<svg class="w-5 h-5 fill-current text-gray-300 dark:text-gray-600" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        }

        return stars;
    }

    setupEventListeners(modal) {
        // Close button
        const closeButton = modal.querySelector('.close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.close();
            });
        }

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });


        // Close on Escape key
        document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    }

    handleEscapeKey(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    close() {
        const modal = document.getElementById('modal-locasi');
        if (modal) {
            modal.remove();
        }
        this.isOpen = false;
        this.currentItem = null;

        // Remove escape event listener
        document.removeEventListener('keydown', this.handleEscapeKey);
    }
}

// Export the modal instance
export const modal_locasi = new ModalLocasi();