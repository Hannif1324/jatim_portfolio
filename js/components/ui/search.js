import { debounce } from '../../utils/debounce.js';
import { icons } from './icons.js';
import { dataService } from '../../services/dataService.js';
import { theme } from '../theme/theme.js';

export class Search {
    constructor() {
        this.query = '';
        this.results = [];
        this.isOpen = false;
        this.activeIndex = -1;
        this.searchRef = null;
        this.resultsRef = [];
        this.themeCleanup = null;
    }

    init(container) {
        this.container = container;
        this.render();
        this.setupEventListeners();
        this.setupThemeListener();
    }

    render() {
        this.container.innerHTML = `
            <div class="relative w-full lg:w-64">
                <div class="relative">
                    <input 
                        type="text" 
                        id="search-input"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Cari kota, wisata, kuliner..."
                        autocomplete="off"
                    >
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        ${icons.search}
                    </div>
                </div>
                <div id="search-results" class="hidden absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-80 overflow-y-auto z-50"></div>
            </div>
        `;

        this.searchRef = this.container.querySelector('#search-input');
        this.resultsContainer = this.container.querySelector('#search-results');
    }

    async performSearch(searchQuery) {
        if (searchQuery.length < 2) {
            return [];
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const [kota, kuliner, wisata] = await Promise.all([
            dataService.getKota(),
            dataService.getKuliner(), 
            dataService.getWisata()
        ]);

        const kotaResults = kota.filter(k => 
            k.nama.toLowerCase().includes(lowerCaseQuery)
        ).map(k => ({ ...k, type: 'kota' }));

        const kulinerResults = kuliner.filter(k => 
            k.nama.toLowerCase().includes(lowerCaseQuery)
        ).map(k => ({ ...k, type: 'kuliner' }));

        const wisataResults = wisata.filter(w => 
            w.nama.toLowerCase().includes(lowerCaseQuery)
        ).map(w => ({ ...w, type: 'wisata' }));

        return [...kotaResults, ...kulinerResults, ...wisataResults].slice(0, 8);
    }

    highlightMatch(text, highlight) {
        if (!highlight.trim()) return text;
        
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() 
                ? `<strong class="font-bold text-primary-500">${part}</strong>`
                : part
        ).join('');
    }

    renderResults() {
        if (!this.resultsContainer) return;

        if (this.results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada hasil ditemukan
                </div>
            `;
        } else {
            this.resultsContainer.innerHTML = this.results.map((result, index) => `
                <button 
                    class="search-result w-full text-left px-4 py-2 flex justify-between items-center transition-colors ${
                        this.activeIndex === index 
                            ? 'bg-gray-100 dark:bg-gray-700' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    } text-gray-800 dark:text-white"
                    data-index="${index}"
                >
                    <div>
                        <div class="font-semibold">${this.highlightMatch(result.nama, this.query)}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            ${result.type === 'kota' ? 'Kota' : result.kota}
                        </div>
                    </div>
                    <span class="text-xs capitalize px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        ${result.type}
                    </span>
                </button>
            `).join('');
        }

        this.resultsContainer.classList.remove('hidden');
        this.isOpen = true;
    }

    handleSelect(result) {
        this.query = '';
        this.results = [];
        this.isOpen = false;
        this.activeIndex = -1;
        
        if (this.searchRef) {
            this.searchRef.value = '';
        }
        if (this.resultsContainer) {
            this.resultsContainer.classList.add('hidden');
        }

        // Simpan data untuk filter otomatis
        const filterData = {
            type: result.type,
            kota: result.kota,
            nama: result.nama,
            id: result.id
        };
        
        // Simpan di sessionStorage agar bisa diakses oleh page tujuan
        sessionStorage.setItem('autoFilterData', JSON.stringify(filterData));
        
        // Navigate based on result type
        if (result.type === 'kota') {
            window.location.hash = `kota/${result.id}`;
        } else {
            window.location.hash = result.type;
        }
    }

    setupEventListeners() {
        if (!this.searchRef) return;

        const debouncedSearch = debounce(async (query) => {
            this.results = await this.performSearch(query);
            this.renderResults();
            this.activeIndex = -1;
        }, 300);

        // Input event
        this.searchRef.addEventListener('input', (e) => {
            this.query = e.target.value;
            if (this.query) {
                debouncedSearch(this.query);
            } else {
                this.results = [];
                this.isOpen = false;
                if (this.resultsContainer) {
                    this.resultsContainer.classList.add('hidden');
                }
            }
        });

        // Focus event
        this.searchRef.addEventListener('focus', () => {
            if (this.results.length > 0) {
                this.renderResults();
            }
        });

        // Keyboard navigation
        this.searchRef.addEventListener('keydown', (e) => {
            if (!this.isOpen || this.results.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.activeIndex = (this.activeIndex + 1) % this.results.length;
                this.renderResults();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.activeIndex = (this.activeIndex - 1 + this.results.length) % this.results.length;
                this.renderResults();
            } else if (e.key === 'Enter' && this.activeIndex >= 0) {
                e.preventDefault();
                this.handleSelect(this.results[this.activeIndex]);
            } else if (e.key === 'Escape') {
                this.isOpen = false;
                if (this.resultsContainer) {
                    this.resultsContainer.classList.add('hidden');
                }
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.isOpen = false;
                if (this.resultsContainer) {
                    this.resultsContainer.classList.add('hidden');
                }
            }
        });

        // Result click handling
        this.container.addEventListener('click', (e) => {
            const resultBtn = e.target.closest('.search-result');
            if (resultBtn) {
                const index = parseInt(resultBtn.dataset.index);
                this.handleSelect(this.results[index]);
            }
        });
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes
        this.themeCleanup = theme.registerListener(() => {
            // Re-render results to ensure correct theme is applied
            if (this.results && this.results.length > 0 && this.isOpen) {
                this.renderResults();
            }
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }
}