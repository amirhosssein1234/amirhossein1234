import { ArangoRepository, ResultList } from 'nest-arango';
import { ReportEntity } from 'src/entities/report/report.entity';
export declare class ReportService {
    private readonly reportRepository;
    constructor(reportRepository: ArangoRepository<ReportEntity>);
    create(report: ReportEntity): Promise<object>;
    remove(report_key: string): Promise<object>;
    findAll(): Promise<ResultList<ReportEntity>>;
    findBasedOnDate(startDate: string, endDate: string): Promise<any[]>;
}
