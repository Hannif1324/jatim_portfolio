// LocalBase instance
const db = new Localbase('Base');

// Data templates (sama dengan yang di React)
export const Kota = {
    id: '',
    nama: '',
    populasi: 0,
    coords: { lat: 0, lng: 0 },
    deskripsi: '',
    gambar: '',
    mapsUrl: '', // Tambahan: URL Google Maps
    mapsImage: '' // Tambahan: Gambar peta statis
};

export const Kuliner = {
    id: '',
    nama: '',
    kota: '',
    kategori: '',
    gambar: '',
    deskripsi: '',
    harga: '', // Harga 1 porsi kuliner
    mapsUrl: '', // Tambahan: URL Google Maps lokasi kuliner
    mapsImage: '', // Tambahan: Gambar peta statis
    rating: 0 // Tambahan: Rating kuliner
};

export const Wisata = {
    id: '',
    nama: '',
    kota: '',
    kategori: '',
    gambar: '',
    deskripsi: '',
    hargaTiket: '', // Harga tiket masuk wisata
    mapsUrl: '', // Tambahan: URL Google Maps lokasi wisata
    mapsImage: '', // Tambahan: Gambar peta statis
    rating: 0 // Tambahan: Rating wisata
};

export const CarouselImage = {
    id: '',
    src: '',
    alt: '',
};

// export const Logo = {
//     id: '',
//     nama: '',
//     src: '',
// };

// // export const Bookmark = {
// //     id: '',
// //     type: '', // 'kuliner' | 'wisata' | 'kota'
// //     nama: '',
// //     kota: '',
// //     createdAt: 0,
// // };

// // Seed data dengan tambahan maps, URL, dan harga
// const seedLogo = [
//     {
//         id: 'logo-jatim',
//         nama: 'Logo Jawa Timur',
//         src: 'https://files.catbox.moe/7m67r3.png'
//     },
//     {
//         id: 'logo-smk',
//         nama: 'Logo SMK PGRI 1 Kediri',
//         src: 'https://files.catbox.moe/egjvcn.png'
//     },
//     {
//         id: 'gambar-utama',
//         nama: 'Gambar Utama',
//         src: 'https://files.catbox.moe/7cepe6.png'
//     },
// ];

const seedKota = [
    { 
        id: 'surabaya', 
        nama: 'Surabaya', 
        populasi: 3137620, 
        coords: { lat: -7.250445, lng: 112.768845 }, 
        deskripsi: 'Surabaya adalah ibu kota Provinsi Jawa Timur dan merupakan kota metropolitan terbesar kedua di Indonesia. Dikenal sebagai Kota Pahlawan karena perannya dalam pertempuran kemerdekaan Indonesia.', 
        gambar: '/jatim-portfolio/assets/images/834589345348753453479c.webp', //fotokota
        mapsUrl: 'https://maps.app.goo.gl/7z5EscoVBWPH8t8z7',
        mapsImage: 'https://files.catbox.moe/g7qcv2.png' //ss
    },
    
    { 
        id: 'probolinggo', 
        nama: 'Probolinggo', 
        populasi: 160490, 
        coords: { lat: -7.766667, lng: 113.208333 }, 
        deskripsi: 'Probolinggo adalah kota pelabuhan yang sibuk dan menjadi gerbang utama menuju Taman Nasional Bromo Tengger Semeru yang terkenal di dunia.', 
        gambar: 'https://files.catbox.moe/bo8ooc.jpg', //kota
        mapsUrl: 'https://maps.app.goo.gl/oGs2BtyfBqHsaXKJ7',
        mapsImage: 'https://files.catbox.moe/vmm2ao.png' //ss
    },
    
    { 
        id: 'malang', 
        nama: 'Malang', 
        populasi: 891859, 
        coords: { lat: -7.9797, lng: 112.6304 }, 
        deskripsi: 'Terletak di dataran tinggi, Malang dikenal dengan udaranya yang sejuk, arsitektur kolonial, dan sebagai pusat pendidikan. Kota ini dikelilingi oleh pegunungan dan perkebunan apel.', 
        gambar: 'https://files.catbox.moe/gdc0mn.jpg',//kota
        mapsUrl: 'https://maps.app.goo.gl/AVc4MRNxVceo5rpW9',
        mapsImage: 'https://files.catbox.moe/qvdbn8.jpg'//ss
    },
    
    { 
        id: 'kediri', 
        nama: 'Kediri', 
        populasi: 300460, 
        coords: { lat: -7.848016, lng: 112.017829 }, 
        deskripsi: 'Kediri adalah salah satu kota tertua di Indonesia, dikenal sebagai pusat industri rokok dan memiliki sejarah panjang sejak era Kerajaan Kediri.', 
        gambar: 'https://files.catbox.moe/s6hznd.jpg',//kota
        mapsUrl: 'https://maps.app.goo.gl/vTm7sMB4MFiDieKF6',
        mapsImage: 'https://files.catbox.moe/ysgjmu.jpg'//ss
    },
    
    { 
        id: 'madiun', 
        nama: 'Madiun', 
        populasi: 760950, 
        coords: { lat: -7.629714, lng: 111.523274 }, 
        deskripsi: 'Madiun dikenal sebagai Kota Gadis dan memiliki sejarah sebagai pusat kereta api serta industri persenjataan di Jawa Timur.', 
        gambar: 'https://files.catbox.moe/sc0neo.jpg',//kota
        mapsUrl: 'https://maps.app.goo.gl/kALW4RKWFAdP7C1J7',
        mapsImage: 'https://files.catbox.moe/cwb9g0.jpg'//ss
    },
    
    { 
        id: 'blitar', 
        nama: 'Blitar', 
        populasi: 163342, 
        coords: { lat: -8.098172, lng: 112.168243 }, 
        deskripsi: 'Blitar terkenal sebagai tempat dimakamkannya Presiden pertama Republik Indonesia, Ir. Soekarno, dan memiliki budaya serta sejarah yang kuat.', 
        gambar: 'https://files.catbox.moe/yzglkn.webp',//kota
        mapsUrl: 'https://maps.google.com/?q=Blitar,Jawa+Timur',
        mapsImage: 'https://files.catbox.moe/j9b2ea.png'//ss
    }
];

