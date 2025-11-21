import { dataService } from '../services/dataService.js';
import { modal_locasi } from '../components/ui/modal_locasi.js';
import { Card } from '../components/card.js';

export class WisataPage {
    constructor() {
        this.wisataList = [];
        this.kotaList = [];
        this.filterKota = 'all';
        this.loading = true;
        this.themeCleanup = null;

        // ✅ SAMA SEPERTI KULINERPAGE - untuk delegation & cleanup
        this._onGlobalChange = this._onGlobalChange.bind(this);
        this._delegationInstalled = false;
    }

    async init(container) {
        this.container = container;
        this.checkAutoFilter();
        await this.loadData();
        this.render();
        this.setupEventListeners();
        this.setupThemeListener();
    }

    checkAutoFilter() {
        const autoFilterData = sessionStorage.getItem('autoFilterData');
        if (autoFilterData) {
            try {
                const data = JSON.parse(autoFilterData);
                if (data.type === 'wisata' && data.kota) {
                    console.log('🔄 Auto-filter wisata by kota:', data.kota);
                    this.filterKota = data.kota;
                }
                sessionStorage.removeItem('autoFilterData');
            } catch (error) {
                console.error('Error parsing autoFilterData:', error);
                sessionStorage.removeItem('autoFilterData');
            }
        }
    }

    async loadData() {
        this.loading = true;
        this.render();

        try {
            // ✅ SAMA SEPERTI KULINERPAGE - try multiple possible dataService method names
            const getWisataFn =
                (dataService && typeof dataService.getAllWisata === 'function' && dataService.getAllWisata.bind(dataService)) ||
                (dataService && typeof dataService.getWisata === 'function' && dataService.getWisata.bind(dataService)) ||
                (dataService && typeof dataService.getAll === 'function' && (() => dataService.getAll('wisata'))) ||
                (dataService && typeof dataService.getCollection === 'function' && (() => dataService.getCollection('wisata'))) ||
                null;

            const getKotaFn =
                (dataService && typeof dataService.getAllKota === 'function' && dataService.getAllKota.bind(dataService)) ||
                (dataService && typeof dataService.getKota === 'function' && dataService.getKota.bind(dataService)) ||
                (dataService && typeof dataService.getAll === 'function' && (() => dataService.getAll('kota'))) ||
                (dataService && typeof dataService.getCollection === 'function' && (() => dataService.getCollection('kota'))) ||
                null;

            if (!getWisataFn && !getKotaFn) {
                throw new Error('No suitable dataService methods found for wisata/kota. Check dataService exports.');
            }

            const wisataPromise = getWisataFn ? Promise.resolve(getWisataFn()) : Promise.resolve([]);
            const kotaPromise = getKotaFn ? Promise.resolve(getKotaFn()) : Promise.resolve([]);

            const [wisataData, kotaData] = await Promise.all([wisataPromise, kotaPromise]);

            // ✅ SAMA SEPERTI KULINERPAGE - normalize results
            this.wisataList = Array.isArray(wisataData) ? wisataData : (wisataData && Array.isArray(wisataData.data) ? wisataData.data : []);
            this.kotaList = Array.isArray(kotaData) ? kotaData : (kotaData && Array.isArray(kotaData.data) ? kotaData.data : []);

        } catch (err) {
            console.error('Error loading wisata data (robust loader):', err);
            try {
                if (Notification && typeof Notification.show === 'function') {
                    Notification.show('Gagal memuat data wisata. Periksa console.', 'error');
                }
            } catch (e) { /* ignore */ }
            this.wisataList = [];
            this.kotaList = [];
        }

        this.loading = false;
        this.render();
    }

    handleDetailClick(item) {
        console.log('📍 Opening modal for:', item.nama);
        try {
            if (modal_locasi && typeof modal_locasi.show === 'function') {
                modal_locasi.show(item);
            } else if (modal_locasi && typeof modal_locasi.open === 'function') {
                modal_locasi.open(item.nama || item.title || '', item);
            } else {
                alert(`${item.nama || item.title}\n${item.kota || ''}\n\nDeskripsi singkat tidak tersedia.`);
            }
        } catch (err) {
            console.error('Error opening modal for item:', err, item);
        }
    }

