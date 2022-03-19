import { WAMessage, WASocket } from '@adiwajshing/baileys';
import axios from 'axios';
import { IJisho } from '../../interfaces/IJisho';
import { commandSlice } from '../../utils/commandSlice';
import { CommandService } from './CommandService';

export class JishoCommandService implements CommandService {

    constructor(public sock: WASocket, public jid: string, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock: WASocket, jid: string, msg: WAMessage) {
        const bodySlice = commandSlice(msg.message.conversation, 6);
        const bodyURI = encodeURI(bodySlice);

        if(msg.message.conversation === `!jisho ${bodySlice}`) {
            const response = await axios.get<IJisho>(`https://jisho.org/api/v1/search/words?keyword=${bodyURI}`);

            await sock.sendMessage(jid, {
            text: `Slug: ${response.data.data[0].slug}\nReading: ${response.data.data[0].senses[0].english_definitions[0]}`
            });
        };
    };
};