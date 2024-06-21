import APIStateHandler from "./APIStateHandler.js";
import globalStateManager from "./globalState.js";
import NPCGlobalStateManager from "./NPCGlobalState.js";
import playerGlobalStateManager from "./playerGlobalState.js";

export const gameState = globalStateManager().getInstance();
export const NPCState = NPCGlobalStateManager().getInstance();
export const playerState = playerGlobalStateManager().getInstance();
export const APIHandle = APIStateHandler().getInstance();
