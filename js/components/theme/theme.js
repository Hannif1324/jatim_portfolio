import { icons } from '../ui/icons.js';

export class Theme {
    constructor() {
        this.currentTheme = 'dark'; // default tema gelap
        this.initialized = false;
        this.themeListeners = new Set();
    }

    init() {
        if (this.initialized) return;

        // Dapatkan tema yang disimpan atau tema default
        this.currentTheme = this.getStoredTheme();
        this.applyTheme(this.currentTheme);

        // Listen for theme changes from other components
        window.addEventListener('themeChanged', (event) => {
            this.currentTheme = event.detail.theme;
            this.applyTheme(this.currentTheme);

            // Notify all registered listeners
            this.notifyListeners();
        });

        this.initialized = true;
    }

    registerListener(callback) {
        this.themeListeners.add(callback);
        return () => this.themeListeners.delete(callback); // Return cleanup function
    }

    notifyListeners() {
        this.themeListeners.forEach(callback => {
            try {
                callback(this.currentTheme);
            } catch (error) {
                console.error('Error in theme listener:', error);
            }
        });
    }


    getStoredTheme() {
        // Cek apakah pengguna sudah menyimpan preferensi tema sebelumnya
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }

        // Jika tidak ada preferensi pengguna, gunakan tema default gelap
        return 'dark';
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme(this.currentTheme);

        // Dispatch event untuk notify komponen lain
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
        }));

        return this.currentTheme;
    }

    applyTheme(theme) {
        const html = document.documentElement;

        if (theme === 'dark') {
            html.classList.add('dark');
            html.style.colorScheme = 'dark';
        } else {
            html.classList.remove('dark');
            html.style.colorScheme = 'light';
        }

        this.updateMetaThemeColor(theme);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        metaThemeColor.content = theme === 'dark' ? '#1f2937' : '#ffffff';
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method untuk render toggle button
    renderToggleButton(container, size = 'medium') {
        const isDark = this.currentTheme === 'dark';
        const sizes = {
            small: 'w-8 h-8',
            medium: 'w-10 h-10',
            large: 'w-12 h-12'
        };

        const buttonSize = sizes[size] || sizes.medium;

        container.innerHTML = `
            <button
                class="theme-toggle ${buttonSize} p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
                title="Toggle theme"
                aria-label="Toggle theme"
            >
                ${isDark ? icons.sun : icons.moon}
            </button>
        `;

        // Add event listener
        const button = container.querySelector('.theme-toggle');
        if (button) {
            button.addEventListener('click', () => {
                this.toggle();
                // Update icon immediately
                this.updateToggleButton(container, size);
            });
        }
    }

    // Update toggle button setelah theme change
    updateToggleButton(container, size = 'medium') {
        const isDark = this.currentTheme === 'dark';
        const button = container.querySelector('.theme-toggle');
        if (button) {
            button.innerHTML = isDark ? icons.sun : icons.moon;
        }
    }
}

// Global theme instance (TIDAK auto-init)
export const theme = new Theme();