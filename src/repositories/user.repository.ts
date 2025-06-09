import { User } from '../models/user.model';
import { Database, DatabaseModel } from '../interfaces/database.interface';
import { Repository } from '../interfaces/repository.interface';

export class UserRepository implements Repository<User> {
    private userModel: DatabaseModel<User>;

    constructor(database: Database) {
        this.userModel = database.getModel<User>('User');
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ 
            where: { email },
            attributes: { include: ['password'] }
        });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = await this.userModel.create(userData);
        return user.toJSON() as User;
    }

    async update(id: number, userData: Partial<User>): Promise<[number, User[]]> {
        const [affectedCount, affectedRows] = await this.userModel.update(userData, {
            where: { id },
            returning: true
        });
        
        const sanitizedRows = affectedRows.map(user => user.toJSON() as User);
        return [affectedCount, sanitizedRows];
    }

    async delete(id: number): Promise<number> {
        return this.userModel.destroy({ where: { id } });
    }
} 