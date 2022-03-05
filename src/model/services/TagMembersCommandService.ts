import { WAMessage } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";

export class TagMembersCommandService implements CommandService {
    constructor(public sock, public jid: String, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock, jid: String, msg: WAMessage) {

        if(msg.message.conversation === '!mt') {
            const metadata = await sock.groupMetadata(jid, false);
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