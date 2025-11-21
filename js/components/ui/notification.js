// components/ui/notification.js
export class Notification {
    static show(message, type = 'success', duration = 4000) {
        // Hapus notifikasi sebelumnya
        const existing = document.querySelector('.custom-notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 z-50 transform transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-500 text-white border-l-4 border-green-600' 
                : type === 'error' 
                ? 'bg-red-500 text-white border-l-4 border-red-600'
                : 'bg-blue-500 text-white border-l-4 border-blue-600'
        } rounded-lg shadow-lg p-4 max-w-sm`;

        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 text-lg">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <button class="close-notification text-white hover:text-gray-200 transition-colors text-lg font-bold">
                    ×
                </button>
            </div>
        `;

        document.getElementById('notification-root').appendChild(notification);

        // Inline styles untuk animasi
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease-in-out';

        // Animasi masuk
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Close button
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            Notification.hide(notification);
        });

        // Auto hide
        if (duration > 0) {
            notification.autoHideTimeout = setTimeout(() => {
                Notification.hide(notification);
            }, duration);
        }

        return notification;
    }

    static hide(notification) {
        if (notification && notification.parentNode) {
            if (notification.autoHideTimeout) {
                clearTimeout(notification.autoHideTimeout);
            }
            
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
}