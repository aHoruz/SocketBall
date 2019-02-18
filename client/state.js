import PlayerModel from "./PlayerModel.js";

const players = new Map();
let own_player = null;

export const addOwnPlayer = (new_player_info) => {
    own_player = new PlayerModel(new_player_info, true);
    players.set(new_player_info.username, own_player);
};

export const addOtherPlayers = (other_players_info) => {
    for (const player_info of other_players_info) {
        players.set(player_info.username, new PlayerModel(player_info));
    }
};

export const addPlayer = (new_player_info) => {
    const player = new PlayerModel(new_player_info);
    players.set(player.username, player);
};

export const removePlayer = (username) => {
    players.delete(username);
};

export const updatePositions = (players_data) => {
    for (const player_data of players_data) {
        players.get(player_data.username).update(player_data);
    }
};

export const getPlayerModels = () => {
    return players.values();
};

export const getOwnPlayerModel = () => {
    return own_player;
};