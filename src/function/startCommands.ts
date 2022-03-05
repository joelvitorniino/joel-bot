import { WAMessage } from "@adiwajshing/baileys";
import { Commands } from "../model/Commands";
import { CommandService } from "../model/services/CommandService";
import { JishoCommandService } from "../model/services/JishoCommandService";
import { LyricsCommandService } from "../model/services/LyricsCommandService";
import { MenuCommandService } from "../model/services/MenuCommandService";
import { MusicCommandService } from "../model/services/MusicCommandService";
import { VideoCommandService } from "../model/services/VideoCommandService";

export const startCommands = (sock, jid: String, msg: WAMessage) => {
    const commands: CommandService[] = [
        new JishoCommandService(sock, jid, msg),
        new MenuCommandService(sock, jid, msg),
        new VideoCommandService(sock, jid, msg),
        new MusicCommandService(sock, jid, msg),
        new LyricsCommandService(sock, jid, msg)
    ];

    return commands.map(command => {
        new Commands(command);
    });
};