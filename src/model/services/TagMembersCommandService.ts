import { WAMessage, WASocket } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";

export class TagMembersCommandService implements CommandService {
    private msg: WAMessage;
    private sock: WASocket;

    constructor(public jid: string) {
        this.sendCommand(jid);
    };

    async sendCommand(jid: string) {

        if(this.msg.message.conversation === '!tagmembers') {
            const metadata = await this.sock.groupMetadata(jid);
            const array = metadata.participants.map(all => all.id);
            let allMembers = "";
            
            array.forEach((participant, i) => allMembers += `@${array[i].replace('@s.whatsapp.net', '')}\n`);
    
            await this.sock.sendMessage(jid, {
                text: allMembers,
                mentions: array
            });    
        };
    };
};