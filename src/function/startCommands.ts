import { WAMessage, WASocket } from "@adiwajshing/baileys";
import { Commands } from "../model/Commands";
import { CommandService } from "../model/services/CommandService";
import { JishoCommandService } from "../model/services/JishoCommandService";
import { LyricsCommandService } from "../model/services/LyricsCommandService";
import { MenuCommandService } from "../model/services/MenuCommandService";
import { MusicCommandService } from "../model/services/MusicCommandService";
import { TagMembersCommandService } from "../model/services/TagMembersCommandService";
import { VideoCommandService } from "../model/services/VideoCommandService";

const getCommand = (body: string) => {
    const regex = /^\![A-Za-z0-9]+/;
  
    const command = regex.exec(body)[0].split("!")[1];
  
    return command;
};

export const startCommands = (sock: WASocket, jid: string, msg: WAMessage) => {
    const commands = {
        jisho: JishoCommandService,
        menu:  MenuCommandService,
        video: VideoCommandService,
        music: MusicCommandService,
        lyrics: LyricsCommandService,
        tagMembers: TagMembersCommandService
    };

    const commandInitialized = new commands[getCommand(msg.message.conversation)](sock, jid, msg);

    return commandInitialized;
};