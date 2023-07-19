const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /course/create : tạo ra UI cho form tạo mới
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /course/store : thêm dữ liệu từ form tạo mới lên DB
    store(req, res, next) {
        // res.json(req.body.name);//dùng để login

        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.video}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/')) //thêm xong sẽ chuyển hướng về trang
            .catch((error) => {});
    }
}

module.exports = new CourseController();
