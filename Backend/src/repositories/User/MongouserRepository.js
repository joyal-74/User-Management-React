import User from '../../models/userSchema.js';
import { UserRepository } from './UserRepository.js';

export class MongoUserRepository extends UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            User.find().skip(skip).limit(limit),
            User.countDocuments()
        ]);

        return {
            users,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }

    async findByIdAndDelete(id) {
        return await User.findByIdAndDelete(id);
    }
}
