const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const selinum = require('./selinum.service')
const campaign_service = require('./campaign.service');


function checkPermisson(campaign, db){
  return new Promise(
        async(resolve, reject)=>{
            try
            {   
                const driver = await selinum.init();
                global.chrome_driver =driver;        
                await driver.get(process.env.homePageUrl);
                const login = await selinum.login(driver, until, By);
                //login success
                if(login)
                {   
                    for(let i =0 ; i < campaign.length ; i++)
                    {  
                        if(campaign[i].ca_permisson === 10)
                        {
                            let permission_granted = true;
                            //click my campaign
                            const mycampaign = await selinum.listMyCampaign(driver, until, By);
                            if(mycampaign)
                            {
                                //click detail campaign
                                const detailCampaign = await selinum.detailCampaign(campaign[i].ca_title, driver, until, By )
                                if(detailCampaign){
                                    //click edit campaign
                                    const detailCampaign = await selinum.editCampaign(driver, until, By);
                                    if(detailCampaign)
                                    {
                                        permission_granted = true;
                                    }
                                    else
                                    {
                                        permission_granted = false;
                                    }
                                    
                                }
                                else
                                {
                                    // cant not find any campaign
                                    permission_granted = false;
                                }    
                            }
                            if(permission_granted)
                            {   //update db
                                campaign[i].ca_permisson = 0;
                                delete campaign[i].ca_created_at;
                                delete campaign[i].ca_updated_at;
                                await campaign_service.Update_Campaign(campaign[i], db)    
                               
                                
                            }
                            else
                            {   //update db
                               
                                campaign[i].ca_permisson = 20;
                                delete campaign[i].ca_created_at;
                                delete campaign[i].ca_updated_at;
                                await campaign_service.Update_Campaign(campaign[i], db)     
                               
                               
                            }
                        }
                    }

                    driver.quit();
                    resolve(true);
                  
                }
                //login fail
                else
                {
                    resolve(false);
                }
            
            } 
            catch (error) {
                resolve(false);
            }

        })
}

module.exports={checkPermisson}


