"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const swagger_1 = require("@nestjs/swagger");
let DataController = class DataController {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: '1383',
            brokers: ['kafka1:9092', 'kafka2:9092'],
        });
        this.producer = this.kafka.producer();
    }
    async sendData() {
        await this.producer.connect();
        await this.producer.send({
            topic: 'HelloTopic',
            messages: [{ key: 'key1', value: 'Hello Kafka!' }],
        });
        await this.producer.disconnect();
        return 'Data sent to Kafka';
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "sendData", null);
exports.DataController = DataController = __decorate([
    (0, swagger_1.ApiTags)('data'),
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [])
], DataController);
//# sourceMappingURL=data.controller.js.map