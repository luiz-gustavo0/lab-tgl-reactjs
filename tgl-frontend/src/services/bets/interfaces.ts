interface GamePayload {
  games: { game_id: number; numbers: number[] };
}

interface Betbody {
  games: GamePayload[];
}

export type { Betbody };
