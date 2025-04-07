import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { createPlayer, deletePlayer, observePlayers } from "../models/player"; // Importing logic from player.ts

// Define the type for players (adjust based on your actual Schema in player.ts if needed)
interface PlayerType {
  id: string;
  content: string;
}

export default function MainContent() {
  const { user, signOut } = useAuthenticator(); // Authenticator hooks for user and sign-out functionality
  const [players, setPlayers] = useState<PlayerType[]>([]); // Local state for player data

  // Subscribe to player updates on mount
  useEffect(() => {
    const subscription = observePlayers(setPlayers);
    return () => subscription.unsubscribe(); // Clean up the subscription on unmount
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