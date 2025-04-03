let currentScore = 0;
let team1Score = 0;
let team2Score = 0;
let currentTeam = 1;
let passCount = 3;
let currentQuestionIndex = 0;
let usedQuestionIndices = []; // Kullanılan soruların indekslerini tutan dizi
let unusedQuestions = []; // Henüz kullanılmamış soruların indeksleri
let questions = [];
let timeLeft = 90;
let timerInterval;
let gameActive = false;
let isFirstTurn = true;
let difficulty = 'normal'; // normal, easy, hard
let team1Name = "Takım 1";
let team2Name = "Takım 2";
let team1Stats = { correct: 0, wrong: 0, pass: 0 };
let team2Stats = { correct: 0, wrong: 0, pass: 0 };

const branchNames = {
    fen: 'Fen Bilimleri',
    sosyal: 'Sosyal Bilgiler',
    matematik: 'Matematik',
    turkce: 'Türkçe',
    din: 'Din Kültürü',
    gorsel: 'Görsel Sanatlar',
    muzik: 'Müzik',
    ingilizce: 'İngilizce',
    'genel-kultur': 'Genel Kültür'
};

const difficultySettings = {
    easy: {
        time: 120,
        points: {
            correct: 1,
            wrong: -1,
            pass: 0
        }
    },
    normal: {
        time: 90,
        points: {
            correct: 1,
            wrong: -1,
            pass: 0
        }
    },
    hard: {
        time: 60,
        points: {
            correct: 2,
            wrong: -2,
            pass: -1
        }
    }
};

