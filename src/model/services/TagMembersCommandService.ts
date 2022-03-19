import { WAMessage, WASocket } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";

export class TagMembersCommandService implements CommandService {

    constructor(public sock: WASocket, public jid: string, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock: WASocket, jid: string, msg: WAMessage) {

        if(msg.message.conversation === '!tagmembers') {
            const metadata = await this.sock.groupMetadata(jid);
            const array = metadata.participants.map(all => all.id);
            let allMembers = "";
            
            array.forEach((participant, i) => allMembers += `@${array[i].replace('@s.whatsapp.net', '')}\n`);
    
            await sock.sendMessage(jid, {
                text: allMembers,
                mentions: array
            });    
        };
    };
};