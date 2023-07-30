const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file CourseController
const courseController = require('../app/controllers/CourseController');

// courseController.index
// Create a new Course
router.get('/create', courseController.create);
router.post('/store', courseController.store);

router.post('/handle-form-actions', courseController.handleFormActions);

// Update a Course
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);

// Delete a Course
router.delete('/:id', courseController.destroy);

// DELETE SOFT
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);

// Show course
router.get('/:slug', courseController.show);

// Search
router.get('/search/:name', courseController.search)

module.exports = router;
