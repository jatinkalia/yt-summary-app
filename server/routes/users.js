const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers } = require('../controllers/userController');

router.get('/', protect, admin, getUsers);

module.exports = router;