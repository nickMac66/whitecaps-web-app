import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, ThemeProvider } from '@aws-amplify/ui-react';
import tableTheme from '../themes/tableTheme';
import { postSchedule } from '../api/scheduleApi';

export const TeamSchedule = () => {
  const [schedule, setSchedule] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const url = 'https://a6kkf1gwqb.execute-api.ca-central-1.amazonaws.com/dev/schedule';

  const getSchedule = async () => {
    console.log("hello from getSchedule()");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const scheduleJson = await response.json();
      setSchedule(scheduleJson);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await postSchedule(); 
        getSchedule();        
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!schedule) return <div>Loading schedule...</div>;

  return (
    <ThemeProvider theme={tableTheme} colorMode="light">
      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Rank</TableCell>
            <TableCell as="th">Date</TableCell>
            <TableCell as="th">Home Team</TableCell>
            <TableCell as="th">Score</TableCell>
            <TableCell as="th">Away Team</TableCell>
            <TableCell as="th">Time</TableCell>
            <TableCell as="th">Venue</TableCell>
            <TableCell as="th">Points</TableCell>
            <TableCell as="th">Goals For</TableCell>
            <TableCell as="th">Goals Against</TableCell>
            <TableCell as="th">Shots Against</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((game, index) => (
            <TableRow key={index}>
              <TableCell>{game.rank}</TableCell>
              <TableCell>{game.date}</TableCell>
              <TableCell>{game.homeTeam}</TableCell>
              <TableCell>{game.score}</TableCell>
              <TableCell>{game.awayTeam}</TableCell>
              <TableCell>{game.time}</TableCell>
              <TableCell>{game.venue}</TableCell>
              <TableCell>{game.points}</TableCell>
              <TableCell>{game.goalsFor}</TableCell>
              <TableCell>{game.goalsAgainst}</TableCell>
              <TableCell>{game.shotsAgainst}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};

export default TeamSchedule