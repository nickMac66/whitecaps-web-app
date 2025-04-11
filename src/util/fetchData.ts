import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 3000;

const targetUrl = "https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5";
const targetId = "#calendarTeam";

app.get("/api/schedule", async (req, res) => {
    try {
        const browser = await puppeteer.launch(); // Launch the browser
        const page = await browser.newPage();     // Open a new tab
        await page.goto(targetUrl, { waitUntil: "networkidle0" }); // Navigate to the target URL
        
        await page.waitForSelector(targetId); // Wait for the element to load
        const content = await page.$eval(targetId, (element) => element.outerHTML); // Extract HTML

        await browser.close(); // Close the browser
        res.status(200).json({ schedule: content }); // Send the content to the frontend as JSON
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to fetch schedule:", error.message);
        } else {
            console.error("Failed to fetch schedule:", error);
        }
        res.status(500).json({ error: "Failed to fetch schedule." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});