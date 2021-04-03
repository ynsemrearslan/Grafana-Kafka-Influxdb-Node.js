const {Kafka}=require("kafkajs");
const express=require("express");
const {InfluxDB, Point, HttpError} = require('@influxdata/influxdb-client')
const {url, token, org, bucket} = require('./env')
const {hostname} = require('os')


const app=express();
const PORT = process.env.PORT || 4001;

app.get("/",(req,res)=>{
    res.send(200,{
        message: "Api çalışıyor.. Consumer'ı başlatmak için /listen"
    })
})

app.get("/listen",(req,res)=>{
    res.send(200,{
        message: " Consumer başladı."
    })
    createConsumer();
})

app.listen(PORT, async () => console.log(`Example app listening on port ${PORT}`));

const topic_name="kartaca";

async function createConsumer(){
    try{
        const kafka=new Kafka({
            clientId:"kartaca",
            brokers:["kafka:9092"],
        });
        const consumer=kafka.consumer({
            groupId: "kartaca_metrics_consumers"
        });
        console.log("Consumer'a baglaniliyor..");
        await consumer.connect();
        console.log("Bağlantiı başarılı ..");

        await consumer.subscribe({
            topic:topic_name,
            fromBeginning:true,

        });
        await consumer.run({
            eachMessage: async result=>{

                const writeApi = new InfluxDB({url, token}).getWriteApi(org, bucket, 'ns')

                let value = JSON.parse(result.message.value);
                  console.log(value.ip_address)
                
                writeApi.useDefaultTags({location:hostname()})
                const point2 = new Point('logs')
                .tag('type',`${value.type}`)
                .tag('protocol',`${value.protocol}`)
                .tag('Http_Method',`${value.http_method}`)
                .tag('UserAgent',value.user_agent)
                .stringField('type',`${value.type}`)
                .floatField('StatusCode', `${value.statusCode}`)
                .stringField('protocol',`${value.protocol}`)
                .stringField('Http_Method',`${value.http_method}`)
                .stringField('UserAgent',`${value.user_agent}`)
                .timestamp(new Date())
                writeApi.writePoint(point2)
                console.log(` ${point2.toLineProtocol(writeApi)}`)
                writeApi
                .close()
                .then(() => {
                    console.log('FINISHED')
                })
                
            }
        });
    }catch(err){
        
        if (e instanceof HttpError && e.statusCode === 401) {
            console.log('" unauthorized " yetkilendirme reddedildi..')
          }
          console.log(err)
    }
}