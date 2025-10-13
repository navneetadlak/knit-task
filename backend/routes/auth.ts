import express from 'express';
import User from '../models/User';
import { registerSchema, loginSchema } from '../schemas/auth';
import { validate } from '../middleware/validation';
import { generateToken } from '../middleware/auth';

const router = express.Router();

// routes/auth.ts
router.post('/register', validate(registerSchema), async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user with email field to satisfy the index
        const user = new User({ 
            username, 
            password,
            email: `${username}@example.com` // Temporary fix
        });
        
        await user.save();

        // Generate token
        const token = generateToken(user._id.toString());

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Registration error details:', error);
        
        // More specific error handling
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'Username already exists or database conflict',
                details: 'Please try a different username'
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
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