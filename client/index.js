import { draw } from "./draw.js";
import { getUrlParam } from "./utils.js";
import { initSockets } from "./communication.js";
import { setupEvents } from "./events.js";

const init = () => {
    // To change
    const url_username = getUrlParam("username");
    try {
        initSockets(url_username);
    } catch (err) {
        console.error("Could not connect to sockets server!", err);
        return;
    }

    // Setting up keyboard events
    setupEvents();

    // Starting drawing cycle
    draw();
};

init();