export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    findByEmail?(email: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<[number, T[]]>;
    delete(id: number): Promise<number>;
} 