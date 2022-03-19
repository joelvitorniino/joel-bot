import { WAMessage, WASocket } from "@adiwajshing/baileys";

export interface CommandService {
    sendCommand(sock: WASocket, jid: string, msg: WAMessage): void;
}