import { WAMessage, WASocket } from "@adiwajshing/baileys";
import axios from 'axios';
import { IMusic } from "../../interfaces/IMusic";
import { commandSlice } from "../../utils/commandSlice";
import { CommandService } from "./CommandService";

export class MusicCommandService implements CommandService {

    constructor(public sock: WASocket, public jid: string, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock: WASocket, jid: string, msg: WAMessage) {
        const body = String(msg.message.conversation);
        const sliceBody = commandSlice(body, 2);

        if(msg.message.conversation === `!m ${sliceBody}`) {
            const bodyURI = encodeURI(sliceBody);

            const response = await axios.get<IMusic>(`https://api-get-info-youtube.herokuapp.com/api/v1/music?link=${bodyURI}`);

            await sock.sendMessage(jid, {
                audio: {
                    url: response.data.linkMusic
                },
                mimetype: 'audio/mp4'
            });
        };
    };
};