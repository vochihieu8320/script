const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const selinum = require('./selinum.service')

function checkPermisson(campaign_title){
  return new Promise(
        async(resolve, reject)=>{
            let chrome_options = new chrome.Options().
            addArguments(
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--window-size=1920,1080',
            'maxSession=1'
            // 'headless'
            )
            let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chrome_options)
            .build();   

            try
            {
                await driver.get('https://www.indiegogo.com');
                const window = await driver.getWindowHandle();
                console.log("window", window);
                const login = await selinum.login(driver, until, By);
                //login success
                if(login){
                    const listMycampaign = await selinum.listMyCampaign(driver, until, By);
                    //view list campaign success
                    if(listMycampaign){
                        
                        const detailCampaign = await selinum.detailCampaign(campaign_title, driver, until, By);
                        //if we cant click detail campaign
                        if(detailCampaign !== false){
                            const editCampaign = await selinum.editCampaign(driver, until, By);
                            resolve(editCampaign);
                        }
                        else
                        {
                            resolve(false);
                        }
                    }
                    else
                    {
                        resolve(false);
                    }
                }
                //login fail
                else
                {
                    resolve(false);
                }
            
            } 
            catch (error) {
                reject(false);
            }

        })
}

module.exports={checkPermisson}


