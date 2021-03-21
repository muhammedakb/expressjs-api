|| Express.js ile "backend api(REST API)" ||<br>
|| MVC modeline uygun, katmanlı ||<br>
|| Katmanlar = Yardımcı Fonksiyonlar(helpers), Ara yazılımlar(middlewares),Yönlendirmeler(routes), Kontroller(controllers), Models ||

- dotenv paketi ile ortam değişkenleri
- Mongoose ile MongoDB bağlantısı yapıldı
- Router yapılandırması
- Kullanıcıların bilgileri için gerekli "title" alanları oluşturuldu(name,age...)
- Middleware'ler yazıldı(authorization ve hata yakalamak için)
- JWT(JsonWebToken) kullanımı
- Post Request ile kullanıcı ekleme
- bcrypt.js ile şifreleri hash(decod)'li bir şekilde veritabanına kaydettik
- Oturum doğrulama(authentication) ve yetkilendirme(authorization)
- Kullanıcı girişi, giriş yapan kullanıcının bilgileri
- Kullanıcı çıkışı yapma
- Profil fotoğrafı yüklemek için statik dosya konfigurasyonu
- Multer(npm) paketi ile fotoğraf yüklenmesi
- Fotoğrafın veritabanında güncellenmesi
- Şifremi unuttum için 1 saatlik token oluşturulması

TODO: NodeMailer ile şifre sıfırlaması<br>
TODO: Antrenörün bir kullanıcıyı engellemesi(blocked)<br>
TODO: Antrenörün bir kullanıcıyı silmesi ve bilgilerinin güncellenemesi<br>
