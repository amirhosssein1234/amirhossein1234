import { ArangoDocument } from 'nest-arango';
export declare class ReportEntity extends ArangoDocument {
    title: string;
    content: string[];
    date: Date;
}
