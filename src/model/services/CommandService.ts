import { WAMessage } from "@adiwajshing/baileys";

export interface CommandService {
    sendCommand(sock, jid: String, msg: WAMessage): void;
}