const seedKuliner = [
    { 
        id: 'rawon surabaya', 
        nama: 'Rawon Setan', 
        kota: 'Surabaya', 
        kategori: 'Makanan Berat', 
        gambar: 'https://files.catbox.moe/ywz78h.jpg', //rawon
        deskripsi: 'Sup daging sapi berkuah hitam pekat yang kaya rempah, menggunakan kluwek sebagai bumbu utama yang memberikan wrna dan rasa khas.', 
        harga: 'Rp 40.000',
        mapsUrl: 'https://maps.app.goo.gl/v2zCRvi7jqrPm1TA9',
        mapsImage: 'https://files.catbox.moe/bzei7w.jpg', //ss
        rating: 4.5
    },

    { 
        id: 'soto lamongan', 
        nama: 'Soto Lamongan', 
        kota: 'Surabaya', 
        kategori: 'Makanan Berat', 
        gambar: 'https://files.catbox.moe/vd29h3.jpeg', //soto
        deskripsi: 'Soto ayam bening dengan bubuk koya yang gurih, disajikan dengan irisan ayam, telur, dan seledri.', 
        harga: 'Rp 15,000',
        mapsUrl: 'https://maps.app.goo.gl/S2tiRGpb7wxLdmX1A',
        mapsImage: 'https://files.catbox.moe/mht2tb.jpg', //ss 
        rating: 4.4
    },

    { 
        id: 'tahu lontong probolinggo', 
        nama: 'Tahu Lontong', 
        kota: 'Probolinggo', 
        kategori: 'Makanan Ringan', 
        gambar: 'https://files.catbox.moe/sck8eh.jpg', 
        deskripsi: 'Hidangan sederhana yang terdiri dari tahu goreng, lontong, tauge, dan disiram bumbu kacang petis yang lezat.', 
        harga: 'Rp 10.000',
        mapsUrl: 'https://maps.app.goo.gl/Rv6PNMJC3XnShPpm7',
        mapsImage: 'https://files.catbox.moe/fdnpdv.jpg',
        rating: 4.0
    },

    { 
        id: 'bakso malang', 
        nama: 'Bakso Bakar Malang', 
        kota: 'Malang', 
        kategori: 'Makanan Berat', 
        gambar: 'https://files.catbox.moe/5i4wv0.jpg', //bakso
        deskripsi: 'Bakso khas Malang yang tidak hanya direbus, tetapi juga dibakar dan dilumuri bumbu kecap pedas manis, disajikan dengan pangsit dan tahu.', 
        harga: 'Rp 35.000 - 52.000',
        mapsUrl: 'https://maps.app.goo.gl/itt6MgPfwcTMWi8o6"',
        mapsImage: 'https://files.catbox.moe/5elv7z.jpg',//ss
        rating: 4.3
    },

    { 
        id: 'cwie mie malang', 
        nama: 'Cwie Mie Malang', 
        kota: 'Malang', 
        kategori: 'Makanan Berat', 
        gambar: 'https://files.catbox.moe/ds72la.jpg', //cwie mie
        deskripsi: 'Mi khas Malang dengan topping ayam giling yang lembut dan taburan bawang goreng, disajikan dengan kuah terpisah.', 
        harga: 'Rp 15.000',
        mapsUrl: 'https://maps.google.com/?q=Cwie+Mie,Malang',
        mapsImage: 'https://files.catbox.moe/gzwoo4.jpg', //ss
        rating: 4.4
    },

    { 
        id: 'pecel madiun', 
        nama: 'Pecel Madiun', 
        kota: 'Madiun', 
        kategori: 'Makanan Berat', 
        gambar: 'https://files.catbox.moe/xkh4il.jpg', //pecel madiun
        deskripsi: 'Hidangan sayuran dengan sambal kacang khas Madiun yang pedas, wangi daun jeruk, dan biasanya disajikan dengan rempeyek.', 
        harga: 'Rp 13,000',
        mapsUrl: 'https://maps.app.goo.gl/ANFC6sTVuCcy5aKt6',
        mapsImage: 'https://files.catbox.moe/4zuws1.jpg',//ss **
        rating: 4.5
    },

    { 
        id: 'tahu tek surabaya', 
        nama: 'Tahu Tek', 
        kota: 'Surabaya', 
        kategori: 'Makanan Ringan', 
        gambar: 'https://files.catbox.moe/vxj1dl.jpg', //tahu tek
        deskripsi: 'Tahu goreng dan lontong yang dipotong dengan gunting, disiram bumbu petis kacang yang gurih dan nikmat.', 
        harga: 'Rp 15,000',
        mapsUrl: 'https://maps.app.goo.gl/ZY7NcvCnQYhnHJVM6',
        mapsImage: 'https://files.catbox.moe/doc2t3.jpg',//ss
        rating: 4.6
    },

    { 
        id: 'tahu kuning kediri', 
        nama: 'Tahu Kuning Kediri', 
        kota: 'Kediri', 
        kategori: 'Makanan Ringan', 
        gambar: 'https://files.catbox.moe/bgnlra.jpeg', //tahu
        deskripsi: 'Tahu khas Kediri yang berwarna kuning alami dari kunyit, memiliki tekstur lembut dan rasa gurih, menjadi ikon kuliner dari Kota Tahu.', 
        harga: 'Rp 2000 - 5000 perbiji',
        mapsUrl: 'https://maps.app.goo.gl/rsVZcx7HGJT5kddK6',
        mapsImage: 'https://files.catbox.moe/0r3t46.jpg',//ss
        rating: 4.5
    },

    { 
        id: 'es pleret blitar', 
        nama: 'Es Pleret', 
        kota: 'Blitar', 
        kategori: 'Minuman', 
        gambar: 'https://files.catbox.moe/8qt0xp.jpg', 
        deskripsi: 'Minuman tradisional Blitar berisi bola-bola tepung beras kenyal dengan kuah santan dan gula merah yang menyegarkan.', 
        harga: 'Rp 5.000 - 15.000',
        mapsUrl: 'https://maps.app.goo.gl/9TGmpUb9DgpdS5Jw8',
        mapsImage: 'https://files.catbox.moe/89n4le.jpg',
        rating: 5.0
    }
];

