// chứa những controller ở ngoài

const Course = require('../models/Course');

class SidesController {
    // [GET] /
    home(req, res) {
        // Lấy dữ liệu từ DB
        Course.find({}, function (err, courses) {
            // nếu ko có lỗi thì trả về dữ liệu dạng json
            if (!err) {
                res.json(courses);
            } else {
                // nếu có lỗi thì trả về status 400 và thông báo lỗi
                res.status(400).json({ error: 'ERROR!!!' });
            }
        });
        // res.render('home'); // gọi đến trang home.hbs bên view
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SidesController();