// Sabit sorular
const allQuestions = {
    fen: [
        {
            mainWord: "Atom",
            tabuWords: ["Proton", "Nötron", "Elektron", "Çekirdek", "Element"]
        },
        {
            mainWord: "Molekül",
            tabuWords: ["Atom", "Bileşik", "Bağ", "Kimyasal", "Formül"]
        },
        {
            mainWord: "Element",
            tabuWords: ["Periyodik", "Atom", "Saf", "Madde", "Tablo"]
        },
        {
            mainWord: "Bileşik",
            tabuWords: ["Element", "Molekül", "Kimyasal", "Formül", "Reaksiyon"]
        },
        {
            mainWord: "Karışım",
            tabuWords: ["Homojen", "Heterojen", "Çözelti", "Ayırma", "Fiziksel"]
        },
        {
            mainWord: "Yoğunluk",
            tabuWords: ["Kütle", "Hacim", "Ağırlık", "Ölçüm", "Birim"]
        },
        {
            mainWord: "Hacim",
            tabuWords: ["Litre", "Metreküp", "Ölçüm", "Boyut", "Yer"]
        },
        {
            mainWord: "Kütle",
            tabuWords: ["Ağırlık", "Kilogram", "Gram", "Ölçüm", "Terazi"]
        },
        {
            mainWord: "Fiziksel Değişim",
            tabuWords: ["Hal", "Şekil", "Boyut", "Kimyasal", "Madde"]
        },
        {
            mainWord: "Kimyasal Değişim",
            tabuWords: ["Reaksiyon", "Yeni", "Madde", "Fiziksel", "Dönüşüm"]
        },
        {
            mainWord: "Fotosentez",
            tabuWords: ["Bitki", "Güneş", "Klorofil", "Oksijen", "Besin"]
        },
        {
            mainWord: "Solunum",
            tabuWords: ["Oksijen", "Karbondioksit", "Akciğer", "Hücre", "Enerji"]
        },
        {
            mainWord: "Ekosistem",
            tabuWords: ["Canlı", "Çevre", "Besin", "Zincir", "Döngü"]
        },
        {
            mainWord: "Besin Zinciri",
            tabuWords: ["Üretici", "Tüketici", "Ayrıştırıcı", "Enerji", "Transfer"]
        },
        {
            mainWord: "Biyoçeşitlilik",
            tabuWords: ["Tür", "Canlı", "Çeşit", "Yaşam", "Dünya"]
        },
        {
            mainWord: "Geri Dönüşüm",
            tabuWords: ["Atık", "Çevre", "Kullanım", "Yeniden", "Kazanım"]
        },
        {
            mainWord: "Sürtünme Kuvveti",
            tabuWords: ["Hareket", "Yüzey", "Direnç", "Kuvvet", "Newton"]
        },
        {
            mainWord: "Kaldırma Kuvveti",
            tabuWords: ["Sıvı", "Arşimet", "Yüzen", "Batma", "Hacim"]
        },
        {
            mainWord: "Manyetik Kuvvet",
            tabuWords: ["Mıknatıs", "Demir", "Kuzey", "Güney", "Alan"]
        },
        {
            mainWord: "Elektrik Devresi",
            tabuWords: ["Pil", "Ampul", "Tel", "Anahtar", "Elektron"]
        },
        {
            mainWord: "İletken",
            tabuWords: ["Metal", "Elektrik", "Akım", "Yalıtkan", "Tel"]
        },
        {
            mainWord: "Yalıtkan",
            tabuWords: ["Plastik", "Elektrik", "İletken", "Akım", "Kauçuk"]
        },
        {
            mainWord: "Isı",
            tabuWords: ["Sıcaklık", "Enerji", "Kalorimetre", "Transfer", "Termometre"]
        },
        {
            mainWord: "Sıcaklık",
            tabuWords: ["Termometre", "Isı", "Derece", "Ölçüm", "Celsius"]
        },
        {
            mainWord: "Buharlaşma",
            tabuWords: ["Sıvı", "Gaz", "Isı", "Su", "Kaynama"]
        },
        {
            mainWord: "Yoğuşma",
            tabuWords: ["Gaz", "Sıvı", "Su", "Buhar", "Soğuma"]
        },
        {
            mainWord: "Erime",
            tabuWords: ["Katı", "Sıvı", "Isı", "Sıcaklık", "Nokta"]
        },
        {
            mainWord: "Donma",
            tabuWords: ["Sıvı", "Katı", "Soğuma", "Nokta", "Buz"]
        },
        {
            mainWord: "Kaynama",
            tabuWords: ["Sıvı", "Gaz", "Isı", "Nokta", "Buhar"]
        },
        {
            mainWord: "Genleşme",
            tabuWords: ["Isı", "Boyut", "Hacim", "Sıcaklık", "Daralma"]
        },
        {
            mainWord: "Basınç",
            tabuWords: ["Kuvvet", "Alan", "Pascal", "Hava", "Sıvı"]
        },
        {
            mainWord: "Ses Dalgası",
            tabuWords: ["Titreşim", "Frekans", "Desibel", "Hız", "Yayılma"]
        },
        {
            mainWord: "Işık Kırılması",
            tabuWords: ["Prizma", "Renk", "Açı", "Hız", "Yansıma"]
        },
        {
            mainWord: "Yansıma",
            tabuWords: ["Ayna", "Işık", "Açı", "Yüzey", "Görüntü"]
        },
        {
            mainWord: "Gölge",
            tabuWords: ["Işık", "Engel", "Karanlık", "Boy", "Güneş"]
        },
        {
            mainWord: "Elektrik Akımı",
            tabuWords: ["Amper", "Volt", "Tel", "Elektron", "Devre"]
        },
        {
            mainWord: "Nükleer Enerji",
            tabuWords: ["Atom", "Fisyon", "Reaktör", "Radyasyon", "Santral"]
        },
        {
            mainWord: "Yenilenebilir Enerji",
            tabuWords: ["Güneş", "Rüzgar", "Su", "Temiz", "Kaynak"]
        },
        {
            mainWord: "Karbon Döngüsü",
            tabuWords: ["Karbondioksit", "Fotosentez", "Solunum", "Atmosfer", "Küresel"]
        },
        {
            mainWord: "Su Döngüsü",
            tabuWords: ["Yağmur", "Buharlaşma", "Yoğuşma", "Bulut", "Okyanus"]
        },
        {
            mainWord: "Hava Kirliliği",
            tabuWords: ["Kirletici", "Atmosfer", "Fabrika", "Egzoz", "Küresel"]
        },
        {
            mainWord: "Küresel Isınma",
            tabuWords: ["Sera", "Gaz", "Sıcaklık", "İklim", "Karbon"]
        },
        {
            mainWord: "Ozon Tabakası",
            tabuWords: ["Atmosfer", "Ultraviyole", "Koruma", "Delik", "Güneş"]
        },
        {
            mainWord: "DNA",
            tabuWords: ["Gen", "Kromozom", "Kalıtım", "Protein", "Nükleotid"]
        },
        {
            mainWord: "Hücre",
            tabuWords: ["Zar", "Çekirdek", "Sitoplazma", "Organel", "Doku"]
        },
        {
            mainWord: "Organ",
            tabuWords: ["Doku", "Sistem", "Vücut", "Görev", "Yapı"]
        },
        {
            mainWord: "Duyu Organları",
            tabuWords: ["Göz", "Kulak", "Burun", "Dil", "Deri"]
        },
        {
            mainWord: "Sindirim Sistemi",
            tabuWords: ["Mide", "Bağırsak", "Besin", "Enzim", "Ağız"]
        },
        {
            mainWord: "Boşaltım Sistemi",
            tabuWords: ["Böbrek", "İdrar", "Atık", "Süzme", "Vücut"]
        },
        {
            mainWord: "Kas Sistemi",
            tabuWords: ["Kasılma", "Hareket", "İskelet", "Kas", "Güç"]
        },
        {
            mainWord: "İskelet Sistemi",
            tabuWords: ["Kemik", "Eklem", "Destek", "Koruma", "Kas"]
        }
    ],
    sosyal: [
        {
            mainWord: "İstanbul",
            tabuWords: ["Boğaz", "Fatih", "Osmanlı", "Başkent", "Marmara"]
        },
        {
            mainWord: "Kurtuluş Savaşı",
            tabuWords: ["Atatürk", "Ankara", "TBMM", "İstiklal", "Cephe"]
        },
        {
            mainWord: "Malazgirt",
            tabuWords: ["Alparslan", "1071", "Anadolu", "Selçuklu", "Bizans"]
        },
        {
            mainWord: "İstanbul'un Fethi",
            tabuWords: ["Fatih", "1453", "Bizans", "Top", "Gemiler"]
        },
        {
            mainWord: "Amerika",
            tabuWords: ["Kolomb", "Kızılderili", "Kıta", "Yeni Dünya", "İndian"]
        },
        {
            mainWord: "Fransız İhtilali",
            tabuWords: ["1789", "Bastille", "Napolyon", "Özgürlük", "Eşitlik"]
        },
        {
            mainWord: "Sanayi Devrimi",
            tabuWords: ["Buhar", "Makine", "Fabrika", "İngiltere", "Üretim"]
        },
        {
            mainWord: "Rönesans",
            tabuWords: ["Leonardo", "Sanat", "İtalya", "Yeniden Doğuş", "Hümanizm"]
        },
        {
            mainWord: "Reform",
            tabuWords: ["Luther", "Kilise", "Protestan", "Katolik", "Din"]
        },
        {
            mainWord: "Haçlı Seferleri",
            tabuWords: ["Kudüs", "Haç", "Papa", "Müslüman", "Kutsal"]
        },
        {
            mainWord: "Magna Carta",
            tabuWords: ["1215", "İngiltere", "Kral", "Haklar", "Özgürlük"]
        },
        {
            mainWord: "Amerikan Bağımsızlık",
            tabuWords: ["Washington", "1776", "Bağımsızlık", "İngiltere", "Savaş"]
        },
        {
            mainWord: "Rus Devrimi",
            tabuWords: ["1917", "Lenin", "Komünist", "Çar", "Bolşevik"]
        },
        {
            mainWord: "Hiroşima",
            tabuWords: ["Atom", "Bomba", "Japonya", "1945", "Nagazaki"]
        },
        {
            mainWord: "Berlin Duvarı",
            tabuWords: ["1961", "1989", "Doğu", "Batı", "Almanya"]
        },
        {
            mainWord: "Vietnam Savaşı",
            tabuWords: ["Amerika", "Güney", "Kuzey", "Ho Chi Minh", "Komünist"]
        },
        {
            mainWord: "Küba Krizi",
            tabuWords: ["Kennedy", "Kruşçev", "Füze", "Amerika", "Sovyet"]
        },
        {
            mainWord: "Apartheid",
            tabuWords: ["Güney Afrika", "Irkçılık", "Mandela", "Siyah", "Beyaz"]
        },
        {
            mainWord: "11 Eylül",
            tabuWords: ["2001", "Terör", "İkiz Kuleler", "El Kaide", "Amerika"]
        },
        {
            mainWord: "Arap Baharı",
            tabuWords: ["2011", "Tunus", "Mısır", "Libya", "Suriye"]
        }
    ],
    matematik: [
        {
            mainWord: "Üçgen",
            tabuWords: ["Açı", "Kenar", "Dik", "Hipotenüs", "Pisagor"]
        },
        {
            mainWord: "Pi",
            tabuWords: ["3.14", "Çember", "Çap", "Yarıçap", "Alan"]
        },
        {
            mainWord: "Kare",
            tabuWords: ["Dört", "Kenar", "Köşe", "Alan", "Çevre"]
        },
        {
            mainWord: "Daire",
            tabuWords: ["Çember", "Yarıçap", "Merkez", "Alan", "Çap"]
        },
        {
            mainWord: "Küp",
            tabuWords: ["Hacim", "Kenar", "Yüzey", "Kare", "Küp"]
        },
        {
            mainWord: "Silindir",
            tabuWords: ["Yükseklik", "Yarıçap", "Hacim", "Daire", "Yüzey"]
        },
        {
            mainWord: "Koni",
            tabuWords: ["Taban", "Tepe", "Yükseklik", "Yarıçap", "Hacim"]
        },
        {
            mainWord: "Küre",
            tabuWords: ["Yarıçap", "Hacim", "Yüzey", "Merkez", "Çap"]
        },
        {
            mainWord: "Prizma",
            tabuWords: ["Taban", "Yükseklik", "Yüzey", "Hacim", "Kenar"]
        },
        {
            mainWord: "Pisagor",
            tabuWords: ["Teorem", "Hipotenüs", "Dik", "Üçgen", "Kare"]
        },
        {
            mainWord: "Trigonometri",
            tabuWords: ["Sinüs", "Kosinüs", "Tanjant", "Açı", "Üçgen"]
        },
        {
            mainWord: "Logaritma",
            tabuWords: ["Üs", "Taban", "Sayı", "E", "Doğal"]
        },
        {
            mainWord: "Fonksiyon",
            tabuWords: ["Değişken", "Grafik", "X", "Y", "Eksen"]
        },
        {
            mainWord: "Türev",
            tabuWords: ["Limit", "Eğim", "Fonksiyon", "Değişim", "Hız"]
        },
        {
            mainWord: "İntegral",
            tabuWords: ["Alan", "Hacim", "Toplam", "Fonksiyon", "Türev"]
        },
        {
            mainWord: "Matris",
            tabuWords: ["Satır", "Sütun", "Determinant", "Çarpım", "Toplam"]
        },
        {
            mainWord: "Permütasyon",
            tabuWords: ["Sıralama", "Faktöriyel", "Kombinasyon", "Sayı", "Diziliş"]
        },
        {
            mainWord: "Olasılık",
            tabuWords: ["Şans", "Zar", "Para", "Yüzde", "İstatistik"]
        },
        {
            mainWord: "Kümeler",
            tabuWords: ["Eleman", "Birleşim", "Kesişim", "Alt küme", "Boş"]
        },
        {
            mainWord: "Polinom",
            tabuWords: ["Terim", "Katsayı", "Derece", "Kök", "Çarpan"]
        }
    ],
    turkce: [
        {
            mainWord: "Roman",
            tabuWords: ["Kitap", "Yazar", "Hikaye", "Karakter", "Bölüm"]
        },
        {
            mainWord: "Şiir",
            tabuWords: ["Dize", "Kafiye", "Şair", "Mısra", "Nazım"]
        },
        {
            mainWord: "Tiyatro",
            tabuWords: ["Sahne", "Oyuncu", "Perde", "Dekor", "Kostüm"]
        },
        {
            mainWord: "Deneme",
            tabuWords: ["Yazar", "Düşünce", "Fikir", "Kişisel", "Öznel"]
        },
        {
            mainWord: "Makale",
            tabuWords: ["Bilimsel", "Araştırma", "Kaynak", "Kanıt", "Tez"]
        },
        {
            mainWord: "Biyografi",
            tabuWords: ["Yaşam", "Kişi", "Hayat", "Otobiyografi", "Tarih"]
        },
        {
            mainWord: "Anı",
            tabuWords: ["Hatıra", "Geçmiş", "Kişisel", "Yaşanmış", "Zaman"]
        },
        {
            mainWord: "Günlük",
            tabuWords: ["Gün", "Tarih", "Kişisel", "Yazı", "Kayıt"]
        },
        {
            mainWord: "Mektup",
            tabuWords: ["Yazı", "Gönderi", "Alıcı", "Gönderen", "Zarf"]
        },
        {
            mainWord: "Fıkra",
            tabuWords: ["Gülme", "Kısa", "Hikaye", "Punch", "Son"]
        },
        {
            mainWord: "Masal",
            tabuWords: ["Peri", "Prens", "Prenses", "Kral", "Kraliçe"]
        },
        {
            mainWord: "Destan",
            tabuWords: ["Kahraman", "Savaş", "Millet", "Tarih", "Efsane"]
        },
        {
            mainWord: "Efsane",
            tabuWords: ["Halk", "Gerçek", "Hikaye", "Tarih", "Mitolojik"]
        },
        {
            mainWord: "Mizah",
            tabuWords: ["Gülme", "Komik", "Espri", "Güldürü", "Şaka"]
        },
        {
            mainWord: "Eleştiri",
            tabuWords: ["Değerlendirme", "Yorum", "Analiz", "İnceleme", "Tenkit"]
        },
        {
            mainWord: "Söyleşi",
            tabuWords: ["Konuşma", "Sohbet", "Röportaj", "İki", "Kişi"]
        },
        {
            mainWord: "Gezi",
            tabuWords: ["Seyahat", "Yolculuk", "Yer", "Gezmek", "Görmek"]
        },
        {
            mainWord: "Röportaj",
            tabuWords: ["Soru", "Cevap", "Gazete", "Muhabir", "Konuşma"]
        },
        {
            mainWord: "Otobiyografi",
            tabuWords: ["Kendisi", "Yaşam", "Hayat", "Kendini", "Yazmak"]
        },
        {
            mainWord: "Öykü",
            tabuWords: ["Kısa", "Hikaye", "Olay", "Karakter", "Anlatı"]
        }
    ],
    din: [
        {
            mainWord: "Namaz",
            tabuWords: ["Vakit", "Rekat", "Abdest", "Kıble", "İmam"]
        },
        {
            mainWord: "Ramazan",
            tabuWords: ["Oruç", "İftar", "Sahur", "Ay", "Kuran"]
        },
        {
            mainWord: "Hac",
            tabuWords: ["Kabe", "Mekke", "Medine", "İhram", "Ziyaret"]
        },
        {
            mainWord: "Zekat",
            tabuWords: ["Mal", "Yüzde", "Sadaka", "Fakir", "Müslüman"]
        },
        {
            mainWord: "Kelime-i Şehadet",
            tabuWords: ["İman", "Allah", "Muhammed", "Şahitlik", "İnanç"]
        },
        {
            mainWord: "Abdest",
            tabuWords: ["Yüz", "El", "Ayak", "Baş", "Namaz"]
        },
        {
            mainWord: "Gusül",
            tabuWords: ["Banyo", "Yıkanma", "Temizlik", "Boy", "Abdest"]
        },
        {
            mainWord: "Teyemmüm",
            tabuWords: ["Toprak", "Su", "Abdest", "Temizlik", "Namaz"]
        },
        {
            mainWord: "Kuran",
            tabuWords: ["Ayet", "Sure", "Kitap", "Vahiy", "Cebrail"]
        },
        {
            mainWord: "Hadis",
            tabuWords: ["Peygamber", "Söz", "Ravi", "Sahih", "Zayıf"]
        },
        {
            mainWord: "Sünnet",
            tabuWords: ["Peygamber", "Yol", "Yöntem", "Uygulama", "Örnek"]
        },
        {
            mainWord: "Farz",
            tabuWords: ["Zorunlu", "Vacip", "Namaz", "Oruç", "Hac"]
        },
        {
            mainWord: "Vacip",
            tabuWords: ["Farz", "Zorunlu", "Namaz", "Bayram", "Vitir"]
        },
        {
            mainWord: "Sünnet",
            tabuWords: ["Peygamber", "Yol", "Yöntem", "Uygulama", "Örnek"]
        },
        {
            mainWord: "Müstehab",
            tabuWords: ["Sünnet", "İsteğe", "Bağlı", "Sevap", "İbadet"]
        },
        {
            mainWord: "Mekruh",
            tabuWords: ["Hoş", "Olmayan", "Yasak", "Günah", "İbadet"]
        },
        {
            mainWord: "Haram",
            tabuWords: ["Yasak", "Günah", "Ceza", "İbadet", "Dini"]
        },
        {
            mainWord: "Helal",
            tabuWords: ["İzin", "Serbest", "Dini", "Caiz", "Mübah"]
        },
        {
            mainWord: "Şirk",
            tabuWords: ["Allah", "Ortak", "Koşmak", "Günah", "İman"]
        },
        {
            mainWord: "Küfür",
            tabuWords: ["İman", "İnanmamak", "Reddetmek", "Şirk", "Günah"]
        }
    ],
    gorsel: [
        {
            mainWord: "Perspektif",
            tabuWords: ["Derinlik", "Uzaklık", "Çizgi", "Nokta", "Kaçış"]
        },
        {
            mainWord: "Kompozisyon",
            tabuWords: ["Düzen", "Yerleşim", "Denge", "Ritim", "Tasarım"]
        },
        {
            mainWord: "Ton",
            tabuWords: ["Renk", "Açık", "Koyu", "Pigment", "Boyama"]
        },
        {
            mainWord: "Doku",
            tabuWords: ["Yüzey", "Dokunma", "Pürüz", "Dokunmak", "Dokunma"]
        },
        {
            mainWord: "Ritim",
            tabuWords: ["Tekrar", "Hareket", "Düzen", "Kompozisyon", "Müzik"]
        },
        {
            mainWord: "Kontrast",
            tabuWords: ["Zıtlık", "Renk", "Ton", "Açık", "Koyu"]
        },
        {
            mainWord: "Fovizm",
            tabuWords: ["Renk", "Matisse", "Vahşi", "Modern", "Sanat"]
        },
        {
            mainWord: "Empresyonizm",
            tabuWords: ["Monet", "Işık", "Renk", "Manzara", "Modern"]
        },
        {
            mainWord: "Ekspresyonizm",
            tabuWords: ["Duygu", "Dışavurum", "Van Gogh", "Modern", "Sanat"]
        },
        {
            mainWord: "Soyut Sanat",
            tabuWords: ["Kandinsky", "Geometrik", "Modern", "Sanat", "Form"]
        },
        {
            mainWord: "Figür",
            tabuWords: ["İnsan", "Vücut", "Çizim", "Resim", "Portre"]
        },
        {
            mainWord: "Anamorfoz",
            tabuWords: ["Bozuk", "Perspektif", "Çizim", "Görsel", "Yanılsama"]
        },
        {
            mainWord: "Art Nouveau",
            tabuWords: ["Süsleme", "Çizgi", "Modern", "Sanat", "Dekoratif"]
        },
        {
            mainWord: "Art Deco",
            tabuWords: ["Geometrik", "Modern", "Dekoratif", "Sanat", "Tasarım"]
        },
        {
            mainWord: "Minimalizm",
            tabuWords: ["Sade", "Basit", "Modern", "Sanat", "Az"]
        },
        {
            mainWord: "Pop Art",
            tabuWords: ["Warhol", "Modern", "Reklam", "Sanat", "Kitle"]
        },
        {
            mainWord: "Barok",
            tabuWords: ["Süsleme", "Klasik", "Sanat", "Mimari", "Rokoko"]
        },
        {
            mainWord: "Rokoko",
            tabuWords: ["Süsleme", "Barok", "Sanat", "Mimari", "Dekoratif"]
        },
        {
            mainWord: "Realizm",
            tabuWords: ["Gerçekçi", "Doğa", "Sanat", "Resim", "Görüntü"]
        },
        {
            mainWord: "Rönesans",
            tabuWords: ["Leonardo", "Yeniden", "Sanat", "İtalya", "Klasik"]
        },
        {
            mainWord: "Sürrealizm",
            tabuWords: ["Dali", "Rüya", "Modern", "Sanat", "Gerçeküstü"]
        },
        {
            mainWord: "Kübizm",
            tabuWords: ["Picasso", "Geometrik", "Modern", "Sanat", "Form"]
        },
        {
            mainWord: "Hareketli Sanat",
            tabuWords: ["Kinetic", "Hareket", "Modern", "Sanat", "Mobil"]
        },
        {
            mainWord: "Heykel",
            tabuWords: ["Üç Boyut", "Taş", "Kil", "Sanat", "Form"]
        },
        {
            mainWord: "Baskı Resim",
            tabuWords: ["Gravür", "Ahşap", "Metal", "Sanat", "Teknik"]
        },
        {
            mainWord: "Kolaj",
            tabuWords: ["Yapıştırma", "Kağıt", "Modern", "Sanat", "Teknik"]
        },
        {
            mainWord: "Fresk",
            tabuWords: ["Duvar", "Sıva", "Boyama", "Sanat", "Teknik"]
        },
        {
            mainWord: "Mozaik",
            tabuWords: ["Taş", "Parça", "Yapıştırma", "Sanat", "Teknik"]
        },
        {
            mainWord: "Gravür",
            tabuWords: ["Kazıma", "Metal", "Ahşap", "Sanat", "Teknik"]
        },
        {
            mainWord: "İllüstrasyon",
            tabuWords: ["Çizim", "Kitap", "Görsel", "Sanat", "Tasarım"]
        },
        {
            mainWord: "Monokrom",
            tabuWords: ["Tek Renk", "Siyah", "Beyaz", "Sanat", "Ton"]
        },
        {
            mainWord: "İkonografi",
            tabuWords: ["Sembol", "Anlam", "Sanat", "Resim", "Tarih"]
        },
        {
            mainWord: "Grafik Tasarım",
            tabuWords: ["Bilgisayar", "Logo", "Tasarım", "Sanat", "Dijital"]
        },
        {
            mainWord: "Portre",
            tabuWords: ["İnsan", "Yüz", "Resim", "Sanat", "Figür"]
        },
        {
            mainWord: "Natürmort",
            tabuWords: ["Cansız", "Nesne", "Resim", "Sanat", "Konu"]
        },
        {
            mainWord: "Peyzaj",
            tabuWords: ["Manzara", "Doğa", "Resim", "Sanat", "Konu"]
        },
        {
            mainWord: "Fırça Tekniği",
            tabuWords: ["Boyama", "Fırça", "Resim", "Sanat", "Teknik"]
        },
        {
            mainWord: "Tipografi",
            tabuWords: ["Yazı", "Font", "Tasarım", "Sanat", "Grafik"]
        },
        {
            mainWord: "Estetik",
            tabuWords: ["Güzel", "Sanat", "Felsefe", "Beğeni", "Değer"]
        },
        {
            mainWord: "Sanat Eleştirisi",
            tabuWords: ["Değerlendirme", "Yorum", "Sanat", "Analiz", "İnceleme"]
        },
        {
            mainWord: "Vitray",
            tabuWords: ["Cam", "Renk", "Pencere", "Sanat", "Teknik"]
        },
        {
            mainWord: "Dadaizm",
            tabuWords: ["Avangart", "Modern", "Sanat", "Akım", "Mantıksız"]
        },
        {
            mainWord: "Göstergebilim",
            tabuWords: ["Sembol", "Anlam", "İşaret", "Sanat", "Bilim"]
        },
        {
            mainWord: "Happening",
            tabuWords: ["Performans", "Modern", "Sanat", "Olay", "Etkinlik"]
        },
        {
            mainWord: "İmge",
            tabuWords: ["Görüntü", "Hayal", "Sanat", "Resim", "Düşünce"]
        },
        {
            mainWord: "Figüratif Sanat",
            tabuWords: ["Gerçekçi", "Figür", "Sanat", "Resim", "Konu"]
        },
        {
            mainWord: "Alegori",
            tabuWords: ["Sembol", "Anlam", "Sanat", "Resim", "Temsil"]
        },
        {
            mainWord: "Pastel",
            tabuWords: ["Boya", "Kuru", "Resim", "Sanat", "Teknik"]
        },
        {
            mainWord: "Anıtsal Sanat",
            tabuWords: ["Büyük", "Heykel", "Sanat", "Mimari", "Eser"]
        },
        {
            mainWord: "Çağdaş Sanat",
            tabuWords: ["Modern", "Güncel", "Sanat", "Akım", "Dönem"]
        }
    ],
    muzik: [
        {
            mainWord: "Nota",
            tabuWords: ["Müzik", "Melodi", "Solfej", "Porte", "Ritim"]
        },
        {
            mainWord: "Gitar",
            tabuWords: ["Tel", "Akort", "Çalmak", "Teller", "Müzik"]
        },
        {
            mainWord: "Piyano",
            tabuWords: ["Tuş", "Klavye", "Çalmak", "Müzik", "Enstrüman"]
        },
        {
            mainWord: "Keman",
            tabuWords: ["Yay", "Tel", "Çalmak", "Enstrüman", "Müzik"]
        },
        {
            mainWord: "Davul",
            tabuWords: ["Vurma", "Ritim", "Zil", "Tokmak", "Müzik"]
        },
        {
            mainWord: "Flüt",
            tabuWords: ["Üflemek", "Delik", "Müzik", "Enstrüman", "Çalmak"]
        },
        {
            mainWord: "Saksafon",
            tabuWords: ["Üflemek", "Jazz", "Müzik", "Enstrüman", "Çalmak"]
        },
        {
            mainWord: "Trompet",
            tabuWords: ["Üflemek", "Bakır", "Müzik", "Enstrüman", "Çalmak"]
        },
        {
            mainWord: "Viyolonsel",
            tabuWords: ["Yay", "Tel", "Çalmak", "Enstrüman", "Müzik"]
        },
        {
            mainWord: "Kontrbas",
            tabuWords: ["Yay", "Tel", "Çalmak", "Enstrüman", "Müzik"]
        },
        {
            mainWord: "Arp",
            tabuWords: ["Tel", "Çalmak", "Müzik", "Enstrüman", "Teller"]
        },
        {
            mainWord: "Org",
            tabuWords: ["Tuş", "Klavye", "Çalmak", "Müzik", "Enstrüman"]
        },
        {
            mainWord: "Akordeon",
            tabuWords: ["Tuş", "Klavye", "Çalmak", "Müzik", "Enstrüman"]
        },
        {
            mainWord: "Mandolin",
            tabuWords: ["Tel", "Çalmak", "Müzik", "Enstrüman", "Teller"]
        },
        {
            mainWord: "Ukulele",
            tabuWords: ["Tel", "Çalmak", "Müzik", "Enstrüman", "Teller"]
        },
        {
            mainWord: "Bateri",
            tabuWords: ["Vurma", "Ritim", "Zil", "Davul", "Müzik"]
        },
        {
            mainWord: "Marakas",
            tabuWords: ["Vurma", "Ritim", "Çalmak", "Müzik", "Enstrüman"]
        },
        {
            mainWord: "Ksilofon",
            tabuWords: ["Vurma", "Çalmak", "Müzik", "Enstrüman", "Tahta"]
        },
        {
            mainWord: "Trombon",
            tabuWords: ["Üflemek", "Bakır", "Müzik", "Enstrüman", "Çalmak"]
        },
        {
            mainWord: "Korno",
            tabuWords: ["Üflemek", "Bakır", "Müzik", "Enstrüman", "Çalmak"]
        }
    ],
    ingilizce: [
        {
            mainWord: "Computer",
            tabuWords: ["Screen", "Keyboard", "Mouse", "Internet", "Program"]
        },
        {
            mainWord: "Book",
            tabuWords: ["Read", "Page", "Story", "Library", "Author"]
        },
        {
            mainWord: "School",
            tabuWords: ["Teacher", "Student", "Class", "Lesson", "Education"]
        },
        {
            mainWord: "House",
            tabuWords: ["Home", "Room", "Door", "Window", "Family"]
        },
        {
            mainWord: "Car",
            tabuWords: ["Drive", "Wheel", "Road", "Engine", "Speed"]
        },
        {
            mainWord: "Phone",
            tabuWords: ["Call", "Message", "Screen", "Number", "Mobile"]
        },
        {
            mainWord: "Food",
            tabuWords: ["Eat", "Meal", "Restaurant", "Cook", "Taste"]
        },
        {
            mainWord: "Water",
            tabuWords: ["Drink", "River", "Sea", "Lake", "Rain"]
        },
        {
            mainWord: "Time",
            tabuWords: ["Clock", "Hour", "Minute", "Day", "Watch"]
        },
        {
            mainWord: "Money",
            tabuWords: ["Bank", "Pay", "Buy", "Price", "Cash"]
        },
        {
            mainWord: "Friend",
            tabuWords: ["Person", "Together", "Meet", "Talk", "Share"]
        },
        {
            mainWord: "Work",
            tabuWords: ["Job", "Office", "Business", "Company", "Salary"]
        },
        {
            mainWord: "Music",
            tabuWords: ["Song", "Sing", "Play", "Sound", "Band"]
        },
        {
            mainWord: "Movie",
            tabuWords: ["Film", "Watch", "Cinema", "Actor", "Story"]
        },
        {
            mainWord: "Game",
            tabuWords: ["Play", "Fun", "Win", "Player", "Score"]
        },
        {
            mainWord: "Sport",
            tabuWords: ["Play", "Team", "Win", "Match", "Player"]
        },
        {
            mainWord: "Weather",
            tabuWords: ["Sun", "Rain", "Cloud", "Wind", "Temperature"]
        },
        {
            mainWord: "City",
            tabuWords: ["Town", "Street", "Building", "People", "Center"]
        },
        {
            mainWord: "Country",
            tabuWords: ["Nation", "People", "Language", "Flag", "Capital"]
        },
        {
            mainWord: "Language",
            tabuWords: ["Speak", "Talk", "Word", "Learn", "Translate"]
        },
        {
            mainWord: "Color",
            tabuWords: ["Red", "Blue", "Green", "Yellow", "Paint"]
        },
        {
            mainWord: "Number",
            tabuWords: ["Count", "Math", "Add", "Plus", "Minus"]
        },
        {
            mainWord: "Day",
            tabuWords: ["Sun", "Morning", "Night", "Week", "Date"]
        },
        {
            mainWord: "Month",
            tabuWords: ["Year", "Calendar", "Date", "Week", "Day"]
        },
        {
            mainWord: "Season",
            tabuWords: ["Spring", "Summer", "Winter", "Fall", "Weather"]
        },
        {
            mainWord: "Animal",
            tabuWords: ["Pet", "Wild", "Zoo", "Farm", "Bird"]
        },
        {
            mainWord: "Plant",
            tabuWords: ["Tree", "Flower", "Grow", "Garden", "Green"]
        },
        {
            mainWord: "Clothes",
            tabuWords: ["Wear", "Dress", "Shirt", "Pants", "Shoes"]
        },
        {
            mainWord: "Body",
            tabuWords: ["Head", "Hand", "Foot", "Face", "Health"]
        },
        {
            mainWord: "Family",
            tabuWords: ["Mother", "Father", "Sister", "Brother", "Home"]
        },
        {
            mainWord: "Job",
            tabuWords: ["Work", "Career", "Office", "Company", "Salary"]
        },
        {
            mainWord: "Hobby",
            tabuWords: ["Fun", "Interest", "Activity", "Free", "Time"]
        },
        {
            mainWord: "Travel",
            tabuWords: ["Trip", "Journey", "Tourist", "Visit", "Tour"]
        },
        {
            mainWord: "Shopping",
            tabuWords: ["Buy", "Store", "Price", "Money", "Market"]
        },
        {
            mainWord: "Restaurant",
            tabuWords: ["Food", "Eat", "Menu", "Table", "Order"]
        },
        {
            mainWord: "Hospital",
            tabuWords: ["Doctor", "Patient", "Sick", "Medicine", "Health"]
        },
        {
            mainWord: "Police",
            tabuWords: ["Officer", "Law", "Crime", "Station", "Arrest"]
        },
        {
            mainWord: "Fire",
            tabuWords: ["Flame", "Burn", "Smoke", "Hot", "Extinguish"]
        },
        {
            mainWord: "Earth",
            tabuWords: ["World", "Planet", "Land", "Ocean", "Space"]
        },
        {
            mainWord: "Sun",
            tabuWords: ["Star", "Light", "Hot", "Sky", "Day"]
        },
        {
            mainWord: "Moon",
            tabuWords: ["Night", "Sky", "Star", "Light", "Space"]
        },
        {
            mainWord: "Star",
            tabuWords: ["Sky", "Night", "Space", "Light", "Sun"]
        },
        {
            mainWord: "Ocean",
            tabuWords: ["Sea", "Water", "Beach", "Wave", "Fish"]
        },
        {
            mainWord: "Mountain",
            tabuWords: ["High", "Climb", "Peak", "Hill", "Snow"]
        },
        {
            mainWord: "Forest",
            tabuWords: ["Tree", "Wood", "Nature", "Green", "Wild"]
        },
        {
            mainWord: "Desert",
            tabuWords: ["Sand", "Hot", "Dry", "Camel", "Oasis"]
        },
        {
            mainWord: "Island",
            tabuWords: ["Sea", "Beach", "Ocean", "Land", "Water"]
        },
        {
            mainWord: "River",
            tabuWords: ["Water", "Flow", "Stream", "Lake", "Bridge"]
        },
        {
            mainWord: "Lake",
            tabuWords: ["Water", "Swim", "Fish", "Boat", "River"]
        },
        {
            mainWord: "Beach",
            tabuWords: ["Sea", "Sand", "Sun", "Swim", "Wave"]
        },
        {
            mainWord: "Park",
            tabuWords: ["Tree", "Grass", "Play", "Walk", "Garden"]
        },
        {
            mainWord: "Garden",
            tabuWords: ["Flower", "Plant", "Tree", "Grow", "Green"]
        },
        {
            mainWord: "Farm",
            tabuWords: ["Animal", "Crop", "Field", "Farmer", "Grow"]
        },
        {
            mainWord: "Zoo",
            tabuWords: ["Animal", "Wild", "Cage", "Visit", "Park"]
        },
        {
            mainWord: "Museum",
            tabuWords: ["Art", "History", "Exhibit", "Visit", "Learn"]
        },
        {
            mainWord: "Library",
            tabuWords: ["Book", "Read", "Study", "Borrow", "Quiet"]
        },
        {
            mainWord: "School",
            tabuWords: ["Learn", "Teacher", "Student", "Class", "Education"]
        },
        {
            mainWord: "University",
            tabuWords: ["College", "Study", "Student", "Degree", "Learn"]
        },
        {
            mainWord: "Office",
            tabuWords: ["Work", "Business", "Company", "Desk", "Computer"]
        },
        {
            mainWord: "Factory",
            tabuWords: ["Work", "Machine", "Product", "Worker", "Industry"]
        },
        {
            mainWord: "Shop",
            tabuWords: ["Buy", "Store", "Sell", "Price", "Customer"]
        },
        {
            mainWord: "Market",
            tabuWords: ["Buy", "Food", "Shop", "Price", "Sell"]
        },
        {
            mainWord: "Bank",
            tabuWords: ["Money", "Account", "Save", "Cash", "Credit"]
        },
        {
            mainWord: "Post Office",
            tabuWords: ["Mail", "Letter", "Send", "Package", "Stamp"]
        },
        {
            mainWord: "Train Station",
            tabuWords: ["Train", "Travel", "Platform", "Ticket", "Railway"]
        },
        {
            mainWord: "Airport",
            tabuWords: ["Plane", "Fly", "Travel", "Ticket", "Flight"]
        },
        {
            mainWord: "Bus Stop",
            tabuWords: ["Bus", "Travel", "Wait", "Ticket", "Route"]
        }
    ],
    'genel-kultur': [
        {
            mainWord: "Rönesans",
            tabuWords: ["Yeniden Doğuş", "Reform", "İtalya", "Sanat", "Bilim"]
        },
        {
            mainWord: "Mona Lisa",
            tabuWords: ["Leonardo", "da Vinci", "Tablo", "Kadın", "Gülümseme"]
        },
        {
            mainWord: "Eyfel Kulesi",
            tabuWords: ["Paris", "Fransa", "Demir", "Yapı", "Turistik"]
        },
        {
            mainWord: "Piramitler",
            tabuWords: ["Mısır", "Firavun", "Mezar", "Sfenks", "Taş"]
        },
        {
            mainWord: "Pandemi",
            tabuWords: ["Salgın", "Hastalık", "Dünya", "Virüs", "Maske"]
        },
        {
            mainWord: "Demokrasi",
            tabuWords: ["Yönetim", "Halk", "Seçim", "Oy", "Sistem"]
        },
        {
            mainWord: "Astronot",
            tabuWords: ["Uzay", "Roket", "NASA", "Yerçekimi", "Gezegenler"]
        },
        {
            mainWord: "Nobel Ödülü",
            tabuWords: ["Bilim", "Ödül", "Alfred", "Dinamit", "İsveç"]
        },
        {
            mainWord: "Antik Roma",
            tabuWords: ["İmparatorluk", "Gladyatör", "Kolezyum", "Sezar", "Medeniyet"]
        },
        {
            mainWord: "Osmanlı",
            tabuWords: ["Padişah", "İmparatorluk", "Topkapı", "Fatih", "Türk"]
        },
        {
            mainWord: "Mozart",
            tabuWords: ["Besteci", "Müzik", "Avusturya", "Klasik", "Senfoni"]
        },
        {
            mainWord: "Picasso",
            tabuWords: ["Ressam", "Tablo", "Kübizm", "İspanya", "Sanat"]
        },
        {
            mainWord: "Shakespare",
            tabuWords: ["Yazar", "Tiyatro", "İngiliz", "Hamlet", "Oyun"]
        },
        {
            mainWord: "Everest",
            tabuWords: ["Dağ", "Zirve", "Yüksek", "Himalayalar", "Tırmanış"]
        },
        {
            mainWord: "Ninjaları",
            tabuWords: ["Japonya", "Savaşçı", "Gizli", "Samuray", "Silah"]
        },
        {
            mainWord: "Vatikan",
            tabuWords: ["Papa", "Katolik", "Kilise", "Roma", "Şehir"]
        },
        {
            mainWord: "Burç Kalifa",
            tabuWords: ["Dubai", "Gökdelen", "Bina", "Yüksek", "Mimari"]
        },
        {
            mainWord: "Amazon",
            tabuWords: ["Orman", "Nehir", "Güney Amerika", "Brezilya", "Yağmur"]
        },
        {
            mainWord: "Tarkan",
            tabuWords: ["Şarkıcı", "Türk", "Pop", "Müzik", "Albüm"]
        },
        {
            mainWord: "Titanik",
            tabuWords: ["Gemi", "Batık", "Buz Dağı", "Okyanus", "Film"]
        },
        {
            mainWord: "Tesla",
            tabuWords: ["Elektrik", "Araba", "Elon Musk", "Şirket", "Batarya"]
        },
        {
            mainWord: "Samanyolu",
            tabuWords: ["Galaksi", "Yıldız", "Güneş", "Uzay", "Sistem"]
        },
        {
            mainWord: "Sinema",
            tabuWords: ["Film", "Oscar", "Hollywood", "Seyirci", "Perde"]
        },
        {
            mainWord: "Olimpiyat",
            tabuWords: ["Spor", "Madalya", "Yarışma", "Atlet", "Oyunlar"]
        },
        {
            mainWord: "Kraliçe",
            tabuWords: ["Taç", "İngiltere", "Elizabeth", "Saray", "Monarşi"]
        },
        {
            mainWord: "Van Gogh",
            tabuWords: ["Ressam", "Kulak", "Yıldızlı Gece", "Hollanda", "Ayçiçekleri"]
        },
        {
            mainWord: "Termometre",
            tabuWords: ["Sıcaklık", "Ateş", "Derece", "Ölçü", "Civa"]
        },
        {
            mainWord: "Barış Manço",
            tabuWords: ["Şarkıcı", "Adam Olacak Çocuk", "Dönence", "Sanatçı", "Anadolu Rock"]
        },
        {
            mainWord: "DNA",
            tabuWords: ["Gen", "Kalıtım", "Kromozom", "Test", "Yapı"]
        },
        {
            mainWord: "Saat Kulesi",
            tabuWords: ["İzmir", "Konak", "Zaman", "Yapı", "Meydan"]
        },
        {
            mainWord: "Atatürk",
            tabuWords: ["Cumhuriyet", "Lider", "Türkiye", "Kurtuluş", "Devrim"]
        },
        {
            mainWord: "İstanbul",
            tabuWords: ["Boğaz", "Şehir", "Galata", "Ayasofya", "Türkiye"]
        },
        {
            mainWord: "Antartika",
            tabuWords: ["Kutup", "Buz", "Penguen", "Kıta", "Soğuk"]
        },
        {
            mainWord: "Kapadokya",
            tabuWords: ["Peri Bacaları", "Nevşehir", "Balon", "Kaya", "Turizm"]
        },
        {
            mainWord: "Pamukkale",
            tabuWords: ["Denizli", "Travertenler", "Beyaz", "Termal", "Hierapolis"]
        },
        {
            mainWord: "Efes",
            tabuWords: ["Antik Kent", "İzmir", "Artemis", "Selçuk", "Kütüphane"]
        },
        {
            mainWord: "Nemrut Dağı",
            tabuWords: ["Adıyaman", "Heykeller", "Kommagene", "Güneş", "Tümülüs"]
        },
        {
            mainWord: "Göbeklitepe",
            tabuWords: ["Şanlıurfa", "Arkeoloji", "Tapınak", "Tarih", "Taş"]
        },
        {
            mainWord: "Mısır",
            tabuWords: ["Piramit", "Firavun", "Nil", "Kahire", "Sfenks"]
        },
        {
            mainWord: "Yunan Mitolojisi",
            tabuWords: ["Zeus", "Tanrı", "Olimpos", "Herkül", "Efsane"]
        },
        {
            mainWord: "Roma İmparatorluğu",
            tabuWords: ["Sezar", "Kolezyum", "İtalya", "Antik", "Gladyatör"]
        },
        {
            mainWord: "Aztek",
            tabuWords: ["Meksika", "Uygarlık", "Maya", "Tapınak", "Amerika"]
        },
        {
            mainWord: "Çin Seddi",
            tabuWords: ["Duvar", "Çin", "Uzun", "Savunma", "İmparator"]
        },
        {
            mainWord: "Selçuklu",
            tabuWords: ["Türk", "Anadolu", "Devlet", "Cami", "Medrese"]
        },
        {
            mainWord: "Safir",
            tabuWords: ["Mavi", "Değerli", "Taş", "Mücevher", "Yüzük"]
        },
        {
            mainWord: "Albert Einstein",
            tabuWords: ["Bilim Adamı", "İzafiyet", "Fizik", "Nobel", "Formül"]
        },
        {
            mainWord: "Galileo",
            tabuWords: ["Astronomi", "Teleskop", "İtalya", "Dünya", "Bilim"]
        },
        {
            mainWord: "Isaac Newton",
            tabuWords: ["Yerçekimi", "Elma", "Fizik", "Bilim", "Kanun"]
        },
        {
            mainWord: "Leonardo da Vinci",
            tabuWords: ["Ressam", "Mona Lisa", "İtalya", "Mucit", "Rönesans"]
        },
        {
            mainWord: "Stephen Hawking",
            tabuWords: ["Fizikçi", "Kara Delik", "Tekerlekli Sandalye", "Evren", "Zaman"]
        },
        
        // Yeni eklenen kelimeler
        {
            mainWord: "Hititler",
            tabuWords: ["Anadolu", "Uygarlık", "Antik", "Hattuşa", "Kral"]
        },
        {
            mainWord: "Truva",
            tabuWords: ["Savaş", "At", "Çanakkale", "Helen", "Troya"]
        },
        {
            mainWord: "Ayasofya",
            tabuWords: ["Cami", "Müze", "Bizans", "Kubbe", "İstanbul"]
        },
        {
            mainWord: "Çanakkale",
            tabuWords: ["Savaş", "Boğaz", "Gelibolu", "Şehit", "Zafer"]
        },
        {
            mainWord: "Bizans",
            tabuWords: ["İmparatorluk", "Konstantinopolis", "Doğu Roma", "İstanbul", "Ortodoks"]
        },
        {
            mainWord: "Fatih Sultan Mehmet",
            tabuWords: ["İstanbul", "Fetih", "Padişah", "1453", "Osmanlı"]
        },
        {
            mainWord: "Yavuz Sultan Selim",
            tabuWords: ["Padişah", "Osmanlı", "Mısır", "Hilafet", "İran"]
        },
        {
            mainWord: "Kanuni Sultan Süleyman",
            tabuWords: ["Padişah", "Muhteşem", "Osmanlı", "Hürrem", "Kanun"]
        },
        {
            mainWord: "Anayasa",
            tabuWords: ["Yasa", "Hukuk", "Meclis", "Madde", "Kanun"]
        },
        {
            mainWord: "Harita",
            tabuWords: ["Yer", "Konum", "Coğrafya", "Ülke", "Atlas"]
        },
        {
            mainWord: "Kıta",
            tabuWords: ["Asya", "Avrupa", "Afrika", "Amerika", "Kara"]
        },
        {
            mainWord: "Asya",
            tabuWords: ["Kıta", "Çin", "Hindistan", "Büyük", "Doğu"]
        },
        {
            mainWord: "Avrupa",
            tabuWords: ["Kıta", "Batı", "Fransa", "Almanya", "Birlik"]
        },
        {
            mainWord: "Afrika",
            tabuWords: ["Kıta", "Sahra", "Piramit", "Safari", "Sıcak"]
        },
        {
            mainWord: "Amerika",
            tabuWords: ["Kıta", "ABD", "Kuzey", "Güney", "Kolomb"]
        },
        {
            mainWord: "Ekvator",
            tabuWords: ["Çizgi", "Dünya", "Orta", "Sıcak", "Derece"]
        },
        {
            mainWord: "Kutup",
            tabuWords: ["Kuzey", "Güney", "Buz", "Soğuk", "Ayı"]
        },
        {
            mainWord: "Okyanus",
            tabuWords: ["Su", "Deniz", "Dalga", "Atlas", "Pasifik"]
        },
        {
            mainWord: "Akdeniz",
            tabuWords: ["Deniz", "Mavi", "Tatil", "Antalya", "Yunanistan"]
        },
        {
            mainWord: "Karadeniz",
            tabuWords: ["Deniz", "Kuzey", "Trabzon", "Fındık", "Balık"]
        },
        {
            mainWord: "Marmara",
            tabuWords: ["Deniz", "İstanbul", "Boğaz", "Küçük", "Adalar"]
        },
        {
            mainWord: "Ege",
            tabuWords: ["Deniz", "İzmir", "Zeytin", "Yunanistan", "Tatil"]
        },
        {
            mainWord: "Van Gölü",
            tabuWords: ["Göl", "Doğu", "Van", "Tatvan", "Sodalı"]
        },
        {
            mainWord: "Ağrı Dağı",
            tabuWords: ["Dağ", "Yüksek", "Nuh", "Gemi", "Doğu"]
        },
        {
            mainWord: "Mezopotamya",
            tabuWords: ["Dicle", "Fırat", "Nehir", "Uygarlık", "Bereketli"]
        },
        {
            mainWord: "Maraton",
            tabuWords: ["Koşu", "Yarış", "42", "Kilometre", "Yunan"]
        },
        {
            mainWord: "Atletizm",
            tabuWords: ["Koşu", "Atlama", "Yarış", "Spor", "Pist"]
        },
        {
            mainWord: "Futbol",
            tabuWords: ["Top", "Maç", "Kaleci", "Gol", "Takım"]
        },
        {
            mainWord: "Basketbol",
            tabuWords: ["Top", "Pota", "Maç", "Sayı", "NBA"]
        },
        {
            mainWord: "Voleybol",
            tabuWords: ["Top", "File", "Maç", "Servis", "Smaç"]
        },
        {
            mainWord: "Tenis",
            tabuWords: ["Raket", "Top", "Kort", "Set", "Servis"]
        },
        {
            mainWord: "Yüzme",
            tabuWords: ["Su", "Havuz", "Sporcu", "Stil", "Yarış"]
        },
        {
            mainWord: "Güreş",
            tabuWords: ["Sporcu", "Mindere", "Yağlı", "Pehilvan", "Minder"]
        },
        {
            mainWord: "Satranç",
            tabuWords: ["Oyun", "Taş", "Şah", "Vezir", "Mat"]
        },
        {
            mainWord: "Kayak",
            tabuWords: ["Kar", "Dağ", "Spor", "Pist", "Kış"]
        },
        {
            mainWord: "Buz Pateni",
            tabuWords: ["Buz", "Paten", "Kış", "Dans", "Spor"]
        },
        {
            mainWord: "Bisiklet",
            tabuWords: ["Pedal", "Tekerlek", "Yarış", "Tur", "Spor"]
        },
        {
            mainWord: "Halter",
            tabuWords: ["Ağırlık", "Kaldırma", "Sporcu", "Kilo", "Olimpiyat"]
        },
        {
            mainWord: "Formula 1",
            tabuWords: ["Yarış", "Araba", "Pist", "Pilot", "Hız"]
        },
        {
            mainWord: "Dünya Kupası",
            tabuWords: ["Futbol", "Turnuva", "Kupa", "Ülke", "Milli"]
        },
        {
            mainWord: "Şampiyonlar Ligi",
            tabuWords: ["Futbol", "Turnuva", "Kupa", "Avrupa", "Final"]
        },
        {
            mainWord: "Tour de France",
            tabuWords: ["Bisiklet", "Yarış", "Fransa", "Sarı", "Tırmanış"]
        },
        {
            mainWord: "NBA",
            tabuWords: ["Basketbol", "Amerika", "Takım", "Lig", "Oyuncu"]
        },
        {
            mainWord: "FIFA",
            tabuWords: ["Futbol", "Federasyon", "Dünya", "Kupası", "Organizasyon"]
        },
        {
            mainWord: "UEFA",
            tabuWords: ["Futbol", "Avrupa", "Federasyon", "Turnuva", "Şampiyona"]
        },
        {
            mainWord: "Wimbledon",
            tabuWords: ["Tenis", "Turnuva", "Londra", "Çim", "Kort"]
        },
        {
            mainWord: "Ekosistem",
            tabuWords: ["Canlı", "Doğa", "Çevre", "Denge", "Yaşam"]
        },
        {
            mainWord: "Atmosfer",
            tabuWords: ["Hava", "Gaz", "Oksijen", "Dünya", "Ozon"]
        },
        {
            mainWord: "Küresel Isınma",
            tabuWords: ["İklim", "Çevre", "Sıcaklık", "Sera", "Dünya"]
        },
        {
            mainWord: "Sera Gazı",
            tabuWords: ["Karbon", "İklim", "Atmosfer", "Isınma", "Emisyon"]
        },
        {
            mainWord: "Deprem",
            tabuWords: ["Yer", "Sarsıntı", "Fay", "Yıkım", "Şiddet"]
        },
        {
            mainWord: "Tsunami",
            tabuWords: ["Dalga", "Deprem", "Deniz", "Felaket", "Yıkım"]
        },
        {
            mainWord: "Hortum",
            tabuWords: ["Rüzgar", "Kasırga", "Fırtına", "Dönen", "Afet"]
        },
        {
            mainWord: "Kasırga",
            tabuWords: ["Fırtına", "Rüzgar", "Tropik", "Yıkım", "Okyanus"]
        },
        {
            mainWord: "Yanardağ",
            tabuWords: ["Volkan", "Lav", "Püskürme", "Dağ", "Magma"]
        },
        {
            mainWord: "Buzul",
            tabuWords: ["Buz", "Erime", "Kutup", "Soğuk", "İklim"]
        },
        {
            mainWord: "Mercan",
            tabuWords: ["Deniz", "Resif", "Canlı", "Koloni", "Renkli"]
        },
        {
            mainWord: "Kutup Ayısı",
            tabuWords: ["Kuzey", "Buz", "Beyaz", "Hayvan", "Soğuk"]
        },
        {
            mainWord: "Penguen",
            tabuWords: ["Kuş", "Kutup", "Buz", "Yüzen", "Siyah"]
        },
        {
            mainWord: "Yunus",
            tabuWords: ["Deniz", "Memeli", "Akıllı", "Gösteri", "Balık"]
        },
        {
            mainWord: "Balina",
            tabuWords: ["Deniz", "Büyük", "Memeli", "Yunus", "Okyanus"]
        },
        {
            mainWord: "Panda",
            tabuWords: ["Çin", "Bamboo", "Siyah", "Beyaz", "Ayı"]
        },
        {
            mainWord: "Jaguar",
            tabuWords: ["Kedi", "Leopar", "Vahşi", "Benekli", "Orman"]
        },
        {
            mainWord: "Leopar",
            tabuWords: ["Kedi", "Benekli", "Afrika", "Vahşi", "Aslan"]
        },
        {
            mainWord: "Ağaç",
            tabuWords: ["Odun", "Orman", "Yaprak", "Kök", "Gövde"]
        },
        {
            mainWord: "Orman",
            tabuWords: ["Ağaç", "Yeşil", "Amazon", "Doğa", "Vahşi"]
        },
        {
            mainWord: "Çöl",
            tabuWords: ["Kum", "Sıcak", "Sahra", "Kurak", "Vaha"]
        },
        {
            mainWord: "Savana",
            tabuWords: ["Afrika", "Otlak", "Aslan", "Zebra", "Ekosistem"]
        },
        {
            mainWord: "Tundra",
            tabuWords: ["Soğuk", "Kutup", "Ekosistem", "Kuzey", "Donmuş"]
        },
        {
            mainWord: "Tropikal",
            tabuWords: ["Sıcak", "Nemli", "Orman", "Ekvatır", "Yağmur"]
        },
        {
            mainWord: "Muson",
            tabuWords: ["Yağmur", "Mevsim", "Asya", "Hindistan", "Rüzgar"]
        },
        {
            mainWord: "Amazon Nehri",
            tabuWords: ["Güney Amerika", "Su", "Orman", "Brezilya", "Nehir"]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const selectedBranch = localStorage.getItem('selectedBranch');
    const selectedDifficulty = localStorage.getItem('difficulty') || 'normal';
    
    if (!selectedBranch) {
        window.location.href = 'index.html';
        return;
    }

    // Son takım isimlerini input alanlarına yerleştir
    const lastTeam1Name = localStorage.getItem('lastTeam1Name');
    const lastTeam2Name = localStorage.getItem('lastTeam2Name');
    if (lastTeam1Name) document.getElementById('team1-name').value = lastTeam1Name;
    if (lastTeam2Name) document.getElementById('team2-name').value = lastTeam2Name;

    // Zorluk seviyesi butonlarına CSS sınıfları ekleyelim
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        if (button.dataset.difficulty === selectedDifficulty) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            difficulty = button.dataset.difficulty;
            localStorage.setItem('difficulty', difficulty);
            timeLeft = difficultySettings[difficulty].time;
            document.getElementById('timer').textContent = timeLeft;
        });
    });

    difficulty = selectedDifficulty;
    timeLeft = difficultySettings[difficulty].time;
    
    document.getElementById('branch-title').textContent = branchNames[selectedBranch];
    questions = allQuestions[selectedBranch];
    
    // Kullanılmamış soruları başlat
    resetUnusedQuestions();
    
    // Takım isimlerini alma
    document.getElementById('team-name-modal').style.display = 'flex';
    document.getElementById('start-game-btn').addEventListener('click', () => {
        team1Name = document.getElementById('team1-name').value || "Takım 1";
        team2Name = document.getElementById('team2-name').value || "Takım 2";
        
        // Takım isimlerini kaydet
        localStorage.setItem('lastTeam1Name', team1Name);
        localStorage.setItem('lastTeam2Name', team2Name);
        
        // İstatistikleri sıfırla
        team1Stats = { correct: 0, wrong: 0, pass: 0 };
        team2Stats = { correct: 0, wrong: 0, pass: 0 };
        
        document.getElementById('team-name-modal').style.display = 'none';
        document.getElementById('score').textContent = `${team1Name}: 0 | ${team2Name}: 0`;
        document.getElementById('current-team').textContent = team1Name;
        gameActive = true;
        showQuestion();
        startTimer();
    });
    
    setupEventListeners();
});

