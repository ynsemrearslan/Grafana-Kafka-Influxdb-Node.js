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
 
 - Email or username: admin
 - Password         : admin

### Node.js

#### Producer-api
Node.js ile [kafka.js](https://github.com/tulios/kafkajs) bağımlılığı kullanılarak bir producer-api servisi oluşturulmuştur.Bu servis [faker](https://www.npmjs.com/package/faker) kütüphanesini kullanarak veriler üzetmekte ve bu verileri Kafka kuyruğuna eklemektedir. Bu api 4000 portu üzerinden erişilmekte ve _/run_ ile producer işlemleri başlatılmaktadır.

#### Consumer-api
Node.js ile [kafka.js](https://github.com/tulios/kafkajs) bağımlılığı kullanılarak bir consumer-api servisi oluşturulmuştur.Bu servis Kafka kuyruğundan verileri okumaktadır ve [influxdb-client-js](https://github.com/influxdata/influxdb-client-js) eklentisi kullanılarak okunan verinin [Influxdb](https://www.influxdata.com/) üzerine yazılması sağlanmaktadır. Bu api 4001 portu üzerinden erişilmekte ve _/listen_ ile consumer işlemleri başlatılmaktadır.

### Influxdb

 InfluxData firması tarafından yine GO programlama dili yazılmış ve genellikle IOT cihazlar tarafından toplanan veriler, performans ve analiz verilerini saklamak için kullanılan bir Database. Apache consumer ile okunan veriler InfluxDB üzerine yazacağız.
 
 - database :logsdata
 - username :root
 - password :

### [dotronglong/faker:stable](https://hub.docker.com/r/dotronglong/faker)

Influxdb yazılan verilerin fake api üzerinden /logs olarak GET edilmesi sağlanmıştır.
