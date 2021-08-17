const mysql = require('mysql');
const service = require('./service/check-permission.service');
const selinum_servicve = require('./service/selinum.service');
const cron = require('node-cron');
const db = mysql.createConnection({
    host     :  process.env.database_host,
    port:       process.env.database_port,
    user     : process.env.database_user,
    password :  process.env.password,
    database : process.env.database, 
  });

const connect_database = async()=> 
{
    return new Promise(async(resolve, reject)=>{
        db.connect((err) =>{
            if(err){
                console.log("err", err);
                reject(err);
            }  
            resolve(true);
        });
        
    })
    
}

const acc = async()=>{
    const data = await selinum_servicve.GetIndiegogo_acc(db);
    process.env.indiegogo_username = data.iggAcount1.email;
    process.env.indiegogo_password = data.iggAcount1.password;
    process.env.homePageUrl = data.homePageUrl
    
}

const scriptStart = async()=>{
    let isRunning = false;
    cron.schedule('* * * * * *', async() => 
    {   
        if(isRunning === false)
        {      
            try
            {   
                const query ="SELECT * FROM `campaign` WHERE `ca_permisson` = 10 ORDER BY ca_updated_at LIMIT 2";
                db.query(query, async(err, result, fields) =>{
                    if(err)
                    {
                        console.log("err", err)
                    }
                    else
                    {            
                        if(result.length > 0)
                        {
                          
                            isRunning = true
                            const data = await service.checkPermisson(result, db);  
                            isRunning = false;
                          

                        }
                       
                    }
                })
            
            }
            catch (error) 
            {
                isRunning = false;
                console.log("error", error);
            }
        
        }
    });   
}


connect_database();
acc()
scriptStart();



