import { dataService } from '../services/dataService.js';
import { modal_locasi } from '../components/ui/modal_locasi.js';
import { Card } from '../components/card.js';

export class KulinerPage {
    constructor() {
        this.kulinerList = [];
        this.kotaList = [];
        this.filterKota = 'all';
        this.loading = true;
        this.themeCleanup = null;

        // untuk delegation & cleanup
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
                if (data.type === 'kuliner' && data.kota) {
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
            // try multiple possible dataService method names (best-effort)
            const getKulinerFn =
                (dataService && typeof dataService.getAllKuliner === 'function' && dataService.getAllKuliner.bind(dataService)) ||
                (dataService && typeof dataService.getKuliner === 'function' && dataService.getKuliner.bind(dataService)) ||
                (dataService && typeof dataService.getAll === 'function' && (() => dataService.getAll('kuliner'))) ||
                // LocalBase style helper (if implemented)
                (dataService && typeof dataService.getCollection === 'function' && (() => dataService.getCollection('kuliner'))) ||
                null;

            const getKotaFn =
                (dataService && typeof dataService.getAllKota === 'function' && dataService.getAllKota.bind(dataService)) ||
                (dataService && typeof dataService.getKota === 'function' && dataService.getKota.bind(dataService)) ||
                (dataService && typeof dataService.getAll === 'function' && (() => dataService.getAll('kota'))) ||
                (dataService && typeof dataService.getCollection === 'function' && (() => dataService.getCollection('kota'))) ||
                null;

            // If both are null, throw so we land in catch and show error nicely
            if (!getKulinerFn && !getKotaFn) {
                throw new Error('No suitable dataService methods found for kuliner/kota. Check dataService exports.');
            }

            // Call both safely (use [] for missing to still resolve)
            const kulinerPromise = getKulinerFn ? Promise.resolve(getKulinerFn()) : Promise.resolve([]);
            const kotaPromise = getKotaFn ? Promise.resolve(getKotaFn()) : Promise.resolve([]);

            const [kulinerData, kotaData] = await Promise.all([kulinerPromise, kotaPromise]);

            // normalize results: LocalBase may return {data: [...] } or array directly
            this.kulinerList = Array.isArray(kulinerData) ? kulinerData : (kulinerData && Array.isArray(kulinerData.data) ? kulinerData.data : []);
            this.kotaList = Array.isArray(kotaData) ? kotaData : (kotaData && Array.isArray(kotaData.data) ? kotaData.data : []);

        } catch (err) {
            console.error('Error loading kuliner data (robust loader):', err);
            try {
                if (Notification && typeof Notification.show === 'function') {
                    Notification.show('Gagal memuat data kuliner. Periksa console.', 'error');
                }
            } catch (e) { /* ignore */ }
            // keep lists empty so render shows "Tidak ada kuliner ditemukan"
            this.kulinerList = [];
            this.kotaList = [];
        }

        this.loading = false;
        this.render();
    }

    handleDetailClick(item) {
        // call modal_locasi.show || modal_locasi.open || fallback alert
        try {
            if (modal_locasi && typeof modal_locasi.show === 'function') {
                modal_locasi.show(item);
            } else if (modal_locasi && typeof modal_locasi.open === 'function') {
                modal_locasi.open(item.nama || item.title || '', item);
            } else {
                // safe fallback — avoid crashing
                alert(`${item.nama || item.title}\n${item.kota || ''}\n\nDeskripsi singkat tidak tersedia.`);
            }
        } catch (err) {
            console.error('Error opening modal for item:', err, item);
        }
    }

    getFilteredKuliner() {
        if (this.filterKota === 'all') {
            return this.kulinerList;
        }
        return this.kulinerList.filter(k => k.kota === this.filterKota);
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="text-center p-8">Memuat data kuliner...</div>';
            return;
        }

        const filteredKuliner = this.getFilteredKuliner();

        this.container.innerHTML = `
            <div class="space-y-8 fade-in">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Kuliner Jawa Timur</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Nikmati citarasa khas setiap kota.</p>
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

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="kuliner-cards-container">
                    ${filteredKuliner.map(item => {
                        const card = new Card(
                            { ...item, type: 'kuliner' },
                            (clickedItem) => this.handleDetailClick(clickedItem)
                        );
                        return card.render();
                    }).join('')}
                </div>

                ${filteredKuliner.length === 0 ? `
                    <div class="text-center py-12">
                        <p class="text-gray-500 dark:text-gray-400">Tidak ada kuliner ditemukan.</p>
                    </div>
                ` : ''}
            </div>
        `;

        this.setupCardsEventListeners();
    }

    setupCardsEventListeners() {
        const cardsContainer = document.getElementById('kuliner-cards-container');
        if (cardsContainer) {
            const cardElements = cardsContainer.querySelectorAll('.card');            
            cardElements.forEach((cardElement, index) => {
                const kuliner = this.getFilteredKuliner()[index];
                if (kuliner) {
                    Card.setupEventListeners(
                        cardElement, 
                        (item) => this.handleDetailClick(item)
                    );
                }
            });
        }
    }

    setupEventListeners() {
        // pasang sekali per instance — jika sudah terpasang, skip
        if (this._delegationInstalled) {
            return;
        }
        this._delegationInstalled = true;

        // Delegasi di level document (lebih aman). Kita pastikan event berasal dari dalam container.
        document.addEventListener('change', this._onGlobalChange, true);
    }

    // handler delegasi
    _onGlobalChange(e) {
        try {
            // cari element select dalam event path
            const sel = e.target.closest && e.target.closest('#kota-filter');
            if (!sel) return; // not our event

            // ensure the select belongs to this page's container (avoid catching other pages)
            if (!this.container || !this.container.contains(sel)) {
                return;
            }

            // update state and render (debounced slightly to avoid double-render storms)
            this.filterKota = sel.value;

            // optional very small debounce to let current event settle
            if (this._renderTimer) clearTimeout(this._renderTimer);
            this._renderTimer = setTimeout(() => {
                this.render();
            }, 80);

        } catch (err) {
            console.error('KulinerPage _onGlobalChange error:', err);
        }
    }

    setupThemeListener() {
        // Implementasi theme listener jika diperlukan
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    destroy() {
        this.removeThemeListener && this.removeThemeListener();

        // remove delegated listener
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