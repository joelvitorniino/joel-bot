import { WAMessage } from "@adiwajshing/baileys";
import ytdl from "ytdl-core";
import { commandSlice } from "../utils/commandSlice";

export class Video {
    constructor(public sock, public jid: String, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    };

    async sendCommand(sock, jid: String, msg: WAMessage) {
        const body = String(msg.message.conversation);
        const bodySlice = commandSlice(body, 2);

        if(msg.message.conversation === `!v ${bodySlice}`) {
            await ytdl.getInfo(`https://${bodySlice}`)
                .then(videoInfo => {
                    sock.sendMessage(jid, {
                        video: {
                            url: videoInfo.formats[0].url
                        },
                        mimetype: 'video/mp4'
                    })
                });
        };
    };
};