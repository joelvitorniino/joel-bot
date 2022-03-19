import { WAMessage, WASocket } from "@adiwajshing/baileys";
import axios from 'axios';
import { IMusic } from "../../interfaces/IMusic";
import { commandSlice } from "../../utils/commandSlice";
import { CommandService } from "./CommandService";

export class MusicCommandService implements CommandService {
    private msg: WAMessage;
    private sock: WASocket;

    constructor(public jid: string) {
        this.sendCommand(jid);
    };

    async sendCommand(jid: string) {
        const body = String(this.msg.message.conversation);
        const sliceBody = commandSlice(body, 2);

        if(this.msg.message.conversation === `!m ${sliceBody}`) {
            const bodyURI = encodeURI(sliceBody);

            const response = await axios.get<IMusic>(`https://api-get-info-youtube.herokuapp.com/api/v1/music?link=${bodyURI}`);

            await this.sock.sendMessage(jid, {
                audio: {
                    url: response.data.linkMusic
                },
                mimetype: 'audio/mp4'
            });
        };
    };
};