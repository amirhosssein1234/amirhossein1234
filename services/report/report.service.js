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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const arangojs_1 = require("arangojs");
const nest_arango_1 = require("nest-arango");
const database_1 = require("../../database/database");
const report_entity_1 = require("../../entities/report/report.entity");
let ReportService = class ReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async create(report) {
        report.date = new Date();
        await this.reportRepository.save(report);
        return { result: 'the report is created' };
    }
    async remove(report_key) {
        const deletedDocument = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      FOR report IN Reports
      FILTER report._key == ${report_key}
      REMOVE report IN Reports
      RETURN OLD
      `);
        const Deleted = deletedDocument.all();
        if ((await Deleted).length > 0) {
            return Deleted;
        }
        else {
            throw new Error('Report not found');
        }
    }
    async findAll() {
        return await this.reportRepository.findAll();
    }
    async findBasedOnDate(startDate, endDate) {
        const cursor = await database_1.MyDatabase.getDb().query((0, arangojs_1.aql) `
      LET startdate = DATE_TIMESTAMP(${startDate})
      LET enddate = DATE_TIMESTAMP(${endDate})
      FOR report in Reports
      FILTER DATE_DIFF(report.date, startdate, "d") <= 0
      FILTER DATE_DIFF(report.date, enddate, "d") >= 0
      RETURN report
      `);
        return cursor.all();
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_arango_1.InjectRepository)(report_entity_1.ReportEntity)),
    __metadata("design:paramtypes", [nest_arango_1.ArangoRepository])
], ReportService);
//# sourceMappingURL=report.service.js.map