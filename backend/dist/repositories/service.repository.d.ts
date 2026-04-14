import { BaseRepository } from "./base.repository.js";
import { IServiceDocument } from "../models/service.model.js";
declare class ServiceRepository extends BaseRepository<IServiceDocument> {
    constructor();
    /** Search services by category (Customer.searchService) */
    findByCategory(category: string): Promise<IServiceDocument[]>;
    /** Get all services by a specific provider */
    findByProvider(providerId: string): Promise<IServiceDocument[]>;
    /** Full-text search on name or category */
    search(query: string): Promise<IServiceDocument[]>;
}
export declare const serviceRepository: ServiceRepository;
export {};
//# sourceMappingURL=service.repository.d.ts.map