const seedWisata = [
    {
        id: 'coban rondo', 
        nama: 'Coban Rondo', 
        kota: 'Malang', 
        kategori: 'Air Terjun', 
        gambar: 'https://files.catbox.moe/gjbkeh.webp', //lokasi
        deskripsi: 'Air terjun yang indah dengan ketinggian sekitar 84 meter, dikelilingi oleh hutan pinus yang asri dan sejuk.', 
        hargaTiket: 'Rp 15,000 -  Rp 18.000',
        mapsUrl: 'https://maps.app.goo.gl/W6EKKFHdpG5NQpEp6',
        mapsImage: 'https://files.catbox.moe/ez46ut.jpg', //ss
        rating: 4.5
    },

    {
        id: 'bromo', 
        nama: 'Gunung Bromo', 
        kota: 'Probolinggo', 
        kategori: 'Gunung', 
        gambar: 'https://files.catbox.moe/vk08nk.webp', //lokasi
        deskripsi: 'Gunung berapi aktif yang terkenal dengan pemandangan matahari terbitnya yang spektakuler di atas lautan pasir dan kawah yang masih mengepul.', 
        hargaTiket: 'Rp 54.000 ',
        mapsUrl: 'https://maps.app.goo.gl/2iVKXuJdTFKwndKy7',
        mapsImage: 'https://files.catbox.moe/igi2ls.jpg',
        rating: 4.7
    },

    {
        id: 'jembatan suramadu', 
        nama: 'Jembatan Suramadu', 
        kota: 'Surabaya', 
        kategori: 'Arsitektur', 
        gambar: 'https://files.catbox.moe/svsp6t.jpg', 
        deskripsi: 'Jembatan kabel terpanjang di Indonesia yang menghubungkan Surabaya dengan Pulau Madura, menawarkan pemandangan indah terutama saat malam hari.', 
        hargaTiket: 'Gratis',
        mapsUrl: 'https://maps.google.com/?q=Jembatan+Suramadu,Surabaya',
        mapsImage: 'https://files.catbox.moe/jv8sys.jpg',
        rating: 4.4
    },

    {
        id: 'jatim park 2', 
        nama: 'Jatim Park 2', 
        kota: 'Malang', 
        kategori: 'Taman Hiburan', 
        gambar: 'https://files.catbox.moe/oj8m8m.jpg', 
        deskripsi: 'Taman rekreasi edukatif yang terdiri dari Museum Satwa dan Batu Secret Zoo, cocok untuk liburan keluarga.', 
        hargaTiket: 'Rp 125.000 (weekday) Rp 170.000 (weekend)',
        mapsUrl: 'https://maps.app.goo.gl/QVr8VoaPUAvKGjNf6',
        mapsImage: 'https://files.catbox.moe/d5bkmg.jpg',
        rating: 4.7
    },

    {
        id: 'kawah ijen', 
        nama: 'Kawah Ijen', 
        kota: 'Banyuwangi', 
        kategori: 'Gunung', 
        gambar: 'https://files.catbox.moe/6tyzx9.jpeg', 
        deskripsi: 'Gunung berapi dengan fenomena api biru yang langka dan danau kawah berwarna toska, menjadi salah satu destinasi paling terkenal di Indonesia.', 
        hargaTiket: 'Rp 20.000 - Rp 30.000',
        mapsUrl: 'https://maps.app.goo.gl/PCWrx2wUWdvSCmvG8',
        mapsImage: 'https://files.catbox.moe/bnug00.jpg',
        rating: 4.8
    },

    {
        id: 'pantai papuma', 
        nama: 'Pantai Papuma', 
        kota: 'Jember', 
        kategori: 'Pantai', 
        gambar: 'https://files.catbox.moe/p6zuzb.jpg', 
        deskripsi: 'Pantai berpasir putih dengan batu karang besar dan air jernih, favorit wisatawan karena suasana tenang dan pemandangannya yang memukau.', 
        hargaTiket: 'Rp 10.000 -Rp 25.000 ',
        mapsUrl: 'https://maps.app.goo.gl/cH2NSqSxEg7VNzVx6',
        mapsImage: 'https://files.catbox.moe/zjz0h1.jpg',
        rating: 4.4
    },

    {
        id: 'taman nasional baluran', 
        nama: 'Taman Nasional Baluran', 
        kota: 'Situbondo', 
        kategori: 'Taman Nasional', 
        gambar: 'https://files.catbox.moe/jltmvm.jpeg', 
        deskripsi: 'Dijuluki "Africa van Java", taman nasional ini memiliki padang savana luas dan berbagai satwa liar seperti rusa, banteng, dan merak.', 
        hargaTiket: 'Rp 21.000 - Rp 31.000 ',
        mapsUrl: 'https://maps.app.goo.gl/CZ7hBqzeUr7nnyZg7',
        mapsImage: 'https://files.catbox.moe/nmrysm.jpg',
        rating: 4.5
    },

    {
        id: 'goa-gong', 
        nama: 'Goa Gong', 
        kota: 'Pacitan', 
        kategori: 'Goa', 
        gambar: 'https://files.catbox.moe/dkv3bl.jpg', 
        deskripsi: 'Goa tercantik di Asia Tenggara dengan stalaktit dan stalagmit yang megah serta pencahayaan warna-warni yang memperindah interiornya.', 
        hargaTiket: 'Rp 20.000',
        mapsUrl: 'https://maps.app.goo.gl/FYxrVsdjiZ8ee5fH8',
        mapsImage: 'https://files.catbox.moe/gwesnx.jpg',
        rating: 4.4
    },

    {
        
    id: 'goa selomangleng kediri',
    nama: 'Goa Selomangleng',
    kota: 'Kediri',
    kategori: 'Wisata Alam & Sejarah',
    gambar: 'https://files.catbox.moe/8zofb3.jpg',
    deskripsi: 'Goa bersejarah yang terletak di lereng Gunung Klotok, menawarkan suasana alami, relief kuno, dan panorama kota Kediri dari ketinggian.',
    hargaTiket: 'Rp 5.000 - Rp 10.000',
    mapsUrl: 'https://maps.app.goo.gl/vXqbXP5ze2wDnk4a7',
    mapsImage: 'https://files.catbox.moe/q0n94g.jpg',
    
    rating: 4.1
    }
];

