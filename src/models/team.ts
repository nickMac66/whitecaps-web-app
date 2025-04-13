// export async function getSchedule(): Promise<string | null> {


export async function getSchedule(): Promise<string | null> {

    let scheduleJson
    let scheduleTable

    console.log("hello from getSchedule()")

    const url = "http://localhost:3000";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        scheduleJson = await response.json();
        console.log(scheduleJson);
        scheduleTable = displaySchedule(scheduleJson);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
    return scheduleTable || null;
}

function displaySchedule(scheduleJson: Record<string, any>) {
    let scheduleTable = '<table>'

    for (const key in scheduleJson) {
        scheduleTable += '<tr>'
        console.log(scheduleJson[key])
        const game = scheduleJson[key]

        for (const key in game) {
            console.log("category: ", key)

            scheduleTable += `<th>${key}</th>`
        }
        scheduleTable += '</tr><tr>'

        for (const key in game) {
            let value = game[key]
            scheduleTable += `<td>${value}</td>`
        }
        scheduleTable += '</tr>'
    }
    scheduleTable += '</table>'
    console.log(scheduleTable)
    return scheduleTable;
}

