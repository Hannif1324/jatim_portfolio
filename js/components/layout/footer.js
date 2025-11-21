export class Footer {
    init(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <!-- Main Footer Content -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        
                        <!-- Logo dan Deskripsi -->
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <img src="/jatim-portfolio/assets/images/ezgif-2474b4d95745cc6c.webp" 
                                     alt="Logo Jawa Timur" 
                                     class="h-12 w-auto object-contain">
                                <img src="/jatim-portfolio/assets/images/ezgif-2cba447038569b8c.webp" 
                                     alt="Logo SMK PGRI 1 Kota Kediri" 
                                     class="h-10 w-auto object-contain">
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Portal informasi lengkap tentang keindahan Jawa Timur. Menampilkan wisata, kuliner, 
                                dan budaya dari berbagai kota di provinsi Jawa Timur.
                            </p>
                        </div>

                        <!-- Quick Links -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Navigasi Cepat</h3>
                            <div class="grid grid-cols-2 gap-2">
                                <a href="#home" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Beranda</a>
                                <a href="#wisata" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Wisata</a>
                                <a href="#kuliner" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Kuliner</a>
                                <a href="#kota" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Kota</a>
                                <a href="#statistik" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Statistik</a>
                                <a href="#tentang" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">Tentang</a>
                            </div>
                        </div>

                        <!-- Peta Jawa Timur -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Peta Jawa Timur</h3>
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div class="bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center p-4">
                                    <div class="text-center">
                                        <img src="/jatim-portfolio/assets/images/ezgif-8dc728442ee95c10.webp" 
                                            alt="Peta Jawa Timur" 
                                            class="max-w-full h-auto max-h-48 object-contain">
                                    </div>
                                </div>
                                <a href="https://maps.app.goo.gl/sPHWMBWNPM6rWmuC7" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="block w-full mt-3 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors text-center">
                                    Jelajahi Peta
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p class="text-gray-500 dark:text-gray-400 text-sm">
                                &copy; ${new Date().getFullYear()} Jawa Timur Explorer. Dibuat dengan ❤️ oleh SMK PGRI 1 Kota Kediri
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}