import { WAMessage, WASocket } from '@adiwajshing/baileys';
import axios from 'axios';
import { IJisho } from '../../interfaces/IJisho';
import { commandSlice } from '../../utils/commandSlice';
import { CommandService } from './CommandService';

export class JishoCommandService implements CommandService {
    private msg: WAMessage;
    private sock: WASocket;

    constructor(public jid: string) {
        this.sendCommand(jid);
    };

    async sendCommand(jid: string) {
        const bodySlice = commandSlice(this.msg.message.conversation, 6);
        const bodyURI = encodeURI(bodySlice);

        if(this.msg.message.conversation === `!jisho ${bodySlice}`) {
            const response = await axios.get<IJisho>(`https://jisho.org/api/v1/search/words?keyword=${bodyURI}`);

            await this.sock.sendMessage(jid, {
            text: `Slug: ${response.data.data[0].slug}\nReading: ${response.data.data[0].senses[0].english_definitions[0]}`
            });
        };
    };
};