const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file NewsController
const newsController = require('../app/controllers/NewsController');

// newsController.index
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

// router.use('/', newsController.index); // gọi đến function index

module.exports = router;
