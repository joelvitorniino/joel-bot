import { WAMessage } from "@adiwajshing/baileys";
import fs from 'fs';
import { CommandService } from "./CommandService";

export class MenuCommandService implements CommandService {
    constructor(public sock, public jid: String, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    sendCommand(sock, jid: String, msg: WAMessage) {
        if(msg.message.conversation.startsWith('!') && msg.message.conversation === '!menu') {
            fs.readFile(`/home/joel/Documents/joel-bot/src/md/menu.md`, 'utf-8', (err, data) => {
                if(err) throw err;

                sock.sendMessage(jid, { text: data });
            });
        };        
    };
};