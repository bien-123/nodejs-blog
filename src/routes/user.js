const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file UserController
const UserController = require('../app/controllers/UserController');

// user page
router.get('/home', UserController.show);

router.get('/', UserController.login);
router.post('/store', UserController.store);

router.get('/signup', UserController.signup);
router.post('/register', UserController.register);

module.exports = router;
