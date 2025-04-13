import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { createPlayer, deletePlayer, observePlayers } from "../models/player";
import { TeamSchedule } from "./teamSchedule";

// Define the type for players Schema in player.ts
interface PlayerType {
  id: string;
  content: string;
}

export default function MainContent() {

  const { signOut } = useAuthenticator();                   // Authenticator hooks for user and sign-out functionality
  const [players, setPlayers] = useState<PlayerType[]>([]); // Local state for player data

  // Subscribe to player updates automatically on component mount 
  useEffect(() => {
    const subscription = observePlayers(setPlayers);
    return () => subscription.unsubscribe();
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
      <div>
        <Heading level={4}>Previous Results: Last 4 Games</Heading>
        <TeamSchedule />
      </div>

      <Button onClick={createPlayer}>Add Player</Button>
      <ul>
        {players.map((player) => (
          <li
            onClick={() => deletePlayer(player.id)} // Delete player on click
            key={player.id}
            style={{ cursor: "pointer", margin: "10px 0" }}
          >
            {player.content}
          </li>
        ))}
      </ul>

      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}