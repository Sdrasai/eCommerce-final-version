const { ProfileService } = require('../services');
const profileService = new ProfileService();

async function showProfile(req, res){ //more fields needed: Order History!
    const profile = await profileService.getProfileByUserId(req.user.userId);
    res.status(200).send(profile);
}

async function updateProfile(req, res){ //image update is not yet implemented!
    const fieldsForUpdate = {...req.body};
    const updatedProfile = await profileService.updateProfileByUserId(req.user.userId, fieldsForUpdate);
    res.status(201).send(updatedProfile);
}

module.exports = {
    showProfile,
    updateProfile
}