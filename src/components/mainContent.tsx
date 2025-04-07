import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { createPlayer, deletePlayer, observePlayers } from "../models/player"; // Reusing logic from the models

// Define the type for players (adjust based on your Schema)
interface PlayerType {
  id: string;
  content: string;
}

export default function MainContent() {
    const { user, signOut } = useAuthenticator();
    const [players, setPlayers] = useState<PlayerType[]>([]); // Typing for players array

    useEffect(() => {
        const subscription = observePlayers(setPlayers); // Subscribe to player updates
        return () => subscription.unsubscribe(); // Cleanup subscription on unmount
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
                        onClick={() => deletePlayer(player.id)}
                        key={player.id}
                        style={{ cursor: "pointer", margin: "10px 0" }} // Adding some styling for better UX
                    >
                        {player.content}
                    </li>
                ))}
            </ul>
            <Button onClick={signOut}>Sign Out</Button>
        </Flex>
    );
}