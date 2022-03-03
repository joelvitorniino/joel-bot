import { WAMessage } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";
import { getLyrics, getSong } from 'genius-lyrics-api';
import dotenv from 'dotenv';
import { commandSlice } from "../../utils/commandSlice";

dotenv.config();

export class LyricsCommandService implements CommandService {
    constructor(public sock, public jid: String, public msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    }

    sendCommand(sock, jid: String, msg: WAMessage) {
        const sliceBody = commandSlice(msg.message.conversation, 7);
        
        if(msg.message.conversation === `!lyrics ${sliceBody}`) {
            const splitLyrics: string[] = sliceBody.split("|");

            const options = {
                apiKey: process.env.API_KEY_GENIUS,
                title: splitLyrics[0],
                artist: splitLyrics[1],
                optimizeQuery: true
            };

            getSong(options)
                .then(song => {
                    sock.sendMessage(jid, {
                        text: `${song.lyrics}`
                    });
                });
        };
    };
};