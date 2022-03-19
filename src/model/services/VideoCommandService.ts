import { WAMessage, WASocket } from "@adiwajshing/baileys";
import axios from "axios";
import { IVideo } from "../../interfaces/IVideo";
import { commandSlice } from "../../utils/commandSlice";
import { CommandService } from "./CommandService";

export class VideoCommandService implements CommandService {

  constructor(public sock: WASocket, public jid: string, public msg: WAMessage) {
    this.sendCommand(sock, jid, msg);
  }

  async sendCommand(sock: WASocket, jid: string, msg: WAMessage) {
    const body = String(msg.message.conversation);
    const bodySlice = commandSlice(body, 2);

    if (msg.message.conversation === `!v ${bodySlice}`) {
      const bodyURI = encodeURI(bodySlice);

      const response = await axios.get<IVideo>(
        `https://api-get-info-youtube.herokuapp.com/api/v1/video?link=${bodyURI}`
      );

      sock.sendMessage(jid, {
        video: {
          url: response.data.linkVideo,
        },
        mimetype: "video/mp4",
      });
    };
  };
};
