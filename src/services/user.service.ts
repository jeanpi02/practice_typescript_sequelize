import { User } from '../models/user.model';
import { Repository } from '../interfaces/repository.interface';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async createUser(userData: Partial<User>): Promise<User> {
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }
        
        const existingUser = await this.userRepository.findByEmail!(userData.email!);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        return this.userRepository.create(userData);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<[number, User[]]> {
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }
        
        return this.userRepository.update(id, userData);
    }

    async deleteUser(id: number): Promise<number> {
        return this.userRepository.delete(id);
    }
} 