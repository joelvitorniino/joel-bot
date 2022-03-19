import { WAMessage, WASocket } from "@adiwajshing/baileys";
import { CommandService } from "./CommandService";
import { getSong } from 'genius-lyrics-api';
import dotenv from 'dotenv';
import { commandSlice } from "../../utils/commandSlice";

dotenv.config();

export class LyricsCommandService implements CommandService {

    constructor(public sock: WASocket, public jid: string, msg: WAMessage) {
        this.sendCommand(sock, jid, msg);
    }

    sendCommand(sock: WASocket, jid: string, msg: WAMessage) {
        const sliceBody = commandSlice(msg.message.conversation, 7);
        
        if(msg.message.conversation === `!lyrics ${sliceBody}`) {
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
                    sock.sendMessage(jid, {
                        text: `${song.lyrics}`
                    });
                });
        };
    };
};