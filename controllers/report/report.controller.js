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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_entity_1 = require("../../entities/report/report.entity");
const report_service_1 = require("../../services/report/report.service");
const auth_guard_1 = require("../../auth/auth.guard");
const database_1 = require("../../database/database");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createReport(report) {
        return await this.reportService.create(report);
    }
    async removeReport(key) {
        try {
            return await this.reportService.remove(key);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllReports() {
        const reports = await this.reportService.findAll();
        if (reports.totalCount == 0) {
            throw new common_1.HttpException('Report not found', common_1.HttpStatus.NO_CONTENT);
        }
        return reports;
    }
    async getBasedOnDate(startdate, enddate) {
        const reports = await this.reportService.findBasedOnDate(startdate, enddate);
        if (reports.length == 0) {
            throw new common_1.HttpException('Report not found', common_1.HttpStatus.NO_CONTENT);
        }
        return reports;
    }
    async findByKey(key) {
        try {
            return await database_1.MyDatabase.findByKey(key, 'Reports', 'report doesnt exist');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد گزارش',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_entity_1.ReportEntity]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'حذف گزارش',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "removeReport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'یافتن همه گزارشات',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getAllReports", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('find/Date'),
    (0, swagger_1.ApiOperation)({
        summary: 'یافتن گزارشات بر اساس تاریخ',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startdate',
        example: '2000-12-02',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'enddate',
        example: '2003-12-02',
    }),
    __param(0, (0, common_1.Query)('startdate')),
    __param(1, (0, common_1.Query)('enddate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getBasedOnDate", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({
        summary: 'یافتن گزارشات بر اساس کلید',
    }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findByKey", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('report'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map