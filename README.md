![Grafana Ekran Görüntüsü](https://github.com/ynsemrearslan/Grafana-Kafka-Influxdb-Node.js/blob/main/grafana.jpg?raw=true)

#  Apache Kafka Grafana Node.js Ifluxdb

Kartaca Çekirdekten Yetişenler Programı Uygulama ve Servis Geliştirme Bölümü uygulama görevi.

## Kurulum

```sh
docker-compose up --build
```
### Apache Kafka

 Apache bünyesinde bulunan, büyük verileri anlık olarak depolamak ve analiz etmek için kullanılan açık kaynak bir framework’dür. Büyük verileri hızlı bir şekilde depolayıp analiz etmek için ise mesajlaşma sistemini (queue) kullanmaktadır.
 Producer'da oluşturulan veriler Kafka kuyruğuna eklenir ve Consumer tarafından kuyruktan alınır ve Influxdb veritabanına yazılır.

### Grafana

 Grafana en popüler Dashboard oluşturma uygulamalarından biri. Data Source olarak birçok farklı Database türünü destekliyor. Kafka ile ve InfluxDB üzerine aktardığımız verilerimizi Grafana ile oluşturduğumuz Dashboard lar üzerinde görüntüleyeceğiz.

### Node.js

#### Producer-api
Node.js ile kafka.js bağımlılığı kullanılarak bir producer-api servisi oluşturulmuştur.Bu servis faker kütüphanesini kullanarak veriler üzetmekte ve bu verileri Kafka kuyruğuna eklemektedir. Bu api 4000 portu üzerinden erişilmekte ve _/run_ ile producer işlemleri başlatılmaktadır.

#### Consumer-api
Node.js ile kafka.js bağımlılığı kullanılarak bir consumer-api servisi oluşturulmuştur.Bu servis Kafka kuyruğundan verileri okumaktadır ve influxdb-client-js eklentisi kullanılarak okunan verinin Influxdb üzerine yazılması sağlanmaktadır. Bu api 4001 portu üzerinden erişilmekte ve _/listen_ ile producer işlemleri başlatılmaktadır.

### Influxdb

 InfluxData firması tarafından yine GO programlama dili yazılmış ve genellikle IOT cihazlar tarafından toplanan veriler, performans ve analiz verilerini saklamak için kullanılan bir Database. Apache consumer verileri  InfluxDB üzerine yazacağız.

### dotronglong/faker:stable

Influxdb yazılan verilerin fake api üzerinden /logs olarak GET edilmesi sağlanmıştır.
