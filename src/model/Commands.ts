import { proto, WAMessage, WAProto } from "@adiwajshing/baileys";
import { Jisho } from "./Jisho";
import { Menu } from "./Menu";
import { Music } from "./Music";
import { Video } from "./Video";

export class Commands {
    constructor(public sock, public msg: WAMessage, public jid: String) {
        new Menu(sock, jid, msg);
        new Video(sock, jid, msg);
        new Music(sock, jid, msg);
        new Jisho(sock, jid, msg);
    };
};