const seedCarousel = [
    {id:'img1', src:'https://files.catbox.moe/qi1r7k.jpg', alt:'Gunung Bromo saat matahari terbit'},
    {id:'img2', src:'https://files.catbox.moe/5e15e3.jpeg', alt:'Jembatan Suramadu di malam hari'},
    {id:'img3', src:'https://files.catbox.moe/a0bxwh.jpeg', alt:'Keindahan pantai tiga warna'},
    {id:'img4', src:'https://files.catbox.moe/xaprrh.jpg', alt:'Keindahan kawah ijen'}
];

// Data Service Functions (TIDAK BERUBAH)
export const dataService = {
    // Seed data ke database
    async seedData() {
        try {
            // Check if data already exists
            const existingKota = await db.collection('kota').get();
            if (existingKota.length === 0) {
                for (const kota of seedKota) {
                    await db.collection('kota').add(kota, kota.id);
                }
            }

            const existingKuliner = await db.collection('kuliner').get();
            if (existingKuliner.length === 0) {
                for (const kuliner of seedKuliner) {
                    await db.collection('kuliner').add(kuliner, kuliner.id);
                }
            }

            const existingWisata = await db.collection('wisata').get();
            if (existingWisata.length === 0) {
                for (const wisata of seedWisata) {
                    await db.collection('wisata').add(wisata, wisata.id);
                }
            }

            const existingCarousel = await db.collection('carousel').get();
            if (existingCarousel.length === 0) {
                for (const carousel of seedCarousel) {
                    await db.collection('carousel').add(carousel, carousel.id);
                }
            }
        } catch (error) {
            console.error('Error seeding data:', error);
        }
    },

    // TAMBAHKAN METHOD UNTUK CLEAR DATABASE
    async clearDatabase() {
        try {
            await db.collection('kota').delete();
            await db.collection('kuliner').delete();
            await db.collection('wisata').delete();
            await db.collection('carousel').delete();
            // await db.collection('bookmarks').delete();
            console.log('🗑️ Database cleared successfully');
        } catch (error) {
            console.error('Error clearing database:', error);
        }
    },

    // Get all items dari collection
    async getKota() {
        try {
            return await db.collection('kota').get();
        } catch (error) {
            console.error('Error getting kota:', error);
            return [];
        }
    },

    async getKuliner() {
        try {
            return await db.collection('kuliner').get();
        } catch (error) {
            console.error('Error getting kuliner:', error);
            return [];
        }
    },

    async getWisata() {
        try {
            return await db.collection('wisata').get();
        } catch (error) {
            console.error('Error getting wisata:', error);
            return [];
        }
    },

    async getCarouselImages() {
        try {
            return await db.collection('carousel').get();
        } catch (error) {
            console.error('Error getting carousel:', error);
            return [];
        }
    },

    // Search functionality
    async search(query) {
        try {
            const results = [];

            // Search in kota
            const kotaResults = await db.collection('kota')
                .where('nama', '==', query)
                .get();
            results.push(...kotaResults.map(item => ({ ...item, type: 'kota' })));

            // Search in kuliner
            const kulinerResults = await db.collection('kuliner')
                .where('nama', '==', query)
                .get();
            results.push(...kulinerResults.map(item => ({ ...item, type: 'kuliner' })));

            // Search in wisata
            const wisataResults = await db.collection('wisata')
                .where('nama', '==', query)
                .get();
            results.push(...wisataResults.map(item => ({ ...item, type: 'wisata' })));

            return results;
        } catch (error) {
            console.error('Error searching:', error);
            return [];
        }
    }
};