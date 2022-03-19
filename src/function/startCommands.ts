import { WAMessage } from "@adiwajshing/baileys";
import { Commands } from "../model/Commands";
import { CommandService } from "../model/services/CommandService";
import { JishoCommandService } from "../model/services/JishoCommandService";
import { LyricsCommandService } from "../model/services/LyricsCommandService";
import { MenuCommandService } from "../model/services/MenuCommandService";
import { MusicCommandService } from "../model/services/MusicCommandService";
import { TagMembersCommandService } from "../model/services/TagMembersCommandService";
import { VideoCommandService } from "../model/services/VideoCommandService";

export const startCommands = (jid: string) => {
    const commands: CommandService[] = [
        new JishoCommandService(jid),
        new MenuCommandService(jid),
        new VideoCommandService(jid),
        new MusicCommandService(jid),
        new LyricsCommandService(jid),
        new TagMembersCommandService(jid)
    ];

    return commands.map(command => {
        new Commands(command);
    });
};