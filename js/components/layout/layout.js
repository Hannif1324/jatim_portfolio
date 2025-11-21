import { Navbar } from './navbar.js';
import { Footer } from './footer.js';

export class Layout {
    constructor(app) {
        this.app = app;
        this.navbar = new Navbar(app);
        this.footer = new Footer();
    }

    init(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="min-h-full bg-white dark:bg-gray-900 transition-colors duration-200">
                <div id="navbar-container"></div>
                <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div id="page-content"></div>
                </main>
                <div id="footer-container"></div>
            </div>
        `;

        // Initialize navbar and footer
        const navbarContainer = document.getElementById('navbar-container');
        const footerContainer = document.getElementById('footer-container');
        
        if (navbarContainer) {
            this.navbar.init(navbarContainer);
        }
        
        if (footerContainer) {
            this.footer.init(footerContainer);
        }
    }

    // NEW: Method to update active route in navbar
    updateActiveRoute(route) {
        if (this.navbar && this.navbar.updateActiveNavigation) {
            this.navbar.updateActiveNavigation();
        }
    }

    updateTheme() {
        // Navbar sudah handle theme update sendiri melalui event listener
        // Method ini bisa digunakan untuk additional layout updates jika needed
    }

    getPageContentContainer() {
        return document.getElementById('page-content');
    }
}