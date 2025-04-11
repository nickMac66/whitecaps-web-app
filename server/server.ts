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
            await page.goto('https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5', { waitUntil: 'networkidle' });
            await page.waitForSelector('#calendarTeam');
            const rawHtml = await page.$eval('#calendarTeam', element => element.innerHTML);
            const data = await page.$$eval('#calendarTeam table tbody tr', rows => {
                return rows.map(row => {
                    const cells = row.querySelectorAll('td');
                    return {
                        rank: cells[0]?.innerText.trim(),
                        date: cells[1]?.innerText.trim(),
                        homeTeam: cells[2]?.innerText.trim(),
                        score: cells[3]?.innerText.trim(),
                        awayTeam: cells[4]?.innerText.trim(),
                        time: cells[5]?.innerText.trim(),
                        venue: cells[6]?.innerText.trim(),
                        points: cells[7]?.innerText.trim(),
                        goalsFor: cells[8]?.innerText.trim(),
                        goalsAgainst: cells[9]?.innerText.trim(),
                        shotsAgainst: cells[10]?.innerText.trim(),
                    };
                });
            });
            
            console.log(JSON.stringify(data, null, 2)); 
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