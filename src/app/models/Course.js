const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

// Schema: phải có field trong column ở table thì mới thêm đc
const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        video: { type: String, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true }, //unique: true: chỉ có duy nhất 1 giá trị
        // createdAt: { type: Date, default: Date.now }, //từ version 4. trở lên mongose tự tạo nếu thêm timestamps: true
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement, 'Course');
// CourseSchema.plugin(autoIncrement.plugin, 'Course');
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true, // thêm khoảng thời gian xóa vào fields deletedAt
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
