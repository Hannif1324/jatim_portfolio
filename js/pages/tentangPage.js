import { theme } from '../components/theme/theme.js';

export class TentangPage {
    constructor() {
        this.themeCleanup = null;
    }

    init(container) {
        this.container = container;
        this.render();
        this.setupThemeListener();
    }

    setupThemeListener() {
        // Remove any existing theme listener
        this.removeThemeListener();

        // Register theme listener to handle theme changes
        this.themeCleanup = theme.registerListener(() => {
            // Re-render to ensure correct theme is applied
            this.render();
        });
    }

    removeThemeListener() {
        if (this.themeCleanup) {
            this.themeCleanup();
            this.themeCleanup = null;
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md fade-in">
                <h1 class="text-3xl font-bold mb-6 text-center text-primary-600 dark:text-primary-400">Tentang Jawa Timur</h1>

                <div class="space-y-6 text-gray-700 dark:text-gray-300">
                    <p>
                        Jawa Timur adalah sebuah provinsi di bagian timur Pulau Jawa, Indonesia. Ibu kotanya adalah Surabaya, kota terbesar kedua di Indonesia. Provinsi ini memiliki luas wilayah 47.803,49 km², dengan jumlah penduduk lebih dari 40 juta jiwa, menjadikannya provinsi terpadat kedua di Indonesia.
                    </p>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h2 class="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Geografi dan Alam</h2>
                            <p>
                                Jawa Timur berbatasan dengan Laut Jawa di utara, Selat Bali di timur, Samudra Hindia di selatan, serta Provinsi Jawa Tengah di barat. Wilayahnya mencakup daratan utama dan Pulau Madura. Provinsi ini memiliki bentang alam yang beragam, mulai dari dataran rendah, perbukitan, hingga pegunungan vulkanik aktif seperti Gunung Bromo dan Semeru, puncak tertinggi di Pulau Jawa.
                            </p>
                        </div>
                        <img src="https://picsum.photos/seed/jatim-map/600/400" alt="Peta Jawa Timur" class="rounded-lg shadow-md object-cover w-full h-full" />
                    </div>

                    <h2 class="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Budaya dan Masyarakat</h2>
                    <p>
                        Masyarakat Jawa Timur dikenal dengan keberagaman budayanya. Suku Jawa merupakan mayoritas, dengan sub-etnis Arek di wilayah Surabaya dan Malang, serta Tengger di sekitar Bromo. Pulau Madura didominasi oleh Suku Madura yang memiliki bahasa dan budaya khas. Kesenian tradisional seperti Reog Ponorogo, Ludruk, dan Tari Gandrung Banyuwangi menjadi bagian tak terpisahkan dari identitas provinsi ini.
                    </p>

                    <h2 class="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Ekonomi dan Pariwisata</h2>
                    <p>
                        Sebagai salah satu pusat ekonomi utama di Indonesia, Jawa Timur memiliki sektor industri, pertanian, dan perdagangan yang maju. Surabaya menjadi pusat bisnis dan pelabuhan internasional. Di sektor pariwisata, provinsi ini menawarkan destinasi yang lengkap, mulai dari wisata alam (gunung, pantai, kawah), wisata sejarah (candi-candi peninggalan Majapahit), hingga wisata buatan modern seperti Jatim Park Group di Kota Batu.
                    </p>

                    <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                            Aplikasi Portofolio Jawa Timur ini dibuat untuk menampilkan sebagian kecil dari pesona yang ditawarkan oleh provinsi yang luar biasa ini.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    destroy() {
        this.removeThemeListener(); // Remove theme listener
    }
}