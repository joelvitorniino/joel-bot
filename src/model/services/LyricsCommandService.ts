import { WAMessage, WASocket } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";
import { getSong } from 'genius-lyrics-api';
import dotenv from 'dotenv';
import { commandSlice } from "../../utils/commandSlice";

dotenv.config();

export class LyricsCommandService implements CommandService {
    private msg: WAMessage;
    private sock: WASocket;

    constructor(public jid: string) {
        this.sendCommand(jid);
    }

    sendCommand(jid: string) {
        const sliceBody = commandSlice(this.msg.message.conversation, 7);
        
        if(this.msg.message.conversation === `!lyrics ${sliceBody}`) {
            const splitLyrics: string[] = sliceBody.split("|");
            const [title, artist] = splitLyrics;

            const options = {
                apiKey: process.env.API_KEY_GENIUS,
                title: title,
                artist: artist,
                optimizeQuery: true
            };

            getSong(options)
                .then(song => {
                    this.sock.sendMessage(jid, {
                        text: `${song.lyrics}`
                    });
                });
        };
    };
};