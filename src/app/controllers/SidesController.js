// chứa những controller ở ngoài

const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SidesController {
    // [GET] /
    home(req, res) {
        // Lấy dữ liệu từ DB theo callback
        // Course.find({}, function (err, courses, next) {
        //     // nếu ko có lỗi thì trả về dữ liệu dạng json
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         // nếu có lỗi thì trả về status 400 và thông báo lỗi
        //         // res.status(400).json({ error: 'ERROR!!!' });

        //         next(err); //lỗi đc hiển thị ở 1 chỗ cho dễ xử lý
        //     }
        // });

        // Lấy dữ liệu theo promise
        Course.find({})
            //lấy dữ liệu từ DB render ra trang home
            .then((courses) => {
                //truyền dữ liệu courses sang trang home
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));

        // res.render('home'); // gọi đến trang home.hbs bên view
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SidesController();
