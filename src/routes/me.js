const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file CourseController
const meController = require('../app/controllers/MeController');

// meController.index
router.get('/stored/courses', meController.storedCourses);

module.exports = router;
