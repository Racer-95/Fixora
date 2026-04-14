// ─────────────────────────────────────────────
//  FIXORA — Service (Offering) Service
//
//  PATTERN: Service Layer
//  Implements Provider UML methods:
//    createService(), updateService(), deleteService()
//  Implements Customer UML method:
//    searchService(type)
// ─────────────────────────────────────────────
import { serviceRepository } from "../repositories/service.repository.js";
import type { IServiceDocument } from "../models/service.model.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "../types/dto.types.js";

class ServiceOfferingService {

  /** Provider: createService() */
  async create(providerId: string, data: CreateServiceDTO): Promise<IServiceDocument> {
    return serviceRepository.create({
      providerId,
      name:      data.name,
      category:  data.category,
      basePrice: data.basePrice,
      location: {
        latitude:  data.latitude,
        longitude: data.longitude,
      },
    } as any);
  }

  /** Customer: searchService(type) — search by category or keyword */
  async search(query: string): Promise<IServiceDocument[]> {
    return serviceRepository.search(query);
  }

  /** Get all services by a provider */
  async getByProvider(providerId: string): Promise<IServiceDocument[]> {
    return serviceRepository.findByProvider(providerId);
  }

  /** Provider: updateService() */
  async update(
    providerId: string,
    serviceId:  string,
    data:       UpdateServiceDTO
  ): Promise<IServiceDocument> {
    const service = await serviceRepository.findById(serviceId);
    if (!service) throw new Error("Service not found.");
    if (service.providerId.toString() !== providerId) throw new Error("Unauthorized.");

    const updatePayload: Record<string, unknown> = {};
    if (data.name)      updatePayload.name      = data.name;
    if (data.category)  updatePayload.category  = data.category;
    if (data.basePrice) updatePayload.basePrice  = data.basePrice;
    if (data.latitude !== undefined && data.longitude !== undefined) {
      updatePayload.location = { latitude: data.latitude, longitude: data.longitude };
    }

    const updated = await serviceRepository.updateById(serviceId, updatePayload);
    return updated!;
  }

  /** Provider: deleteService() */
  async delete(providerId: string, serviceId: string): Promise<void> {
    const service = await serviceRepository.findById(serviceId);
    if (!service) throw new Error("Service not found.");
    if (service.providerId.toString() !== providerId) throw new Error("Unauthorized.");
    await serviceRepository.deleteById(serviceId);
  }
}

// Singleton export
export const serviceOfferingService = new ServiceOfferingService();
