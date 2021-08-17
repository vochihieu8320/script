const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function init() {
  return new Promise(async (resolve, reject)=>{
    try
    {
      let chrome_options = new chrome.Options().
      addArguments(
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--window-size=1920,1080',
      'maxSession=1',
      'headless'
      )
      let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chrome_options)
      .build();
      resolve(driver);     
    } 
    catch (error) 
    {
      reject(error)
    }
   
  })
  
}





function acceptCookie(){
  return new Promise(async(resolve, reject)=>{
    try 
    {
      const accept_cookie = await driver.findElement(By.id('CybotCookiebotDialogBodyButtonAccept'));
      if(acceptCookie){
        await accept_cookie.click();
        resolve(true)
      }
   
    } 
    catch (error) 
    {
      console.log("error", error)
      reject(error)
    }
    
  })
}

function GetIndiegogo_acc(db)
{
  return new Promise((resolve, reject)=>{
      const query = "SELECT * FROM `setting` WHERE `se_key` = 'IGG_SETTING'";
      db.query(query,(err, result, fields)=>{
          if(err)
          {
              console.log("err", err);
              reject(err);
          }
          else
          {
              const value = JSON.parse(result[0].se_value);
              resolve(value);
          }
      })
  })
  
}


function login(driver, until, By){
  return new Promise(async(resolve, reject)=>{
    try 
    {
      //click login button
      const login = await driver.wait(until.elementLocated(By.css('a.layoutHeader-logIn')));
      await login.click()
      //fill email password  
      const emailElement = await driver.wait(until.elementLocated(By.css('#email')));
      const passwordElement = await driver.wait(until.elementLocated(By.css('#password')));
      const btnSumit = await driver.wait(until.elementLocated(By.css('div.modalUserAuth-logIn-submitButton > button.buttonPrimary')));     
      await emailElement.sendKeys(process.env.indiegogo_username);
      await passwordElement.sendKeys(process.env.indiegogo_password);
  
      // await emailElement.sendKeys('chihieu.vo@hiq.ai');
      // await passwordElement.sendKeys('0909400743');
      
      //accepted cookie, if we dont accept cookie we cant click button login
      try {
        const accept_cookie = await driver.wait(until.elementLocated(By.id('CybotCookiebotDialogBodyButtonAccept')));
        if(acceptCookie){
          await accept_cookie.click();
        }  
      } catch (error) {
        
      }
      
      await btnSumit.click();
      const cookies = await driver.manage().getCookies();
      //check login success or not
      
      if(cookies){
        resolve(true);
      }
      else
      {
        resolve(false);
      }
    } 
    catch (error) 
    {
      console.log("error", error)
      resolve(false);
    }
    
  })
}



function listMyCampaign(driver, until, By){
  return new Promise(async(resolve, reject)=>{
    try 
    {
      const campagin_selected ="//a[@class='columns align-middle is-gapless']";    
      const my_campaign = await driver.wait(until.elementLocated(By.xpath(campagin_selected)));
      await my_campaign.click();
      const campaign_text = "//a[@href='/individuals/18877647/campaigns']"
      // const campaign_text = "//a[@href='/individuals/27166957/campaigns']"
      const click_campaign = await driver.wait(until.elementLocated(By.xpath(campaign_text)));
      if(click_campaign)
      {
        await click_campaign.click();
        resolve(true)
      }
      else
      {
        resolve(false);
      }
    } 
    catch (error)
     {
      console.log("error", error)
      resolve(false);
    }
  })

}


function detailCampaign(campaign_title, driver, until, By){
  return new Promise(async(resolve, reject)=>{
    const option = `//a[text()="${campaign_title}"]`;
    try {
      const click_option = await driver.wait(until.elementLocated(By.xpath(option))); 
      if(click_option){
        click_option.click();
        resolve(click_option)
      }
      else{
        resolve(false)
      }
    } catch (error) {
      console.log("error", error)
      resolve(false)
    }
  })
 
}


function editCampaign(driver, until, By){
   return new Promise(async(resolve, reject)=>{
      try
       {
        try {
          const accept_cookie = await driver.findElement(By.id('CybotCookiebotDialogBodyButtonAccept'));
          if(acceptCookie){
            accept_cookie.click();
          }
        }
         catch (error) 
         {
          
        }
        const edit = "//span[text()='Campaign Editor']";
        let click_edit
        try {
            click_edit = await driver.findElement(By.xpath(edit));  
        } catch (error) {
          resolve(false);
        }
        
        if(click_edit)
        {
            try {
              const accept_cookie = await driver.findElement(By.id('CybotCookiebotDialogBodyButtonAccept'));
              if(acceptCookie){
                accept_cookie.click();
              }
            }
             catch (error) 
             {
              
              }
           
            await click_edit.click();
            const perk = "//span[text()='3. ']"
            //click perk
            const click_perk = await driver.wait(until.elementLocated(By.xpath(perk))); 
            await click_perk.click();

            //check can click perk
            let check_perk;
            try {
              check_perk = await driver.findElement(By.xpath("//h1[text()='Where did it go?']"));                  
            } 
            catch (error) {
              resolve(true);  
            }        
            if(check_perk)
            {  
                resolve(false);
            } 
            else
            { 
              resolve(true);  
            }
            
          }
          else
          {
             
            resolve(false);
           
          }
      } 
      catch (error) 
      {
        console.log("error", error);
       
        resolve(false);
      }
   })
}



module.exports= {login ,acceptCookie, listMyCampaign, detailCampaign, editCampaign,init, GetIndiegogo_acc}