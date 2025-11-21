import { icons } from './icons.js';
import { theme } from '../theme/theme.js';

export class Modal {
    constructor() {
        this.isOpen = false;
        this.onCloseCallback = null;
        this.themeCleanup = null;
    }

    open(title, content, onClose = null) {
        this.isOpen = true;
        this.onCloseCallback = onClose;
        this.render(title, content);
        this.setupEventListeners();
        this.setupThemeListener();
    }

    close() {
        this.isOpen = false;
        const modalElement = document.getElementById('modal-overlay');
        if (modalElement) {
            modalElement.remove();
        }
        if (this.onCloseCallback) {
            this.onCloseCallback();
        }
        this.removeThemeListener();
    }

    render(title, content) {
        const modalHTML = `
            <div id="modal-overlay" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 fade-in">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all">
                    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">${title}</h2>
                        <button id="modal-close" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                            ${icons.close}
                        </button>
                    </div>
                    <div class="p-6 overflow-y-auto text-gray-700 dark:text-gray-300">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes while modal is open
        this.themeCleanup = theme.registerListener(() => {
            // Re-render modal content to ensure theme is applied correctly
            const modalElement = document.getElementById('modal-overlay');
            if (modalElement) {
                // The modal already uses Tailwind dark classes, so it should update automatically
                // But we might want to ensure it's properly themed
                const content = modalElement.querySelector('.p-6');
                if (content) {
                    // Content should already be themed via Tailwind classes
                    // This is just a safety check
                }
            }
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    setupEventListeners() {
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('modal-close');

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // ESC key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
}

// Global modal instance
export const modal = new Modal();