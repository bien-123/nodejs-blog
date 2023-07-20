const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

// Schema: phải có field trong column ở table thì mới thêm đc
const Course = new Schema(
    {
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
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true, // thêm khoảng thời gian xóa vào fields deletedAt
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
