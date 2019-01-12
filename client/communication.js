import { addPlayer, updatePositions, addOwnPlayer, addOtherPlayers } from "./state.js";

let socket = null;

export const initSockets = (username = "default_username") => {
    console.log("Connecting with username ", username);

    // eslint-disable-next-line no-undef
    socket = io(`http://localhost:4001?username=${username}`);
    socket.on("connect", () => {
        console.log("Connection successful!");
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

export const sendMoveVert = (vertical_dir) => {
    console.log("Sending move vert:", vertical_dir);
    socket.emit("move_vert", vertical_dir);
};

export const sendMoveHor = (horizontal_dir) => {
    console.log("Sending move hor:", horizontal_dir);
    socket.emit("move_hor", horizontal_dir);
};