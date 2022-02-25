import { WAMessage } from "@adiwajshing/baileys";
import ytdl from "ytdl-core";
import { commandSlice } from "../utils/commandSlice";

export class Music {
    constructor(public sock, public jid: String, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock, jid: String, msg: WAMessage) {
        const body = String(msg.message.conversation);
        const sliceBody = commandSlice(body, 2);

        if(msg.message.conversation === `!m ${sliceBody}`) {
            const info = await ytdl.getInfo(`https://${sliceBody}`);
            const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

            await sock.sendMessage(jid, {
                audio: {
                    url: audioFormats[0].url
                },
                mimetype: 'audio/mp4'
            });
        };
    };
};