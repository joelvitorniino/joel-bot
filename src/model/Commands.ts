import { CommandService } from "./services/CommandService";

export class Commands {
    private _service: CommandService;s

    constructor(_service: CommandService) {
        this._service = _service;
    }
}