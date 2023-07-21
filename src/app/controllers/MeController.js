const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // Promise.all([Course.find({}), Course.countDocumentsDeleted({deleted: true})])
        //     .then(([courses, deleteCount]) =>
        //         res.render('me/stored-courses', {
        //             deleteCount,
        //             courses: mutipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //         console.log(deleteCount);
        //     })
        //     .catch(() => {});

        // SORT Course
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);

        // GET list khóa học
        // Course.find({}) // { deletedAt: null }: lấy DL có fields deletedAt: null
        //     .then((courses) =>
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);
        //res.render('me/stored-courses');
    }

    // [GET] /me/trash/courses :Delete soft
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
