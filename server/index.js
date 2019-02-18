const UPDATE_TICKRATE_MS = 60;
const NOTIFY_TICKRATE_MS = 20;
const { initSockets, notifyNewGameState } = require("./communication.js");
const { initWorld, update } = require("./WorldController.js");

initWorld();
initSockets();

setInterval(() => {update(UPDATE_TICKRATE_MS);}, UPDATE_TICKRATE_MS);
setInterval(notifyNewGameState, NOTIFY_TICKRATE_MS);