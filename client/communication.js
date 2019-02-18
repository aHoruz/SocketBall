import { addPlayer, updatePositions, addOwnPlayer, addOtherPlayers, getOwnPlayerModel } from "./state.js";

let socket = null;

export const initSockets = (username = "default_username") => {
    console.log("Connecting with username ", username);

    // eslint-disable-next-line no-undef
    socket = io(`http://localhost:4001?username=${username}`);

    socket.on("connect", () => {
        console.log("Connection successful!");
        setupSocketEvents();
        startMovementUpdateRequest();
    });

    socket.on("connect_failed", () => {
        console.warn("Connection to the server failed!");
        alert("Could not connect to the server!");
        throw "connect_failed";
    });

    socket.on("connect_error", () => {
        console.warn("Server probably offline!");
        alert("Could not connect to the server!");
        throw "connect_error";
    });
};

const setupSocketEvents = () => {
    socket.on("disconnect", () => {
        console.warn("Disconnected from server!");
    });

    // Post connection user information
    socket.on("your_info", (own_player_info) => {
        console.log("adding own player", own_player_info);
        addOwnPlayer(own_player_info);
    });

    // Other players' information
    socket.on("others_info", (other_players_info) => {
        console.log("Adding other players", other_players_info);
        addOtherPlayers(other_players_info);
    });

    socket.on("new_player", (new_player_info) => {
        console.log("Adding player with username", new_player_info.username);
        addPlayer(new_player_info);
    });

    socket.on("pos_tick", (player_data) => {
        // console.log("Position tick", player_data);
        updatePositions(player_data);
    });
};

const MOVEMENT_SENDING_TICKRATE_MS = 10;
let last_directions = null;

const areDirectionsDifferent = ([old_hor, old_vert], [new_hor, new_vert]) => {
    return old_hor !== new_hor || old_vert !== new_vert;
};

const startMovementUpdateRequest = () => {
    setInterval(() => {
        const directions = getOwnPlayerModel().getDirections();
        if (!last_directions || areDirectionsDifferent(last_directions, directions)) {
            last_directions = directions;
            updateMoveDirections(...directions);
        }
    }, MOVEMENT_SENDING_TICKRATE_MS);
};

export const updateMoveDirections = (horizontal_dir, vertical_dir) => {
    socket.emit("move", horizontal_dir, vertical_dir);
};