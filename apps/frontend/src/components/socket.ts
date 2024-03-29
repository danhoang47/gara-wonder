import { Manager } from "socket.io-client";

const manager = new Manager(import.meta.env.VITE_HOST_API);

export default manager;
