const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { validateUserById, validateUpdateUserInfo } = require('../middlewares/validation');

router.get('/me', getCurrentUser, validateUserById);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
