import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { createPlayer, deletePlayer, observePlayers } from "../models/player";
import { getSchedule } from "../models/team";

// Define the type for players (adjust based on your actual Schema in player.ts if needed)
interface PlayerType {
  id: string;
  content: string;
}

export default function MainContent() {
  const { user, signOut } = useAuthenticator(); // Authenticator hooks for user and sign-out functionality
  const [players, setPlayers] = useState<PlayerType[]>([]); // Local state for player data
  const [schedule, setSchedule] = useState<string | null>(null); // State to store the schedule data

  // Subscribe to player updates on mount
  useEffect(() => {
    const subscription = observePlayers(setPlayers);
    return () => subscription.unsubscribe(); // Clean up the subscription on unmount
  }, []);

  // Fetch and execute getSchedule automatically on component mount
  useEffect(() => {
    getSchedule()
        .then((data) => setSchedule(data)) // Save fetched schedule data to state
        .catch((error) => console.error("Error fetching schedule:", error)); // Handle errors
}, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="0 auto"
      className="App"
    >
      <Image src={wcLogo} alt="Whitecaps Logo" width="300px" />
      <Heading level={3}>Welcome, {user.username}!</Heading>

      {/* Display the schedule automatically below the heading */}
      {schedule && (
        <div>
          <Heading level={4}>Team Schedule</Heading>
          <div>{schedule}</div>
        </div>
      )}

      <Button onClick={createPlayer}>Add Player</Button>
      <ul>
        {players.map((player) => (
          <li
            onClick={() => deletePlayer(player.id)} // Delete player on click
            key={player.id}
            style={{ cursor: "pointer", margin: "10px 0" }} // Adding basic inline styling
          >
            {player.content}
          </li>
        ))}
      </ul>
      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}