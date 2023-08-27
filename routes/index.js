const express = require('express');
const router = express.Router();

router.use('/users', require('../modules/users/user.controller'));
router.use('/task', require('../modules/task/task.controller'));

module.exports = router;