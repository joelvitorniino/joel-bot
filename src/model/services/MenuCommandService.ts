import { WAMessage, WASocket } from "@adiwajshing/baileys";
import fs from 'fs';
import { CommandService } from "./CommandService";

export class MenuCommandService implements CommandService {
    private msg: WAMessage;
    private sock: WASocket;

    constructor(public jid: string) {
        this.sendCommand(jid);
    };

    sendCommand(jid: string) {
        if(this.msg.message.conversation.startsWith('!') && this.msg.message.conversation === '!menu') {
            fs.readFile(`/home/joel/Documents/joel-bot/src/md/menu.md`, 'utf-8', (err, data) => {
                if(err) throw err;

                this.sock.sendMessage(jid, { text: data });
            });
        };        
    };
};