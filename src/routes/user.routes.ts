import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

interface UserRequest extends Request {
    body: Partial<User>;
}

export default function userRoutes(userService: UserService): Router {
    const router = Router();

    // Get all users
    router.get('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    });

    // Get user by ID
    router.get('/:id', async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await userService.getUserById(Number(req.params.id));
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    });

    // Create new user
    router.post('/', async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error && error.message === 'User with this email already exists') {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Error creating user', error });
        }
    });

    // Update user
    router.put('/:id', async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const [affectedCount, affectedRows] = await userService.updateUser(Number(req.params.id), req.body);
            if (affectedCount === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(affectedRows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    });

    // Delete user
    router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedCount = await userService.deleteUser(Number(req.params.id));
            if (deletedCount === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    });

    return router;
} 