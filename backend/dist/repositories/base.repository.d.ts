import { Model, Document } from "mongoose";
type Filter = Record<string, unknown>;
type Update = Record<string, unknown>;
export interface IRepository<T extends Document> {
    findById(id: string): Promise<T | null>;
    findOne(filter: Filter): Promise<T | null>;
    findMany(filter?: Filter): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    updateById(id: string, data: Update): Promise<T | null>;
    deleteById(id: string): Promise<boolean>;
    exists(filter: Filter): Promise<boolean>;
}
export declare class BaseRepository<T extends Document> implements IRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findById(id: string): Promise<T | null>;
    findOne(filter: Filter): Promise<T | null>;
    findMany(filter?: Filter): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    updateById(id: string, data: Update): Promise<T | null>;
    deleteById(id: string): Promise<boolean>;
    exists(filter: Filter): Promise<boolean>;
}
export {};
//# sourceMappingURL=base.repository.d.ts.map