// js/pages/statistikPage.js - VERSI CHART.JS
import { dataService } from '../services/dataService.js';
import { theme } from '../components/theme/theme.js';

export class StatistikPage {
    constructor() {
        this.wisataData = [];
        this.kulinerData = [];
        this.loading = true;
        this.charts = {};
        this.themeCleanup = null;
    }

    async init(container) {
        this.container = container;
        await this.loadData();
        this.render();
        this.setupThemeListener();
    }

    async loadData() {
        this.loading = true;
        this.render();

        try {
            const [wisata, kuliner] = await Promise.all([
                dataService.getWisata(),
                dataService.getKuliner()
            ]);

            this.wisataData = wisata;
            this.kulinerData = kuliner;

        } catch (error) {
            console.error('❌ Error loading data:', error);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    getWisataPerKota() {
        const counts = this.wisataData.reduce((acc, curr) => {
            acc[curr.kota] = (acc[curr.kota] || 0) + 1;
            return acc;
        }, {});
        const result = Object.entries(counts).map(([name, jumlah]) => ({ name, jumlah }));
        return result;
    }

    getKulinerPerKategori() {
        const counts = this.kulinerData.reduce((acc, curr) => {
            acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
            return acc;
        }, {});
        const result = Object.entries(counts).map(([name, value]) => ({ name, value }));
        return result;
    }

    initCharts() {
        const wisataPerKota = this.getWisataPerKota();
        const kulinerPerKategori = this.getKulinerPerKategori();

        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });

        // Bar Chart - Wisata per Kota
        const wisataCtx = document.getElementById('wisataChart');
        if (wisataCtx) {
            this.charts.wisata = new Chart(wisataCtx, {
                type: 'bar',
                data: {
                    labels: wisataPerKota.map(item => item.name),
                    datasets: [{
                        label: 'Jumlah Wisata',
                        data: wisataPerKota.map(item => item.jumlah),
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(236, 72, 153, 0.8)'
                        ],
                        borderColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(139, 92, 246, 1)',
                            'rgba(236, 72, 153, 1)'
                        ],
                        borderWidth: 2,
                        borderRadius: 6,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return `Jumlah: ${context.raw} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(156, 163, 175, 0.2)'
                            },
                            ticks: {
                                color: 'rgba(156, 163, 175, 1)'
                            },
                            title: {
                                display: true,
                                text: 'Jumlah Wisata',
                                color: 'rgba(156, 163, 175, 1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(156, 163, 175, 1)',
                                maxRotation: 45
                            },
                            title: {
                                display: true,
                                text: 'Kota',
                                color: 'rgba(156, 163, 175, 1)'
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Doughnut Chart - Kuliner per Kategori
        const kulinerCtx = document.getElementById('kulinerChart');
        if (kulinerCtx) {
            this.charts.kuliner = new Chart(kulinerCtx, {
                type: 'doughnut',
                data: {
                    labels: kulinerPerKategori.map(item => item.name),
                    datasets: [{
                        data: kulinerPerKategori.map(item => item.value),
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(236, 72, 153, 0.8)'
                        ],
                        borderColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(139, 92, 246, 1)',
                            'rgba(236, 72, 153, 1)'
                        ],
                        borderWidth: 2,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: 'rgba(156, 163, 175, 1)',
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return `${context.label}: ${context.raw} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    cutout: '60%',
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        }
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="text-center p-8">Memuat data statistik...</div>';
            return;
        }

        const wisataPerKota = this.getWisataPerKota();
        const kulinerPerKategori = this.getKulinerPerKategori();

        this.container.innerHTML = `
            <div class="space-y-12 max-w-7xl mx-auto">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Statistik Jawa Timur</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Visualisasi data kuliner dan wisata menggunakan Chart.js</p>
                </div>

                <!-- Wisata per Kota - Bar Chart -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Jumlah Destinasi Wisata per Kota</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Diagram batang menunjukkan distribusi jumlah destinasi wisata di setiap kota di Jawa Timur.
                    </p>

                    <div class="h-80 mt-6">
                        <canvas id="wisataChart"></canvas>
                    </div>

                    <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h3 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">Keterangan Diagram Batang:</h3>
                        <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                            <li>• Setiap batang mewakili satu kota di Jawa Timur</li>
                            <li>• Tinggi batang menunjukkan jumlah destinasi wisata</li>
                            <li>• Hover pada batang untuk melihat detail dan persentase</li>
                            <li>• Total: ${this.wisataData.length} destinasi wisata</li>
                        </ul>
                    </div>
                </div>

                <!-- Kuliner per Kategori - Doughnut Chart -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Distribusi Kategori Kuliner</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Diagram donat menunjukkan persebaran kuliner berdasarkan kategori di Jawa Timur.
                    </p>

                    <div class="h-80 mt-6">
                        <canvas id="kulinerChart"></canvas>
                    </div>

                    <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h3 class="font-semibold text-green-800 dark:text-green-300 mb-2">Keterangan Diagram Donat:</h3>
                        <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                            <li>• Setiap bagian mewakili kategori kuliner</li>
                            <li>• Ukuran bagian menunjukkan persentase jumlah kuliner</li>
                            <li>• Hover pada bagian untuk melihat detail jumlah</li>
                            <li>• Total: ${this.kulinerData.length} kuliner dari ${kulinerPerKategori.length} kategori</li>
                        </ul>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-blue-500 text-white p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200">
                        <div class="text-3xl font-bold">${this.wisataData.length}</div>
                        <div class="text-blue-100 mt-2">Total Wisata</div>
                        <div class="text-blue-200 text-sm mt-1">${wisataPerKota.length} Kota</div>
                    </div>
                    <div class="bg-green-500 text-white p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200">
                        <div class="text-3xl font-bold">${this.kulinerData.length}</div>
                        <div class="text-green-100 mt-2">Total Kuliner</div>
                        <div class="text-green-200 text-sm mt-1">${kulinerPerKategori.length} Kategori</div>
                    </div>
                    <div class="bg-purple-500 text-white p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200">
                        <div class="text-3xl font-bold">${new Set([...this.wisataData.map(w => w.kota), ...this.kulinerData.map(k => k.kota)]).size}</div>
                        <div class="text-purple-100 mt-2">Kota Tercover</div>
                        <div class="text-purple-200 text-sm mt-1">Jawa Timur</div>
                    </div>
                </div>

                <!-- Data Tables -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Wisata Table -->
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Detail Wisata per Kota</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Kota</th>
                                        <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Jumlah</th>
                                        <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Persentase</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    ${wisataPerKota.map(item => {
                                        const percentage = ((item.jumlah / this.wisataData.length) * 100).toFixed(1);
                                        return `
                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td class="px-4 py-2 text-sm text-gray-800 dark:text-white">${item.name}</td>
                                                <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">${item.jumlah}</td>
                                                <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">${percentage}%</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Kuliner Table -->
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Detail Kuliner per Kategori</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Kategori</th>
                                        <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Jumlah</th>
                                        <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Persentase</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    ${kulinerPerKategori.map(item => {
                                        const percentage = ((item.value / this.kulinerData.length) * 100).toFixed(1);
                                        return `
                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td class="px-4 py-2 text-sm text-gray-800 dark:text-white">${item.name}</td>
                                                <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">${item.value}</td>
                                                <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">${percentage}%</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize charts after DOM is rendered
        setTimeout(() => {
            this.initCharts();
        }, 100);
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes
        this.themeCleanup = theme.registerListener(() => {
            // Re-render the page to update the UI theme
            // and reinitialize charts to update their colors
            const currentData = {
                wisataData: this.wisataData,
                kulinerData: this.kulinerData,
                loading: this.loading
            };

            // Store chart data before re-rendering
            this.render();

            // Re-initialize charts with theme-appropriate colors after DOM update
            setTimeout(() => {
                this.initCharts();
            }, 100);
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    destroy() {
        this.removeThemeListener(); // Remove theme listener
        // Destroy all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}