import express from 'express';
import Task from '../models/Task';
import { taskSchema, taskUpdateSchema } from '../schemas/task';
import { validate } from '../middleware/validation';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// get all tasks for authenticated user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const tasks = await Task.find({ user: req.user!._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error: any) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// create new task
router.post('/', authenticateToken, validate(taskSchema), async (req: AuthRequest, res) => {
    try {
        const { title, description, status } = req.body;

        const task = new Task({
            title,
            description,
            status,
            user: req.user!._id
        });

        await task.save();

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error: any) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// update Task
router.put('/:id', authenticateToken, validate(taskUpdateSchema), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        // Find task and verify ownership
        const task = await Task.findOne({ _id: id, user: req.user!._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();

        res.json({
            message: 'Task updated successfully',
            task
        });
    } catch (error: any) {
        console.error('Update task error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

// delete task
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        // Find task and verify ownership
        const task = await Task.findOneAndDelete({ _id: id, user: req.user!._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
        console.error('Delete task error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;