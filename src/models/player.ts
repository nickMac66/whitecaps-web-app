import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

export const client = generateClient<Schema>();

// Define the type for players (adjust based on your actual Schema in player.ts if needed)
export interface PlayerType {
  id: string;
  content: string;
}

export function createPlayer() {
    client.models.Player.create({ content: window.prompt("Player name") });
}

export function deletePlayer(id: string) {
    client.models.Player.delete({ id });
}

export function observePlayers(setPlayers: Function) {
    return client.models.Player.observeQuery().subscribe({
        next: (data) => setPlayers([...data.items]),
    });
}