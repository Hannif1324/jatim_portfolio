import { dataService } from './services/dataService.js';
import { Layout } from './components/layout/layout.js';
import { HomePage } from './pages/homePage.js';
import { KotaPage } from './pages/kotaPage.js';
import { KulinerPage } from './pages/kulinerPage.js';
import { WisataPage } from './pages/wisataPage.js';
import { StatistikPage } from './pages/statistikPage.js';
import { TentangPage } from './pages/tentangPage.js';
import { theme } from './components/theme/theme.js';

export class App {
    constructor() {
        this.layout = null;
        this.currentPage = null;
        this.currentRoute = this.getCurrentRoute(); // Track current route
    }

    // Router - IMPROVED
    getCurrentRoute() {
        const hash = window.location.hash.slice(1); // Use slice instead of replace
        if (!hash || hash === 'home') return 'home';

        if (hash.startsWith('kota/')) {
            return 'kota'; // Return 'kota' for both list and detail
        }

        return hash.split('/')[0]; // Always return base route
    }

    getKotaIdFromRoute() {
        const hash = window.location.hash.slice(1);
        if (hash.startsWith('kota/')) {
            return hash.split('/')[1];
        }
        return null;
    }

    // NEW: Notify layout about route changes
    notifyRouteChange() {
        const newRoute = this.getCurrentRoute();
        
        // Only update if route actually changed
        if (newRoute !== this.currentRoute) {
            this.currentRoute = newRoute;
            
            // Notify layout to update navbar
            if (this.layout && this.layout.updateActiveRoute) {
                this.layout.updateActiveRoute(this.currentRoute);
            }
        }
    }

    async render() {
        const route = this.getCurrentRoute();

        // Hide loading
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Initialize layout if not exists
        if (!this.layout) {
            this.layout = new Layout(this);
            this.layout.init(document.getElementById('app'));
        }

        // NEW: Notify route change before rendering page
        this.notifyRouteChange();

        // Get page content container
        const pageContent = this.layout.getPageContentContainer();
        if (!pageContent) return;

        // Cleanup previous page
        if (this.currentPage && this.currentPage.destroy) {
            this.currentPage.destroy();
        }
        this.currentPage = null;

        // Load page based on route
        await this.loadPage(route, pageContent);
    }

    async loadPage(route, container) {
        try {
            switch (route) {
                case 'home':
                    this.currentPage = new HomePage();
                    await this.currentPage.init(container);
                    break;
                case 'kota':
                    this.currentPage = new KotaPage();
                    const kotaId = this.getKotaIdFromRoute();
                    if (kotaId && this.currentPage.setSelectedKota) {
                        this.currentPage.setSelectedKota(kotaId);
                    }
                    await this.currentPage.init(container);
                    break;
                case 'wisata':
                    this.currentPage = new WisataPage();
                    await this.currentPage.init(container);
                    break;
                case 'kuliner':
                    this.currentPage = new KulinerPage();
                    await this.currentPage.init(container);
                    break;
                case 'statistik':
                    this.currentPage = new StatistikPage();
                    await this.currentPage.init(container);
                    break;
                case 'tentang':
                    this.currentPage = new TentangPage();
                    await this.currentPage.init(container);
                    break;
                default:
                    container.innerHTML = `
                        <div class="text-center py-12">
                            <h1 class="text-2xl font-bold text-red-500 mb-4">Halaman tidak ditemukan</h1>
                            <a href="#home" class="text-primary-600 hover:underline">Kembali ke Beranda</a>
                        </div>
                    `;
            }
        } catch (error) {
            console.error('Error loading page:', error);
            container.innerHTML = `
                <div class="text-center py-12">
                    <h1 class="text-xl text-red-500 mb-4">Error loading page</h1>
                    <button onclick="location.reload()" class="bg-primary-600 text-white px-4 py-2 rounded-md">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }

    async init() {
        try {
            // Initialize theme FIRST
            theme.init();

            // Seed data
            await dataService.seedData();


            // Setup hash change listener - UPDATED
            window.addEventListener('hashchange', () => {
                this.notifyRouteChange(); // Notify first
                this.render(); // Then render
            });

            // Render initial page
            await this.render();

        } catch (error) {
            console.error('❌ App initialization failed:', error);
            this.showError('Gagal memuat aplikasi. Silakan refresh halaman.');
        }
    }

    showError(message) {
        const appElement = document.getElementById('app');
        const loadingElement = document.getElementById('loading');

        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        appElement.innerHTML = `
            <div class="flex items-center justify-center min-h-screen">
                <div class="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div class="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Terjadi Kesalahan</h2>
                    <p class="text-red-600 dark:text-red-300 mb-4">${message}</p>
                    <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
                        Coba Lagi
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize app ketika DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});