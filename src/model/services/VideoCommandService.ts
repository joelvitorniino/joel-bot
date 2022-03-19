import { WAMessage, WASocket } from "@adiwajshing/baileys";
import axios from "axios";
import { IVideo } from "../../interfaces/IVideo";
import { commandSlice } from "../../utils/commandSlice";
import { CommandService } from "./CommandService";

export class VideoCommandService implements CommandService {
  private msg: WAMessage;
  private sock: WASocket;

  constructor(public jid: string) {
    this.sendCommand(jid);
  }

  async sendCommand(jid: string) {
    const body = String(this.msg.message.conversation);
    const bodySlice = commandSlice(body, 2);

    if (this.msg.message.conversation === `!v ${bodySlice}`) {
      const bodyURI = encodeURI(bodySlice);

      const response = await axios.get<IVideo>(
        `https://api-get-info-youtube.herokuapp.com/api/v1/video?link=${bodyURI}`
      );

      this.sock.sendMessage(jid, {
        video: {
          url: response.data.linkVideo,
        },
        mimetype: "video/mp4",
      });
    };
  };
};
