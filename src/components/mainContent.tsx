import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useRef, useState } from "react";
import { createPlayer, deletePlayer, observePlayers } from "../models/player";
import { getSchedule } from "../models/team";

// Define the type for players Schema in player.ts
interface PlayerType {
  id: string;
  content: string;
}

export default function MainContent() {
  
  const { user, signOut } = useAuthenticator();                  // Authenticator hooks for user and sign-out functionality
  const [players, setPlayers] = useState<PlayerType[]>([]);      // Local state for player data
  const [schedule, setSchedule] = useState<string | null>(null); // State to store the schedule data
  const didFetch = useRef(false);                                // Ref to prevent duplicate fetch calls

  /* Fetch and execute getSchedule, subscribe to 
     player updates automatically on component mount */
  useEffect(() => {
    
    const subscription = observePlayers(setPlayers);

    if (!didFetch.current) {    

      didFetch.current = true;

      getSchedule()
        .then((data) => {
          if (data) {
            setSchedule(data);                          // Save fetched schedule data to state
          } else {
            console.log("No schedule data available."); // Log if no data is found
          }
        })
        .catch((error) => console.error("Error fetching schedule:", error)); // Handle errors      
      return () => subscription.unsubscribe();
    }
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
          <div dangerouslySetInnerHTML={{ __html: schedule }} />
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