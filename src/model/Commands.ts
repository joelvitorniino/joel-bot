import { WAMessage } from "@adiwajshing/baileys";
import { CommandService } from "./services/CommandService";
import { JishoCommandService } from "./services/JishoCommandService";

export class Commands {
    private _service: CommandService;

    constructor(_service: CommandService) {
        this._service = _service;
    }
}