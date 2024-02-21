export declare class DataController {
    private kafka;
    private producer;
    constructor();
    sendData(): Promise<string>;
}
