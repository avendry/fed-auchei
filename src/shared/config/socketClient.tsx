import { io } from "socket.io-client";
import { Globals } from "../utils/Globals";

export const socketIo = io(Globals.base_url, {
    transports: ["websocket"]
});