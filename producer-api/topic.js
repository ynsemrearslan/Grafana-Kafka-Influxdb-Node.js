const {Kafka} =require("kafkajs");

createTopic();

async function createTopic(){
    try{

        const kafka=new Kafka({
            clientId:"kartaca",
            brokers:["127.0.0.1:9092"]
        });
        const admin =kafka.admin();
        console.log("Kafka brekera bağlanmaya çalışılıyor..");
        await admin.connect();
        console.log("Baglanti başarılı ,Topic üretilecek ...");
        await admin.createTopics({
            topics:[
                {
                    topic:"kartaca",
                    numPartitions:1
                }
            ]
        });
        console.log("Topic oluşturuldu ..");
        await admin.disconnect();


    }catch(err){
        console.log("Bir hata oluştu ",err);
        
    }finally{
        process.exit(0);
    }
}