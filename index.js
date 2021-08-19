const mysql = require('mysql');
const service = require('./service/check-permission.service');
const selinum_servicve = require('./service/selinum.service');
const campaign_service = require('./service/campaign.service');
const cron = require('node-cron');
const db = mysql.createConnection({
    host: process.env.database_host,
    port: process.env.database_port,
    user: process.env.database_user,
    password: process.env.password,
    database: process.env.database,
});

const connect_database = async () => {
    return new Promise(async (resolve, reject) => {
        db.connect((err) => {
            if (err) {
                console.log("err", err);
                reject(err);
            }
            resolve(true);
        });

    })

}

const acc = async () => {
    const data = await selinum_servicve.GetIndiegogo_acc(db);
    process.env.indiegogo_username = data.iggAcount1.email;
    process.env.indiegogo_password = data.iggAcount1.password;
    process.env.homePageUrl = data.homePageUrl

}

const scriptStart = async () => {
    let isRunning = false;
    cron.schedule('* * * * *', async () => {
        if (isRunning === false) {
            try {
                isRunning = true;
                const campaigns = await campaign_service.Get_Campaign(db);
                if (campaigns.length > 0) {
                    const data = await service.checkPermisson(campaigns, db);
                    
                };
            }
            catch (error) {
                console.log("error", error);
            };
            isRunning = false;
        }
    });
}


connect_database();
acc()
scriptStart();



