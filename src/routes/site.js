const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file NewsController
const sidesController = require('../app/controllers/SidesController');

// sidesController.index
router.use('/search', sidesController.search);
router.use('/', sidesController.home); // gọi đến function index

module.exports = router;
