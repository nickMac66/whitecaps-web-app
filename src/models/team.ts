// export async function getSchedule(): Promise<string | null> {


export async function getSchedule(): Promise<JSON | null> {

    let scheduleJson

    console.log("hello from getSchedule()")

    const url = "http://localhost:3000";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        scheduleJson = await response.json();
        console.log(scheduleJson);
        displaySchedule(scheduleJson);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
    return scheduleJson
}

function displaySchedule(scheduleJson: Record<string, any>) {
    let scheduleTable = '<table>'

    for (const key in scheduleJson) {
        scheduleTable += '<tr>'
        console.log(scheduleJson[key])
        const game = scheduleJson[key]

        for (const key in game) {
            console.log("category: ", key)
            let value = game[key]

            scheduleTable += `<th>${key}</th><td>${value}</td>`

        }

        scheduleTable += '</tr>'
    }
    scheduleTable += '</table>'
    console.log(scheduleTable)
}

