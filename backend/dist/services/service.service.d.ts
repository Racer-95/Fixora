import type { IServiceDocument } from "../models/service.model.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "../types/dto.types.js";
declare class ServiceOfferingService {
    /** Provider: createService() */
    create(providerId: string, data: CreateServiceDTO): Promise<IServiceDocument>;
    /** Customer: searchService(type) — search by category or keyword */
    search(query: string): Promise<IServiceDocument[]>;
    /** Get all services by a provider */
    getByProvider(providerId: string): Promise<IServiceDocument[]>;
    /** Provider: updateService() */
    update(providerId: string, serviceId: string, data: UpdateServiceDTO): Promise<IServiceDocument>;
    /** Provider: deleteService() */
    delete(providerId: string, serviceId: string): Promise<void>;
}
export declare const serviceOfferingService: ServiceOfferingService;
export {};
//# sourceMappingURL=service.service.d.ts.map