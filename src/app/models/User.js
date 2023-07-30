const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

//hashing a password before saving it to the database
// User.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
