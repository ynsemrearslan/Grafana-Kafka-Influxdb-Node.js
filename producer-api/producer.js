const{Kafka} =require("kafkajs");
const faker=require("faker");
const express=require("express");


const topic_name="kartaca";


var statusCodeList=["100","200","201","302","400","401","402","403","404","500"];

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
    res.send(200,{
        message:"Api çalışıyor.. İstek atmak için /run"
      })
   
  })

app.get('/run',(req,res)=>{
    res.send(200,{
        message:"Yükleme başladı"
      })
    Run();
  })
  app.listen(PORT, async () => console.log(`Example app listening on port ${PORT}`));

 async function Run(){
    for (i = 0; i < 2000; i++) {
        createProducer();
      }
}

 function fakerCreate(){

    var type= new Date() % 2 ? "system":"app";
    var ip_address=faker.internet.ip();
    var protocol=faker.internet.protocol();
    var httpMethod=faker.internet.httpMethod();
    var userAgent=faker.internet.userAgent();
    var statusCode=statusCodeList[new Date % 10]
    let value={"type":type,"ip_address":ip_address,"protocol":protocol,"http_method":httpMethod,"user_agent":userAgent,"statusCode":statusCode};
    return value;
}


async function createProducer(){
    try{
        const kafka=new Kafka({
            clientId:"kartaca",
            brokers:["kafka:9092"]
        });

        const producer=kafka.producer();
    

        await producer.connect();

        console.log("Baglantı başarılı ...");

        
        
        const message_result=await producer.send({
            topic: topic_name,
            messages: [
                {

                    value: JSON.stringify(fakerCreate()),
                    partition: 0
                }
            ]
        });
        
        console.log("Gorderme işlemi başarılıdır .. ",JSON.stringify(message_result));
        await producer.disconnect();

    }catch(err){
        console.log(err);
    }finally{
        process.exit(0);
    }
}