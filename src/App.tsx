import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import NavMenu from "./components/navMenu"
import MainContent from "./components/mainContent"
import wcLogo from "./assets/images/wc-logo.jpg"

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  console.log(user, signOut);
  const [players, addPlayers] = useState<Array<Schema["Player"]["type"]>>([]);

  useEffect(() => {
    client.models.Player.observeQuery().subscribe({
      next: (data) => addPlayers([...data.items]),
    });
  }, []);

  function createPlayer() {
    client.models.Player.create({ content: window.prompt("Player name") });
  }

  function deletePlayer(id: string) {
    client.models.Player.delete({ id })
  }

  return (
    <>
      <NavMenu />
      <MainContent user={user} signOut={signOut} />

      {/* <main>
        <h1>Signed in as: {user?.signInDetails?.loginId}</h1>
        <button onClick={createPlayer}>Add player</button>
        <ul>
          {players.map(player => <li
            onClick={() => deletePlayer(player.id)}
            key={player.id}>
            {player.content}
          </li>)}
        </ul>
        <button onClick={signOut}>Sign out</button>
      </main> */}
    </>
  )
}

export default App;
