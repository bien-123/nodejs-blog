//fix lỗi bảo mật của handlebars version 4.6 trở lên

module.exports = {
    // xử lý nhiều phần tử
    mutipleMongooseToObject: function (mongoosesArray) {
        return mongoosesArray.map((mongooseArray) => mongooseArray.toObject());
    },
    // xử lý 1 phần tử
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
