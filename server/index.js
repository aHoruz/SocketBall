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

    if (player_map.has(username)) {
        return next("Username already in use");
    } else {
        socket.username = username;
        return next();
    }
};

const setupEventTriggers = () => {
    io.on("connection", socket => {
        registerConnection(socket);

        // TODO: Notify player of previous players as well


        setupSocketEvents(socket);
    });
};

const setupSocketEvents = (socket) => {
    socket.on("disconnect", () => {
        disconnect(socket);
    });

    // Updating directions
    socket.on("move_hor", (horizontal_dir) => {
        const player = player_map.get(socket.username);
        player.setHorizontalDirection(horizontal_dir);
    });
    socket.on("move_vert", (vertical_dir) => {
        const player = player_map.get(socket.username);
        player.setVerticalDirection(vertical_dir);
    });
};

const registerConnection = (socket) => {
    const player_obj = new Player(socket.username);
    const new_player_info = player_obj.toObject();
    
    console.log("User", socket.username, "connected");
    notifyOfNewPlayer(socket, new_player_info);
    
    notifyNewPlayerOfGameInfo(socket, new_player_info);

    // Adding player to the game data structures
    socket_map.set(socket.username, socket);
    player_map.set(socket.username, player_obj);
};

const notifyOfNewPlayer = (socket, new_player_info) => {
    // Notifying other players of the new player
    socket.broadcast.emit("new_player", new_player_info);
};

const notifyNewPlayerOfGameInfo = (socket, new_player_info) => {
    // Notifying player of his info
    socket.emit("your_info", new_player_info);

    // Notifying player of other players' info
    let other_player_coords = [];
    for (const player of player_map.values()) {
        other_player_coords.push(player.toObject());
    }
    
    socket.emit("others_info", other_player_coords);
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

    // console.log("New player positions", new_coords);

    // Notifying all players of the new positions
    io.emit("pos_tick", new_coords);
};

initSockets();

setInterval(updateGame, GAME_TICKRATE_MS);