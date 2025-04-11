import express from 'express';
import playwright from 'playwright'

const app = express();
const port = 3000; // Port for the server

const targetUrl = "https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5";
const targetId = "#calendarTeam";

app.get('/', async (req, res) => {
    try {
        console.log("hello from home")
        const { chromium } = playwright;
        (async () => {
            const browser = await chromium.launch({ headless: true });
            const context = await browser.newContext({
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            });
            const page = await context.newPage();
            await page.goto('https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5');
            const pageTitle = await page.title(); console.log(pageTitle);
            await page.waitForSelector('#calendarTeam'); // Wait until the element is loaded            
            const content = await page.$eval('#calendarTeam', (element: HTMLElement) => element.innerHTML);
            console.log(content);
            await browser.close();
        })();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch schedule.' }); // Handle errors
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});