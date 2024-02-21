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
exports.ReportEntity = void 0;
const nest_arango_1 = require("nest-arango");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let ReportEntity = class ReportEntity extends nest_arango_1.ArangoDocument {
};
exports.ReportEntity = ReportEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'عنوان گزارش',
        example: 'این گزارش ... است',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 20),
    __metadata("design:type", String)
], ReportEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'محتوای گزارش',
        example: [''],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], ReportEntity.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ReportEntity.prototype, "date", void 0);
exports.ReportEntity = ReportEntity = __decorate([
    (0, nest_arango_1.Collection)('Reports')
], ReportEntity);
//# sourceMappingURL=report.entity.js.map