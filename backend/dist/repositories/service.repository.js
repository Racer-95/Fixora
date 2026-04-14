// ─────────────────────────────────────────────
//  FIXORA — Service Repository
//  Extends BaseRepository with service-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { Service } from "../models/service.model.js";
class ServiceRepository extends BaseRepository {
    constructor() {
        super(Service);
    }
    /** Search services by category (Customer.searchService) */
    async findByCategory(category) {
        return this.model
            .find({ category: new RegExp(category, "i") })
            .populate("providerId", "name rating availability")
            .exec();
    }
    /** Get all services by a specific provider */
    async findByProvider(providerId) {
        return this.model.find({ providerId }).exec();
    }
    /** Full-text search on name or category */
    async search(query) {
        return this.model
            .find({
            $or: [
                { name: new RegExp(query, "i") },
                { category: new RegExp(query, "i") },
            ],
        })
            .populate("providerId", "name rating availability")
            .exec();
    }
}
// Singleton export
export const serviceRepository = new ServiceRepository();
//# sourceMappingURL=service.repository.js.map