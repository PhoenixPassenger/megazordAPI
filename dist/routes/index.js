"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routes_1 = __importDefault(require("./users.routes"));
var sessions_routes_1 = __importDefault(require("./sessions.routes"));
var rhymes_routes_1 = __importDefault(require("./rhymes.routes"));
var words_routes_1 = __importDefault(require("./words.routes"));
var game_routes_1 = __importDefault(require("./game.routes"));
var routes = express_1.Router();
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/rhymes', rhymes_routes_1.default);
routes.use('/words', words_routes_1.default);
routes.use('/game', game_routes_1.default);
exports.default = routes;
