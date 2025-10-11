import express from 'express';
import User from '../models/User';
import { registerSchema, loginSchema } from '../schemas/auth';
import { validate } from '../middleware/validation';
import { generateToken } from '../middleware/auth';

const router = express.Router();

// register
router.post('/register', validate(registerSchema), async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        // check If user already exist
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // create new user
        const user = new User({ username, password });
        await user.save();

        // generate the token
        const token = generateToken((user._id as string).toString());

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// login
router.post('/login', validate(loginSchema), async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username }) as typeof User.prototype & { _id: any, comparePassword: (password: string) => Promise<boolean> };
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken((user._id as string).toString());

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;