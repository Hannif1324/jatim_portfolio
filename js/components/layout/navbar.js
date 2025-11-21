import { Search } from '../ui/search.js';
import { icons } from '../ui/icons.js';
import { theme } from '../theme/theme.js';

export class Navbar {
    constructor(app) {
        this.app = app;
        this.searchDesktop = null;
        this.searchMobile = null;
        this.isMobileMenuOpen = false;
        this.currentRoute = this.getCurrentRoute();
    }

    init(container) {
        this.container = container;
        this.render();
        this.setupSearch();
        this.setupEventListeners();
        this.setupThemeListeners();
        this.setupRouteListener();
    }

    getCurrentRoute() {
        const hash = window.location.hash.slice(1);
        if (!hash) return 'home';
        const route = hash.split('/')[0];
        return route || 'home';
    }

    updateActiveNavigation() {
        this.currentRoute = this.getCurrentRoute();
        
        const desktopLinks = this.container.querySelectorAll('.nav-link-desktop');
        desktopLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === this.currentRoute) {
                link.classList.add('bg-primary-500', 'text-white');
                link.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            } else {
                link.classList.remove('bg-primary-500', 'text-white');
                link.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            }
        });

        const mobileLinks = this.container.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === this.currentRoute) {
                link.classList.add('bg-primary-500', 'text-white');
                link.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            } else {
                link.classList.remove('bg-primary-500', 'text-white');
                link.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            }
        });
    }

    setupRouteListener() {
        window.addEventListener('hashchange', () => {
            this.updateActiveNavigation();
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.closest('a[href^="#"]')) {
                setTimeout(() => {
                    this.updateActiveNavigation();
                }, 10);
            }
        });
    }

    render() {
        this.currentRoute = this.getCurrentRoute();
        
        this.container.innerHTML = `
            <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-md border-b border-gray-200 dark:border-gray-700"
                    style="position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <!-- Logo Section dengan kedua logo -->
                        <div class="flex items-center space-x-3">
                            <a href="#home" class="flex items-center space-x-3 no-underline">
                                <!-- Logo Jawa Timur -->
                                <div class="flex items-center">
                                    <img src="/jatim-portfolio/assets/images/ezgif-2474b4d95745cc6c.webp" 
                                         alt="Logo Jawa Timur" 
                                         class="h-10 w-auto object-contain lg:h-12"
                                         loading="lazy">
                                </div>
                                
                                <!-- Logo SMK PGRI 1 Kota Kediri -->
                                <div class="flex items-center border-l border-gray-300 dark:border-gray-600 pl-3">
                                    <img src="/jatim-portfolio/assets/images/ezgif-2cba447038569b8c.webp" 
                                         alt="Logo SMK PGRI 1 Kota Kediri" 
                                         class="h-8 w-auto object-contain lg:h-10"
                                         loading="lazy">
                                </div>
                            </a>
                            <!-- Desktop Navigation -->
                            <div class="hidden lg:block ml-4">
                                <div class="flex items-baseline space-x-4">
                                    ${this.getNavigationLinks()}
                                </div>
                            </div>
                        </div>

                        <!-- Search & Theme -->
                        <div class="hidden lg:flex items-center space-x-4">
                            <div id="search-container-desktop"></div>
                            <div id="theme-toggle-desktop"></div>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="lg:hidden flex items-center space-x-2">
                            <div id="theme-toggle-mobile"></div>
                            <button id="mobile-menu-button" class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                                ${icons.menu}
                            </button>
                        </div>
                    </div>

                    <!-- Mobile menu -->
                    <div id="mobile-menu" class="lg:hidden hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 pb-4">
                        <div class="flex flex-col space-y-2">
                            ${this.getMobileNavigationLinks()}
                        </div>
                        <div class="mt-4">
                            <div id="search-container-mobile"></div>
                        </div>
                    </div>
                </div>
            </header>
        `;

        this.renderThemeToggles();
    }

    renderThemeToggles() {
        const desktopContainer = document.getElementById('theme-toggle-desktop');
        const mobileContainer = document.getElementById('theme-toggle-mobile');
        
        if (desktopContainer) {
            theme.renderToggleButton(desktopContainer, 'medium');
        }
        
        if (mobileContainer) {
            theme.renderToggleButton(mobileContainer, 'medium');
        }
    }

    getNavigationLinks() {
        const routes = [
            { path: 'home', label: 'Beranda' },
            { path: 'kota', label: 'Kota' },
            { path: 'wisata', label: 'Wisata' },
            { path: 'kuliner', label: 'Kuliner' },
            { path: 'statistik', label: 'Statistik' },
            { path: 'tentang', label: 'Tentang' }
        ];

        return routes.map(route => `
            <a href="#${route.path}"
               class="nav-link-desktop px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                   this.currentRoute === route.path
                   ? 'bg-primary-500 text-white'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
               }"
               data-route="${route.path}">
                ${route.label}
            </a>
        `).join('');
    }

    getMobileNavigationLinks() {
        const routes = [
            { path: 'home', label: 'Beranda' },
            { path: 'kota', label: 'Kota' },
            { path: 'wisata', label: 'Wisata' },
            { path: 'kuliner', label: 'Kuliner' },
            { path: 'statistik', label: 'Statistik' },
            { path: 'tentang', label: 'Tentang' }
        ];

        return routes.map(route => `
            <a href="#${route.path}"
               class="nav-link-mobile px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                   this.currentRoute === route.path
                   ? 'bg-primary-500 text-white'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
               }"
               data-route="${route.path}"
               onclick="document.getElementById('mobile-menu').classList.add('hidden')">
                ${route.label}
            </a>
        `).join('');
    }

    setupSearch() {
        const searchContainerDesktop = document.getElementById('search-container-desktop');
        const searchContainerMobile = document.getElementById('search-container-mobile');
        
        if (searchContainerDesktop && !this.searchDesktop) {
            this.searchDesktop = new Search();
            this.searchDesktop.init(searchContainerDesktop);
        }

        if (searchContainerMobile && !this.searchMobile) {
            this.searchMobile = new Search();
            this.searchMobile.init(searchContainerMobile);
        }
    }

    setupEventListeners() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.isMobileMenuOpen = !this.isMobileMenuOpen;
                mobileMenu.classList.toggle('hidden');
            });
        }

        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && mobileMenu && !mobileMenu.contains(e.target) && 
                mobileMenuButton && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                this.isMobileMenuOpen = false;
            }
        });

        window.addEventListener('hashchange', () => {
            if (this.isMobileMenuOpen && mobileMenu) {
                mobileMenu.classList.add('hidden');
                this.isMobileMenuOpen = false;
            }
        });
    }

    setupThemeListeners() {
        window.addEventListener('themeChanged', () => {
            this.renderThemeToggles();
        });
    }

    destroy() {
        if (this.searchDesktop) {
            this.searchDesktop.destroy?.();
            this.searchDesktop = null;
        }
        if (this.searchMobile) {
            this.searchMobile.destroy?.();
            this.searchMobile = null;
        }
    }
}