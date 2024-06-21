import { playerState } from "./index,js";

export default function APIStateHandler() {
  let instance = null;

  function createInstance() {
    return {
      saveState: async () => {
        const point = playerState.getPoint();
        const query = await fetch(
          `https://digital-odyssey-sable.vercel.app/api/save-point?point=${point}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(point),
          }
        );

        if (query.ok) {
          const data = await query.json();

          return data, data;
        }
      },
      getPlayerData: async () => {
        const query = await fetch(
          "https://digital-odyssey-sable.vercel.app/api/get-player-data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (query.ok) {
          const data = await query.json();

          return data.data;
        }
      },
      getGameQuestion: async () => {
        const query = await fetch(
          "https://digital-odyssey-sable.vercel.app/api/get-game-question",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (query.ok) {
          const data = await query.json();

          return data, data;
        }
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}
