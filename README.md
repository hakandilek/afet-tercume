# Afet Terimleri

Sahada görevli gönüllü çevirmenlerle deprem bölgesinde farklı dilleri konuşanların iletişimini kolaylaştırmak için gelistirilmis bir afet tercume uygulamasidir.

[Google Sheets uzerinde olusturulan tercume listesini](https://docs.google.com/spreadsheets/d/1LfFJZxpbCbz2lRpKQ0_kTMKNJVDJ9FyrlAoP15TU8wU/edit#gid=1793478180) mobil cihazlarda goruntulemeyi amaclamaktadir.

## Gelistirici bilgileri

[Gelistirici dokumantasyonu wiki](https://github.com/hakandilek/afet-tercume/wiki) uzerindedir.

## Sheet DB API Kullanimi
Dokumantasyon: https://docs.sheetdb.io/quickstart

### Gelistirme Ortami

json-server kutuphanesi tarafindan sunulan, gelen istekleri dosyaya yazan bir mock backend,
mock backend'i ayaga kaldirma:
`npm run start:mock-api`
post isteklerinin kaydedildigi dosyanin yolu:
`data/db.json`

Service Worker uzerinde gelistirmesi yaparken, service worker dosyalarinin browsera register/unregister olmasi zaman aldigindan, 
codeda yapilan bir degisiklik sonucu page reload sirasinda browser uzun suren bir reload dongusune girmekte.
Bunu engellemek icin gelistirme
`npm run start:no-reload`
komutu ile yapilabilir. Bu durumda her degisiklikten sonra sayfanin manual olarak refresh edilmesi gerekmekte.

### Production Ortami:
spreadsheet: https://docs.google.com/spreadsheets/d/1UMdL95PcB_dNobDVwOfy2qGyovvLQGas7jhi_rZyp7o/edit#gid=0
API Url: https://sheetdb.io/api/v1/acqlv7ioe65kk
