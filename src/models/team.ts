// export async function getSchedule(): Promise<string | null> {

export async function getSchedule() {

    console.log("hello from getSchedule()")

    const url = "http://localhost:3000";

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // console.log(response)
        const json = await response.json();
        console.log(json);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
}