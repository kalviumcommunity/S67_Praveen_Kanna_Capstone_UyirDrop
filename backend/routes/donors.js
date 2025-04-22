import express from 'express';
import auth from '../middleware/auth.js';
import Donor from '../models/Donor.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const donor = new Donor({
            ...req.body,
            userId: req.user._id
        });
        await donor.save();
        res.status(201).json(donor);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});


router.get('/', async (req, res) => {
    try {
        const donors = await Donor.find({ isAvailable: true })

            .populate('userId', 'name email');
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/my-profile', auth, async (req, res) => {
    try {
        const donor = await Donor.findOne({ userId: req.user._id });
        if (!donor) {
            return res.status(404).json({ message: 'Donor profile not found.' });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/availability', auth, async (req, res) => {
    try {
        const donor = await Donor.findOne({ userId: req.user._id });
        if (!donor) {
            return res.status(404).json({ message: 'Donor profile not found.' });
        }
        donor.isAvailable = req.body.isAvailable;
        await donor.save();
        res.json(donor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router; 