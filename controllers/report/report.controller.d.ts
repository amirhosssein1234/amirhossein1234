import { ReportEntity } from 'src/entities/report/report.entity';
import { ReportService } from 'src/services/report/report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    createReport(report: ReportEntity): Promise<object>;
    removeReport(key: string): Promise<object>;
    getAllReports(): Promise<import("nest-arango").ResultList<ReportEntity>>;
    getBasedOnDate(startdate: string, enddate: string): Promise<ReportEntity[]>;
    findByKey(key: string): Promise<any[]>;
}
