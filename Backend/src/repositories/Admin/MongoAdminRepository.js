import Admin from '../../models/adminSchema.js';
import { AdminRepository } from './AdminRepository.js';

export class MongoAdminRepository extends AdminRepository {
    async findByEmail(email) {
        return await Admin.findOne(email);
    }

    async findById(id) {
        return await Admin.findById(id);
    }

    async findAll(id) {
        return await Admin.findById(id);
    }
}
