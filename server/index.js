// Player model
const Player = require("./Player");

let io = null;

const SOCKETS_IO_PORT = 4001;
// Maps username to socket
const socket_map = new Map();
const player_map = new Map();
const GAME_TICKRATE_MS = 60;

const initSockets = () => {
    io = require("socket.io")(SOCKETS_IO_PORT);
    // Adding username middleware
    io.use(mustHaveUniqueUsername);

    setupEventTriggers();

    console.log(`Sockets Server Started in port ${SOCKETS_IO_PORT}`);
};

const mustHaveUniqueUsername = (socket, next) => {
    const username = socket.handshake.query.username;

    if (username_map.has(username)) {
        return next("Username already in use");
    } else {
        socket.username = username;
        return next();
    }
};

const setupEventTriggers = () => {
    io.on("connection", socket => {
        registerConnection(socket);

        setupSocketEvents(socket);
    });
};

const setupSocketEvents = (socket) => {
    socket.on("disconnect", () => {
        disconnect(socket);
    });

    // Updating directions
    socket.on("move", (horizontal_dir, vertical_dir) => {
        const player = player_map.get(socket.username);
        player.setHorizontalDirection(horizontal_dir);
        player.setVerticalDirection(vertical_dir);
    });
};

const registerConnection = (socket) => {
    const player_obj = new Player(socket.username);

    socket_map.set(socket.username, socket);
    player_map.set(socket.username, player_obj);

    console.log("User", socket.username, "connected");
    notifyOfNewPlayer(socket, player_obj.toObject());
};

const notifyOfNewPlayer = (socket, new_player_info) => {
    socket.broadcast.emit("new_player", new_player_info);
};

const disconnect = (socket) => {
    if(socket) {
        socket_map.delete(socket.username);
        player_map.delete(socket.username);
        console.log("User", socket.username, "disconnected");
    } else {
        console.log("Problem on user disconnect");
    }
};

const updateGame = () => {
    let new_coords = [];

    // Updating player positions
    for (const player of player_map.values()) {
        player.update();
        new_coords.push(player.toObject());
    }

    console.log("New player positions", new_coords);

    // Notifying all players of the new positions
    io.emit("pos_tick", new_coords);
};

initSockets();

setInterval(updateGame, GAME_TICKRATE_MS);