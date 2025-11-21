import { dataService } from '../services/dataService.js';
import { modal_locasi } from '../components/ui/modal_locasi.js';
import { Card } from '../components/card.js';
import { theme } from '../components/theme/theme.js';

export class KotaPage {
    constructor() {
        this.kotaList = [];
        this.kulinerList = [];
        this.wisataList = [];
        this.selectedItem = null;
        this.selectedKotaId = null;
        this.loading = true;
        this.themeCleanup = null;
    }

    async init(container) {
        this.container = container;

        // Get kota ID from URL hash (e.g., #kota/surabaya)
        const hash = window.location.hash.replace('#', '');
        if (hash.startsWith('kota/')) {
            this.selectedKotaId = hash.split('/')[1];
        }

        await this.loadData();
        this.render();
        this.setupEventListeners();
        this.setupThemeListener();
    }

    async loadData() {
        this.loading = true;
        this.render(); // Show loading

        const [kotaData, kulinerData, wisataData] = await Promise.all([
            dataService.getKota(),
            dataService.getKuliner(),
            dataService.getWisata()
        ]);
        
        this.kotaList = kotaData;
        this.kulinerList = kulinerData;
        this.wisataList = wisataData;
        this.loading = false;
        
        this.render(); // Re-render with data
    }

    getSelectedKota() {
        return this.selectedKotaId 
            ? this.kotaList.find(k => k.id === this.selectedKotaId)
            : null;
    }

    getKotaKuliner() {
        const selectedKota = this.getSelectedKota();
        return selectedKota 
            ? this.kulinerList.filter(k => k.kota === selectedKota.nama)
            : [];
    }

    getKotaWisata() {
        const selectedKota = this.getSelectedKota();
        return selectedKota 
            ? this.wisataList.filter(w => w.kota === selectedKota.nama)
            : [];
    }

    handleDetailClick(item) {
        this.selectedItem = item;
        this.showItemModal();
    }

    closeItemModal() {
        this.selectedItem = null;
    }

    showItemModal() {
        if (!this.selectedItem) return;

        modal_locasi.open(this.selectedItem.nama, this.selectedItem);
    }

    navigateToKotaDetail(kotaId) {
        this.selectedKotaId = kotaId;
        window.location.hash = `kota/${kotaId}`;
        this.render();
        this.setupEventListeners();
    }

    navigateToKotaList() {
        this.selectedKotaId = null;
        window.location.hash = 'kota';
        this.render();
        this.setupEventListeners();
    }

    setSelectedKota(kotaId) {
        this.selectedKotaId = kotaId;
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="text-center p-8">Memuat data kota...</div>';
            return;
        }

        const selectedKota = this.getSelectedKota();

        if (selectedKota) {
            this.renderKotaDetail(selectedKota);
        } else {
            this.renderKotaList();
        }
    }

    renderKotaDetail(selectedKota) {
        const kotaKuliner = this.getKotaKuliner();
        const kotaWisata = this.getKotaWisata();

        this.container.innerHTML = `
            <div class="space-y-8">
                <button class="back-button text-primary-600 dark:text-primary-400 hover:underline">&larr; Kembali ke Daftar Kota</button>
                
                <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <img src="${selectedKota.gambar}" alt="${selectedKota.nama}" class="w-full h-72 object-cover rounded-md mb-6" />
                    <h1 class="text-4xl font-bold text-gray-800 dark:text-white">${selectedKota.nama}</h1>
                    <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">Populasi: ${selectedKota.populasi.toLocaleString('id-ID')}</p>
                    <p class="mt-4 text-gray-700 dark:text-gray-300">${selectedKota.deskripsi}</p>
                </div>

                ${kotaKuliner.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Kuliner Khas</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="kota-kuliner-cards">
                            ${kotaKuliner.map(kuliner => {
                                const card = new Card(
                                    { ...kuliner, type: 'kuliner' },
                                    (item) => this.handleDetailClick(item)
                                );
                                return card.render();
                            }).join('')}
                        </div>
                    </section>
                ` : ''}
                
                ${kotaWisata.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Destinasi Wisata</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="kota-wisata-cards">
                            ${kotaWisata.map(wisata => {
                                const card = new Card(
                                    { ...wisata, type: 'wisata' },
                                    (item) => this.handleDetailClick(item)
                                );
                                return card.render();
                            }).join('')}
                        </div>
                    </section>
                ` : ''}
            </div>
        `;

        // Setup event listeners untuk cards
        this.setupCardsEventListeners();
    }

    renderKotaList() {
        this.container.innerHTML = `
            <div class="space-y-8">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Kota-kota di Jawa Timur</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Pilih kota untuk melihat detailnya.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="kota-list-cards">
                    ${this.kotaList.map(kota => `
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                            <img class="h-48 w-full object-cover" src="${kota.gambar}" alt="${kota.nama}" />
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${kota.nama}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${kota.deskripsi}</p>
                                <div class="mt-4">
                                    <button class="kota-detail-btn w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" data-kota-id="${kota.id}">
                                        Jelajahi Kota
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupCardsEventListeners() {
        // Setup event listeners untuk kuliner cards
        const kulinerContainer = document.getElementById('kota-kuliner-cards');
        if (kulinerContainer) {
            const kulinerCards = kulinerContainer.querySelectorAll('.card');
            kulinerCards.forEach((cardElement, index) => {
                const kuliner = this.getKotaKuliner()[index];
                if (kuliner) {
                    Card.setupEventListeners(
                        cardElement, 
                        (item) => this.handleDetailClick(item)
                    );
                }
            });
        }

        // Setup event listeners untuk wisata cards
        const wisataContainer = document.getElementById('kota-wisata-cards');
        if (wisataContainer) {
            const wisataCards = wisataContainer.querySelectorAll('.card');
            wisataCards.forEach((cardElement, index) => {
                const wisata = this.getKotaWisata()[index];
                if (wisata) {
                    Card.setupEventListeners(
                        cardElement, 
                        (item) => this.handleDetailClick(item)
                    );
                }
            });
        }
    }

    setupEventListeners() {
        // Back button - selalu setup fresh
        const backButton = this.container.querySelector('.back-button');
        if (backButton) {
            // Hapus semua event listener lama dengan clone
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);

            // Tambah listener baru
            newBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.navigateToKotaList();
            });
        }

        // Kota detail buttons
        const kotaDetailButtons = this.container.querySelectorAll('.kota-detail-btn');
        kotaDetailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const kotaId = e.target.dataset.kotaId;
                this.navigateToKotaDetail(kotaId);
            });
        });
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes
        this.themeCleanup = theme.registerListener(() => {
            // Re-render to ensure correct theme is applied to dynamically generated content
            this.render();
            this.setupEventListeners();
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    destroy() {
        // Cleanup
        this.selectedItem = null;
        this.removeThemeListener();
    }
}