function showQuestion() {
    if (!gameActive) return;
    
    // Eğer kullanılmamış sorular tükenmişse, soruları sıfırla
    if (unusedQuestions.length === 0) {
        resetUnusedQuestions();
    }
    
    // Kullanılmamış sorulardan rastgele bir soru indeksi seç
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    currentQuestionIndex = unusedQuestions[randomIndex];
    
    // Kullanılan soruyu listeden çıkar
    unusedQuestions.splice(randomIndex, 1);
    usedQuestionIndices.push(currentQuestionIndex);
    
    const question = questions[currentQuestionIndex];
    document.getElementById('main-word').textContent = question.mainWord;
    
    const tabuList = document.getElementById('tabu-list');
    tabuList.innerHTML = '';
    question.tabuWords.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        tabuList.appendChild(li);
    });
}

function updateScore(points) {
    currentScore += points;
    if (currentTeam === 1) {
        team1Score += points;
        if (points === 1) team1Stats.correct++;
        else if (points === -1) team1Stats.wrong++;
        else if (points === 0) team1Stats.pass++;
    } else {
        team2Score += points;
        if (points === 1) team2Stats.correct++;
        else if (points === -1) team2Stats.wrong++;
        else if (points === 0) team2Stats.pass++;
    }
    
    // Renkli skor gösterimi
    document.getElementById('score').innerHTML = 
        `<span class="team1-color">${team1Name}: ${team1Score}</span> | ` +
        `<span class="team2-color">${team2Name}: ${team2Score}</span>`;
    
    // Aktif takımı vurgula
    const teamText = currentTeam === 1 ? team1Name : team2Name;
    document.getElementById('current-team').innerHTML = 
        `<span class="current-team team${currentTeam}">${teamText} (${isFirstTurn ? "1. Tur" : "2. Tur"})</span>`;
    
    // Pas hakkını güncelle
    document.getElementById('pass-count').textContent = passCount;
    
    if (points === 0) {
        if (passCount > 0) {
            passCount--;
            document.getElementById('pass-count').textContent = passCount;
            showQuestion(); // Yeni soru göster
        }
        if (passCount === 0) {
            document.getElementById('pass-btn').disabled = true;
        }
    } else {
        showQuestion(); // Yeni soru göster
    }
    saveScore();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0 && gameActive) {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            
            if (timeLeft <= 10) {
                document.querySelector('.timer').classList.add('warning');
                playSound('time-up-sound');
            }
        } else {
            clearInterval(timerInterval);
            if (isFirstTurn) {
                gameActive = false;
                const modal = document.getElementById('team-transition-modal');
                const team1Result = document.getElementById('team1-result');
                const nextTeamName = document.getElementById('next-team-name');
                
                team1Result.textContent = `${team1Name}: ${team1Score} puan`;
                nextTeamName.textContent = team2Name;
                
                document.getElementById('team1-correct').textContent = team1Stats.correct;
                document.getElementById('team1-wrong').textContent = team1Stats.wrong;
                document.getElementById('team1-pass').textContent = team1Stats.pass;
                
                modal.style.display = 'block';
                document.getElementById('start-next-turn').onclick = startNextTurn;
            } else {
                endGame();
            }
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;

    let team1FinalScore = team1Score;
    let team2FinalScore = team2Score;
    let totalScore = team1FinalScore + team2FinalScore;
    
    // HTML içeriğini oluştur
    let finalScoreHTML = `
        <div class="team-stats" style="background: linear-gradient(145deg, rgba(76, 175, 80, 0.6), rgba(76, 175, 80, 0.3));">
            <p>${team1Name}</p>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Doğru</span>
                    <span id="team1-correct" class="stat-value">${team1Stats.correct}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Yanlış</span>
                    <span id="team1-wrong" class="stat-value">${team1Stats.wrong}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Pas</span>
                    <span id="team1-pass" class="stat-value">${team1Stats.pass}</span>
                </div>
                <div class="stat-item" style="grid-column: span 3;">
                    <span class="stat-label">Toplam Puan</span>
                    <span class="stat-value" style="color: #4CAF50;">${team1FinalScore}</span>
                </div>
            </div>
        </div>
        <div class="team-stats" style="background: linear-gradient(145deg, rgba(33, 150, 243, 0.6), rgba(33, 150, 243, 0.3));">
            <p>${team2Name}</p>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Doğru</span>
                    <span id="team2-correct" class="stat-value">${team2Stats.correct}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Yanlış</span>
                    <span id="team2-wrong" class="stat-value">${team2Stats.wrong}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Pas</span>
                    <span id="team2-pass" class="stat-value">${team2Stats.pass}</span>
                </div>
                <div class="stat-item" style="grid-column: span 3;">
                    <span class="stat-label">Toplam Puan</span>
                    <span class="stat-value" style="color: #2196F3;">${team2FinalScore}</span>
                </div>
            </div>
        </div>
        <div class="team-stats" style="background: linear-gradient(145deg, rgba(156, 39, 176, 0.6), rgba(156, 39, 176, 0.3));">
            <p>Genel Sonuç</p>
            <div class="stats-grid">
                <div class="stat-item" style="grid-column: span 3;">
                    <span class="stat-label">Toplam Puan</span>
                    <span class="stat-value" style="color: #9C27B0;">${totalScore}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Kazanan</span>
                    <span class="stat-value" style="color: ${team1FinalScore > team2FinalScore ? '#4CAF50' : (team1FinalScore < team2FinalScore ? '#2196F3' : '#FFC107')};">
                        ${team1FinalScore > team2FinalScore ? team1Name : (team1FinalScore < team2FinalScore ? team2Name : 'Berabere')}
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Zorluk</span>
                    <span class="stat-value" style="color: ${currentDifficulty === 'easy' ? '#4CAF50' : (currentDifficulty === 'normal' ? '#2196F3' : '#F44336')};">
                        ${currentDifficulty === 'easy' ? 'Kolay' : (currentDifficulty === 'normal' ? 'Normal' : 'Zor')}
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Branş</span>
                    <span class="stat-value">${branchNames[currentBranch]}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('final-score').innerHTML = finalScoreHTML;
    document.getElementById('final-score-value').textContent = totalScore;
    
    saveScore(totalScore);
    showHighScores();
    
    document.getElementById('score-modal').style.display = 'flex';
}

function saveScore(score) {
    let date = new Date();
    let scoreDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    
    // Yüksek puan kaydetme
    let highScores = JSON.parse(localStorage.getItem('tabuHighScores') || '[]');
    
    highScores.push({
        score: score,
        team1: {
            name: team1Name,
            score: team1Score,
            stats: team1Stats
        },
        team2: {
            name: team2Name,
            score: team2Score,
            stats: team2Stats
        },
        branch: branchNames[currentBranch],
        difficulty: currentDifficulty,
        date: scoreDate
    });
    
    // Puana göre sırala (yüksekten düşüğe)
    highScores.sort((a, b) => b.score - a.score);
    
    // Maksimum 10 skoru sakla
    if (highScores.length > 10) {
        highScores = highScores.slice(0, 10);
    }
    
    localStorage.setItem('tabuHighScores', JSON.stringify(highScores));
    
    // Oyun geçmişi kaydetme
    let gameHistory = JSON.parse(localStorage.getItem('tabuGameHistory') || '[]');
    
    gameHistory.unshift({
        score: score,
        team1: {
            name: team1Name,
            score: team1Score,
            stats: team1Stats
        },
        team2: {
            name: team2Name,
            score: team2Score,
            stats: team2Stats
        },
        branch: branchNames[currentBranch],
        difficulty: currentDifficulty,
        date: scoreDate
    });
    
    // Maksimum 10 oyun geçmişi sakla
    if (gameHistory.length > 10) {
        gameHistory = gameHistory.slice(0, 10);
    }
    
    localStorage.setItem('tabuGameHistory', JSON.stringify(gameHistory));
}

function showHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    const gameHistoryList = document.getElementById('game-history-list');
    
    // Yüksek skorları göster
    let highScores = JSON.parse(localStorage.getItem('tabuHighScores') || '[]');
    
    highScoresList.innerHTML = '';
    
    if (highScores.length === 0) {
        highScoresList.innerHTML = '<li>Henüz yüksek puan yok!</li>';
    } else {
        highScores.forEach((item, index) => {
            let difficultyClass = item.difficulty === 'easy' ? 'easy' : (item.difficulty === 'normal' ? 'normal' : 'hard');
            let difficultyText = item.difficulty === 'easy' ? 'Kolay' : (item.difficulty === 'normal' ? 'Normal' : 'Zor');
            
            highScoresList.innerHTML += `
                <li>
                    <strong>${index + 1}.</strong> ${item.score} puan - 
                    ${item.team1.name}: ${item.team1.score}, 
                    ${item.team2.name}: ${item.team2.score} | 
                    <span class="${difficultyClass}">${difficultyText}</span> - 
                    ${item.branch} - 
                    ${item.date}
                </li>
            `;
        });
    }
    
    // Oyun geçmişini göster
    let gameHistory = JSON.parse(localStorage.getItem('tabuGameHistory') || '[]');
    
    gameHistoryList.innerHTML = '';
    
    if (gameHistory.length === 0) {
        gameHistoryList.innerHTML = '<li>Henüz oyun geçmişi yok!</li>';
    } else {
        gameHistory.forEach((item) => {
            let difficultyClass = item.difficulty === 'easy' ? 'easy' : (item.difficulty === 'normal' ? 'normal' : 'hard');
            let difficultyText = item.difficulty === 'easy' ? 'Kolay' : (item.difficulty === 'normal' ? 'Normal' : 'Zor');
            let winner = item.team1.score > item.team2.score ? item.team1.name : (item.team1.score < item.team2.score ? item.team2.name : 'Berabere');
            
            gameHistoryList.innerHTML += `
                <li>
                    <strong>${winner}</strong> - ${item.score} puan | 
                    <span class="${difficultyClass}">${difficultyText}</span> - 
                    ${item.branch} - 
                    ${item.date}
                </li>
            `;
        });
    }
    
    // Ayrı bir skor görüntüleme modalı için de aynı verileri hazırla
    if (document.getElementById('high-scores-list-view')) {
        const highScoresListView = document.getElementById('high-scores-list-view');
        const gameHistoryListView = document.getElementById('game-history-list-view');
        
        highScoresListView.innerHTML = highScoresList.innerHTML;
        gameHistoryListView.innerHTML = gameHistoryList.innerHTML;
    }
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => console.log('Ses çalınamadı:', error));
    }
}

function setupEventListeners() {
    document.getElementById('correct-btn').addEventListener('click', () => {
        if (!gameActive) return;
        updateScore(1);
        playSound('correct');
    });

    document.getElementById('pass-btn').addEventListener('click', () => {
        if (!gameActive) return;
        if (passCount === 0) {
            playSound('wrong');
            return;
        }
        updateScore(0);
        playSound('pass');
    });

    document.getElementById('tabu-btn').addEventListener('click', () => {
        if (!gameActive) return;
        updateScore(-1);
        playSound('wrong');
        currentQuestionIndex++;
        showQuestion();
    });

    document.getElementById('play-again').addEventListener('click', () => {
        window.location.reload();
    });

    document.getElementById('main-menu').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Skor modalı kapama butonu
    if (document.getElementById('close-scores-btn')) {
        document.getElementById('close-scores-btn').addEventListener('click', function() {
            document.getElementById('scores-modal').style.display = 'none';
        });
    }
    
    // Header'daki skor linki
    if (document.querySelector('.header-scores')) {
        document.querySelector('.header-scores').addEventListener('click', function(e) {
            e.preventDefault();
            showHighScores(); // Skorları güncelle
            document.getElementById('scores-modal').style.display = 'flex';
        });
    }
}

function startGame() {
    // ... existing code ...
    timeLeft = difficultySettings[difficulty].time;
    document.getElementById('timer').textContent = timeLeft;
    gameActive = true;
    startTimer();
    // ... existing code ...
}

function startNextTurn() {
    const modal = document.getElementById('team-transition-modal');
    modal.style.display = 'none';
    isFirstTurn = false;
    currentTeam = 2;
    timeLeft = difficultySettings[difficulty].time;
    document.getElementById('timer').textContent = timeLeft;
    passCount = 3;
    document.getElementById('pass-count').textContent = passCount;
    document.getElementById('pass-btn').disabled = false;
    document.getElementById('current-team').innerHTML = 
        `<span class="current-team team2">${team2Name}</span>`;
    document.querySelector('.timer').classList.remove('warning');
    
    // 2. tur için soruları sıfırla
    resetUnusedQuestions();
    
    gameActive = true;
    showQuestion();
    startTimer();
}

// Yeni fonksiyon: Kullanılmamış soruları sıfırlar
function resetUnusedQuestions() {
    unusedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
        unusedQuestions.push(i);
    }
    // Eğer önceki turdan kullanılmış sorular varsa, onları çıkar
    if (isFirstTurn === false && usedQuestionIndices.length > 0) {
        // Son 10 soruyu tekrar gösterme (veya daha az soru kullanılmışsa tümünü)
        const lastUsedCount = Math.min(10, usedQuestionIndices.length);
        const recentlyUsed = usedQuestionIndices.slice(-lastUsedCount);
        
        unusedQuestions = unusedQuestions.filter(idx => !recentlyUsed.includes(idx));
    }
    
    // Soruları karıştır
    for (let i = unusedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unusedQuestions[i], unusedQuestions[j]] = [unusedQuestions[j], unusedQuestions[i]];
    }
} 
