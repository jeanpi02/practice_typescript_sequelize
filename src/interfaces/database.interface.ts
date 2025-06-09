export interface DatabaseModel<T> {
    findAll(): Promise<T[]>;
    findByPk(id: number): Promise<T | null>;
    findOne(options: any): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(data: Partial<T>, options: any): Promise<[number, T[]]>;
    destroy(options: any): Promise<number>;
}

export interface Database {
    getModel<T>(modelName: string): DatabaseModel<T>;
} 