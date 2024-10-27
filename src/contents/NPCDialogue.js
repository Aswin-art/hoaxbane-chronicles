const npc1 = [
  [
    "Permisi, Pak. Saya lihat Anda sedang bekerja di proyek ini. Bagaimana perkembangannya?"
  ],
  [
    "Ah, kacau! Kami ingin bekerja, tapi selalu ada yang mengganggu. Katanya kami hanya membuang-buang uang rakyat.",
  ],
  ["Tapi bukankah proyek ini untuk kepentingan rakyat juga?"],
];

const misi1 = [
  [
    "keadaan desa ini menjadi ricuh akibat 1 orang yang menyebarkan berita buruk tentang kerajaan 3 hari yang lalu.",
    "Seingatku ada sekitar 4 penduduk desa ini yang kelihatannya termakan berita itu.",
    "Ya, setidaknya ada 2 penduduk disini yang belum termakan berita itu selain aku. Mengingat umurku yang sudah tua begini, sudah susah untuk mengontrol orang-orang yang emosi itu, jadi aku ingin meminta bantuanmu untuk meradakan permasalahan di desa ini, kumohon.",
    "Terima kasih, nak, Aku akan memberimu hadiah yang bagus!",
  ],
  [
    "Cepat! orang - orang memerlukan bantuanmu.",
    "Pergi ke arah hutan barat dan kontrol emosi orang tersebut!",
  ],
  ["Tolong selamatkan kami!"],
];

// const misi1 = [
//   [
//     "Halo pak, apakah benar anda kepala desa ini?",
//   ],
//   [
//     "Halo, iya benar, saya kepala desa ini.",
//   ],
//   ["Saya dengar, desa ini sedang terjadi kericuhan akibat berita buruk tentang kerajaan, apakah itu benar?"],
//   ["Ya, keadaan desa ini menjadi ricuh akibat orang 1 orang yang menyebarkan berita buruk tentang kerajaan 3 hari yang lalu."],
//   ["Wah, apakah orang yang menyebarkan berita itu merupakan salah satu warga desa ini?"],
//   ["Entahlah, aku sendiri tak yakin. Jujur saja aku belum pernah melihat orang itu sebelumnya."],
//   ["Baiklah, lalu dari seluruh penduduk desa ini berapa orang yang memakan mentah-mentah berita tersebut?"],
//   ["Seingatku ada sekitar 4 penduduk desa ini yang kelihatannya termakan berita itu."],
//   ["Wah repot juga nih, lalu kira-kira apakah ada penduduk desa yang masih belum termakan berita tersebut?"],
//   ["Ya, setidaknya ada 2 penduduk disini yang belum termakan berita itu selain aku. Mengingat umurku yang sudah tua begini, sudah susah untuk mengontrol orang-orang yang emosi itu, jadi aku ingin meminta bantuanmu untuk meradakan permasalahan di desa ini, kumohon."],
//   ["Baiklah, akan kucoba semaksimal mungkin."],
//   ["Terima kasih, nak. Oh iya, sebagai informasi tambahan, kau bisa menemui 2 penduduk netral itu."],
//   ["Kalau benar begitu aku sangat terbantu, terima kasih atas segala informasinya pak. Sampai jumpa lagi."],
//   ["Ya, sampai jumpa lagi."],
// ];
const npc3 = [
  [
    "Pahlawan, para monster ganas muncul dari arah hutan sebelah barat!",
    "Para monster telah menyerang! menyebabkan kekacauan dan ketakutan.",
    "Pergi ke hutan barat dan kalahkan monster tersebut!",
    "Aku akan memberimu hadiah yang bagus!",
  ],
  [
    "Cepat! orang - orang memerlukan bantuanmu.",
    "Pergi ke arah hutan barat dan taklukan monster tersebut!",
  ],
  ["Tolong selamatkan kami!"],
];

const npc4 = [
  [
    "Terimakasih! telah mengalahkan monster - monster itu.",
    "Sekarang para monster muncul dari hutan arah utara!",
    "Pergi ke hutan utara dan kalahkan monster tersebut!",
    "Semoga dewi memberkatimu!",
  ],
  [
    "Cepat! orang - orang memerlukan bantuanmu.",
    "Pergi ke arah hutan utara dan taklukan monster tersebut!",
  ],
  ["Tolong selamatkan kami!"],
];

const npc5 = [
  [
    "Pahlawan anda sangat hebat!",
    "Aku mendapatkan informasi, monster muncul dari hutan selatan!",
    "Pergi ke hutan selatan dan basmi para monster!",
    "Kalahkan para monster agar kamu dapat membawa kedamaian!",
  ],
  [
    "Cepat! orang - orang memerlukan bantuanmu.",
    "Pergi ke arah hutan selatan dan basmi para monster!",
  ],
  ["Tolong selamatkan kami!"],
];

const npc6 = [
  [
    "Pahlawan, para monster memanggil boss mereka!",
    "Ini buruk, kita harus segera mengalahkan boss monster!",
    "Kalahkan boss monster sebelum dia mencelakai penduduk!",
    "Tidak ada waktu lagi, pergi sekarang!",
  ],
  [
    "Cepat! orang - orang memerlukan bantuanmu.",
    "Kalahkan boss monster agar penduduk merasa aman!",
  ],
  ["Tolong selamatkan kami!"],
];

const congratulate = [
  [
    "Terimakasih pahlawan, anda sangat hebat!",
    "Para monster berhasil dibasmi.",
    "Kedamaian telah kembali!",
  ],
  ["Kami sangat bersyukur atas bantuanmu!", "Semoga dewi selalu memberkatimu!"],
  ["Terimakasih!"],
];

const npcLines = {
  npc1,
  npc3,
  npc4,
  congratulate,
  misi1
};

export default npcLines;
