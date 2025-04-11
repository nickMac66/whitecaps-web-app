export async function getSchedule(): Promise<string | null> {
    try {
        const content = ""
        
        if (content) {
            console.log("Fetched Schedule Content:", content); // Log the content to the console
        } else {
            console.log("No content was fetched.");
        }
        return content; // Return the fetched content
    } catch (error) {
        console.error("Failed to fetch schedule:", error instanceof Error ? error.message : error);
        return null;
    }
}