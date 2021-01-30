const puppeteer = require('puppeteer'); 

const city = 'Tokyo';
const duckUrl = `https://time.is/${city}`;//?lang=en`;

let browser;
// let page;

const main = async () => {
    // Open new page in headless browser 
    browser = await puppeteer.launch();
}

const getTime = async () => {
    const page = await browser.newPage()
    
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
    });  

    // Visit a page in browser 
    await page.goto(`${duckUrl}`); 

    const result = await page.evaluate(() => {
        return {
            time:  document.getElementById('clock0_bg').innerText,
            details: [...document.querySelectorAll("section > ul > li")].map(el => el.innerText)
        }
    }); 

    page.close();

    // console.log(result);

    const retVal = (result) 
        ? { err: false, response: result } 
        : { err: true, response: {} };

    return retVal;
}

main().then(async () => {
    // for (let index = 0; index < 10; index++) {
        console.log(await getTime());
        // await page.screenshot({path: 'screenshot.png'}); 
    // }
    process.exit(1);
}).catch((err) => {
    console.error(err);
});
