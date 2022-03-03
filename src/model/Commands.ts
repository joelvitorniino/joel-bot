import { CommandService } from "./services/CommandService";

export class Commands {
    public _service: CommandService;

    constructor(_service: CommandService) {
        this._service = _service;
    }
}