    getFilteredWisata() {
        if (!Array.isArray(this.wisataList)) return [];

        if (!this.filterKota || this.filterKota === 'all') return this.wisataList;

        const normalizedFilter = String(this.filterKota).trim().toLowerCase();

        return this.wisataList.filter(w => {
            const kota = (w.kota || '').toString().trim().toLowerCase();
            return kota === normalizedFilter;
        });
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="text-center p-8">Memuat data wisata...</div>';
            return;
        }

        const filteredWisata = this.getFilteredWisata();

        this.container.innerHTML = `
            <div class="space-y-8 fade-in">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Destinasi Wisata di Jawa Timur</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Jelajahi keindahan alam dan buatan yang memukau.</p>
                </div>

                <div class="flex justify-center">
                    <select
                        id="kota-filter"
                        class="p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 text-gray-800 dark:text-white"
                    >
                        <option value="all">Semua Kota</option>
                        ${this.kotaList.map(kota => `
                            <option value="${kota.nama}" ${this.filterKota === kota.nama ? 'selected' : ''}>${kota.nama}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="wisata-cards-container">
                    ${filteredWisata.map(wisata => {
                        const card = new Card(
                            { ...wisata, type: 'wisata' },
                            (item) => this.handleDetailClick(item)
                        );
                        return card.render();
                    }).join('')}
                </div>

                ${filteredWisata.length === 0 ? `
                    <div class="text-center py-12">
                        <p class="text-gray-500 dark:text-gray-400">Tidak ada wisata ditemukan.</p>
                    </div>
                ` : ''}
            </div>
        `;

        this.setupCardsEventListeners();
    }

    setupCardsEventListeners() {
        const cardsContainer = document.getElementById('wisata-cards-container');
        if (cardsContainer) {
            const cardElements = cardsContainer.querySelectorAll('.card');
            console.log(`🔄 Found ${cardElements.length} cards to setup`);
            
            cardElements.forEach((cardElement, index) => {
                const wisata = this.getFilteredWisata()[index];
                if (wisata) {
                    console.log(`📍 Setting up card for: ${wisata.nama}`);
                    Card.setupEventListeners(
                        cardElement, 
                        (item) => this.handleDetailClick(item)
                    );
                }
            });
        }
    }

    setupEventListeners() {
        // ✅ SAMA PERSIS SEPERTI KULINERPAGE - pasang sekali per instance
        if (this._delegationInstalled) {
            return;
        }
        this._delegationInstalled = true;

        // ✅ Delegasi di level document (sama seperti kuliner)
        document.addEventListener('change', this._onGlobalChange, true);
    }

    // ✅ SAMA PERSIS SEPERTI KULINERPAGE - handler delegasi
    _onGlobalChange(e) {
        try {
            const sel = e.target.closest && e.target.closest('#kota-filter');
            if (!sel) return;

            // ensure the select belongs to this page's container
            if (!this.container || !this.container.contains(sel)) {
                return;
            }

            this.filterKota = sel.value;

            // debounce render
            if (this._renderTimer) clearTimeout(this._renderTimer);
            this._renderTimer = setTimeout(() => {
                this.render();
            }, 80);

        } catch (err) {
            console.error('WisataPage _onGlobalChange error:', err);
        }
    }

    setupThemeListener() {
        // Implementasi theme listener jika diperlukan
        // Sama seperti di KulinerPage
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    destroy() {
        this.removeThemeListener && this.removeThemeListener();

        // ✅ SAMA PERSIS SEPERTI KULINERPAGE - remove delegated listener
        if (this._delegationInstalled) {
            try {
                document.removeEventListener('change', this._onGlobalChange, true);
            } catch (e) { /* ignore */ }
            this._delegationInstalled = false;
        }

        // clear timer jika ada
        if (this._renderTimer) {
            clearTimeout(this._renderTimer);
            this._renderTimer = null;
        }
    }
}