# Tabu Okulu - Ürün Gereksinimleri Dokümanı

## Genel Bakış
Tabu Okulu, ortaokul müfredatına uygun, web tabanlı ve responsive bir eğitsel oyundur. Öğrenciler çeşitli branşlardan sorular çözerek hem eğlenecek hem de bilgilerini test edeceklerdir.

## Kullanılacak Teknolojiler
- Frontend: HTML5, CSS3, JavaScript
- Veri Yönetimi: JSON dosyaları
- Deployment: GitHub Pages

## Özellikler

### Ana Özellikler
- Branş seçim ekranı
- Soru kartları gösterimi
- Puan sistemi: Doğru (1 puan), Tabu (-1 puan), Pas (0 puan)
- Responsive tasarım (mobil, tablet ve masaüstü uyumlu)
- Zorluk seviyeleri (Kolay, Normal, Zor)
- Ses efektleri
- Yüksek skor tablosu
- Oyun geçmişi
- Her branş için özel arka plan ve renkler
- Modern UI/UX tasarımı
- PWA desteği

### Branşlar
- Fen Bilimleri
- Sosyal Bilgiler
- Din Kültürü
- Matematik
- Türkçe
- Görsel Sanatlar
- Müzik
- İngilizce

## Yapılacaklar Listesi

### Tamamlananlar
- [x] Proje gereksinimlerinin belirlenmesi
- [x] PRD dokümanının oluşturulması
- [x] Proje yapısının oluşturulması
- [x] Ana sayfa tasarımı ve branş seçim ekranı
- [x] Oyun sayfası tasarımı
- [x] Puan sisteminin implementasyonu
- [x] Responsive tasarım ayarlamaları
- [x] Branşlara göre soru verilerinin oluşturulması
- [x] Zorluk seviyelerinin eklenmesi
- [x] Ses efektlerinin eklenmesi
- [x] Yüksek skor tablosunun eklenmesi
- [x] Oyun geçmişinin eklenmesi
- [x] Her branş için özel arka plan ve renkler
- [x] Modern UI/UX tasarımı
- [x] PWA desteği
- [x] İngilizce branşının eklenmesi
- [x] Süre ve puan göstergelerinin sağ üste taşınması

### Yapılacaklar
- [ ] Çok oyunculu mod
- [ ] İstatistik sayfası
- [ ] Tema seçenekleri
- [ ] Mobil uygulama
- [ ] Yapay zeka destekli soru önerileri
- [ ] Testler ve hata düzeltmeleri
- [ ] Deployment

## UI/UX Açıklamaları
- Ana Sayfa: Oyun başlığı, logo, zorluk seviyesi seçimi ve branş seçenekleri
- Oyun Sayfası: Soru kartı, sağ üstte puan ve süre göstergesi, cevap butonları (Doğru, Pas, Tabu)
- Sonuç Sayfası: Toplam puan, doğru/yanlış/pas istatistikleri, yüksek skor tablosu, oyun geçmişi, ana sayfaya dönüş butonu

## Veri Yapısı
Sorular JSON formatında olacak ve her soru şu bilgileri içerecek:
- Soru metni
- Tabu kelimeler (kullanılmaması gereken kelimeler)
- Branş bilgisi
- Zorluk seviyesi 