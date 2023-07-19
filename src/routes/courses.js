const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file CourseController
const courseController = require('../app/controllers/CourseController');

// courseController.index
router.get('/:slug', courseController.show);

module.exports = router;
