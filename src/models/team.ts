/**
 * Fetch team schedule data from the QCRL website, parse it and display it on the main page
 */
// Send a request to the backend server to fetch elements from the URL
export async function getSchedule(): Promise<string | null> {
    const proxyUrl = "http://127.0.0.1:5000/scrape"; // Flask server endpoint
    const targetUrl = "https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5"; // Target URL to scrape

    try {
        const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(targetUrl)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Assuming data is JSON and contains a 'schedule' property
        console.log("Extracted Elements:", data);

        // Return the 'schedule' property from the JSON response (adjust based on actual structure)
        return data.elements?.join(", ") || null; // Combine elements if it's an array of strings
    } catch (error) {
        console.error("Error fetching elements:", error);
        return null; // Return null if there's an error
    }
}