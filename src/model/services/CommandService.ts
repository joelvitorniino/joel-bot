import { WAMessage } from "@adiwajshing/baileys";

export interface CommandService {
    sendCommand(jid: string, msg: WAMessage): void;
}