const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // Methods : get, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

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

    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
}

module.exports = new CourseController();
