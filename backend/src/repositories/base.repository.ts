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
import { Model, Document, Types } from "mongoose";

// ── Own filter/update aliases (avoid mongoose named-type imports) ──
// Mongoose's Model methods accept plain objects for filter/update.
// We use a flexible Record shape — concrete repos still stay typed.
type Filter  = Record<string, unknown>;
type Update  = Record<string, unknown>;

// ── 1. Repository Contract ────────────────────
export interface IRepository<T extends Document> {
  findById(id: string): Promise<T | null>;
  findOne(filter: Filter): Promise<T | null>;
  findMany(filter?: Filter): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, data: Update): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  exists(filter: Filter): Promise<boolean>;
}

// ── 2. Generic Mongoose Implementation ────────
export class BaseRepository<T extends Document> implements IRepository<T> {
  // Protected so sub-classes can run custom queries
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec();
  }

  async findOne(filter: Filter): Promise<T | null> {
    return this.model.findOne(filter as any).exec();
  }

  async findMany(filter: Filter = {}): Promise<T[]> {
    return this.model.find(filter as any).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return doc.save() as Promise<T>;
  }

  async updateById(id: string, data: Update): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model
      .findByIdAndUpdate(id, data as any, { new: true, runValidators: true })
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async exists(filter: Filter): Promise<boolean> {
    const count = await this.model.countDocuments(filter as any).exec();
    return count > 0;
  }
}
