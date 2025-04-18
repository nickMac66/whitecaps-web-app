import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js"
import playwright from "playwright-aws-lambda";

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/schedule', function (req, res) {

});

app.get('/schedule/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/schedule', function (req, res) {
  try {
    const { chromium } = playwright;

    (async () => {
      const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox'] 
      });
      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      });

      const page = await context.newPage();

      await page.goto('https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5', {
        waitUntil: 'networkidle',
        timeout: 45000,
      });
      await page.waitForSelector('#calendarTeam', {
        timeout: 30000,
      });

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

      res.send(data);
      await browser.close();
    })();

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch schedule.' });
  }
});

app.post('/schedule/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/schedule', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/schedule/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/schedule', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/schedule/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

export default app;
