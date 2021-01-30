const puppeteer = require('puppeteer'); 

const city = 'Tokyo';
const duckUrl = `https://duckduckgo.com/?t=ffab&q=time+in+${city}&ia=time`;

let browser;
let page;

const main = async () => {
    // Open new page in headless browser 
    browser = await puppeteer.launch();
    page = await browser.newPage();  
}

const getTime = async () => {
    // Visit a page in browser 
    await page.goto(`${duckUrl}`); 

    const result = await page.evaluate( 
        () => [...document.getElementsByClassName('time')].map(elem => elem.innerText) 
    ); 

    const retVal = (result) 
        ? { err: false, response: result[0] } 
        : { err: true, response: {} };

    return retVal;
}

main().then(async () => {
    console.log(await getTime());
}).catch((err) => {
    console.error(err);
});
