import express from 'express';
import auth from '../middleware/auth.js';
import Request from '../models/Request.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const request = new Request({
            ...req.body,
            userId: req.user._id
        });
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const requests = await Request.find({ status: 'pending' })
            .populate('userId', 'name email')
            .sort({ urgency: -1, createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/my-requests', auth, async (req, res) => {
    try {
        const requests = await Request.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/status', auth, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        if (request.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        request.status = req.body.status;
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        if (request.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(request, req.body);
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default routerfor;
