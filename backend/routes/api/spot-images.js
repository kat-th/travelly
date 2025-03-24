const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const spotImageToDelete = await SpotImage.findByPk(imageId);

    const spotId = spotImageToDelete.spotId;
    const spot = await Spot.findByPk(spotId);
    const ownerId = spot.ownerId;

    if (!spotImageToDelete)
        return res.status(404).json({ message: "Spot Image couldn't be found" });

    if (req.user.id !== ownerId) return res.status(403).json({ message: 'Forbidden' });

    await spotImageToDelete.destroy();
    res.status(200).json({
        message: 'Successfully deleted',
    });
});

module.exports = router;
