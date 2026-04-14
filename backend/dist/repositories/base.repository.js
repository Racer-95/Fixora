// ─────────────────────────────────────────────
//  FIXORA — Generic Repository Interface + Base Implementation
//
//  PATTERN: Repository Pattern
//  PURPOSE: Decouples business logic from data access.
//           ServiceLayer calls IRepository<T> — it never
//           touches Mongoose directly. Only repositories do.
//
//  This file defines:
//    1. IRepository<T>    — the contract (interface)
//    2. BaseRepository<T> — generic Mongoose implementation
// ─────────────────────────────────────────────
import { Types } from "mongoose";
// ── 2. Generic Mongoose Implementation ────────
export class BaseRepository {
    // Protected so sub-classes can run custom queries
    model;
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        if (!Types.ObjectId.isValid(id))
            return null;
        return this.model.findById(id).exec();
    }
    async findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async findMany(filter = {}) {
        return this.model.find(filter).exec();
    }
    async create(data) {
        const doc = new this.model(data);
        return doc.save();
    }
    async updateById(id, data) {
        if (!Types.ObjectId.isValid(id))
            return null;
        return this.model
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .exec();
    }
    async deleteById(id) {
        if (!Types.ObjectId.isValid(id))
            return false;
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
    async exists(filter) {
        const count = await this.model.countDocuments(filter).exec();
        return count > 0;
    }
}
//# sourceMappingURL=base.repository.js.map