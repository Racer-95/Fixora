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
class ServiceOfferingService {
    /** Provider: createService() */
    async create(providerId, data) {
        return serviceRepository.create({
            providerId,
            name: data.name,
            category: data.category,
            basePrice: data.basePrice,
            city: data.city,
        });
    }
    /** Customer: searchService(type) — search by category or keyword */
    async search(query) {
        return serviceRepository.search(query);
    }
    /** Get all services by a provider */
    async getByProvider(providerId) {
        return serviceRepository.findByProvider(providerId);
    }
    /** Provider: updateService() */
    async update(providerId, serviceId, data) {
        const service = await serviceRepository.findById(serviceId);
        if (!service)
            throw new Error("Service not found.");
        if (service.providerId.toString() !== providerId)
            throw new Error("Unauthorized.");
        const updatePayload = {};
        if (data.name)
            updatePayload.name = data.name;
        if (data.category)
            updatePayload.category = data.category;
        if (data.basePrice)
            updatePayload.basePrice = data.basePrice;
        if (data.city)
            updatePayload.city = data.city;
        const updated = await serviceRepository.updateById(serviceId, updatePayload);
        return updated;
    }
    /** Provider: deleteService() */
    async delete(providerId, serviceId) {
        const service = await serviceRepository.findById(serviceId);
        if (!service)
            throw new Error("Service not found.");
        if (service.providerId.toString() !== providerId)
            throw new Error("Unauthorized.");
        await serviceRepository.deleteById(serviceId);
    }
}
// Singleton export
export const serviceOfferingService = new ServiceOfferingService();
//# sourceMappingURL=service.service.js.map