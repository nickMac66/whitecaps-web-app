// URL of the Google Docs document to fetch
const url = 'https://queenscountyrec.com/teams/?seasonNo=64&teamNo=5'

/**
 * Fetch team schedule data from the QCRL website, parse it and display it on the main page
 */
export const getSchedule = async (): Promise<string | null> => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const scheduleElement = doc.getElementById("calendarTeam");

        return scheduleElement ? scheduleElement.textContent : null; // Return text content or null
    } catch (error) {
        console.error("Error fetching schedule:", error);
        throw error;
    }
};