import { Manager } from "socket.io-client";

const manager = new Manager(import.meta.env.VITE_HOST_URL);

export const socket = manager.socket("/room");

export default manager;
