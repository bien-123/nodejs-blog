const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const { response } = require('express');
const bcrypt = require('bcrypt');

var session;

class UserController {
    // Showing home page
    show(req, res, next) {
        res.render('user/user');
    }

    login(req, res, next) {
        res.render('user/login');
    }

    async store(req, res) {
        try {
            // check if the user exists
            const user = await User.findOne({ username: req.body.username });
            console.log(user);
            if (user) {
                //check if password matches
                const result = req.body.password === user.password;
                if (result) {
                    // res.send('login success');
                    const role = user.role;
                    if (role == 'ADMIN') {
                        // res.send('Xin chào ADMIN');
                        // res.locals.loggedUser = user;

                        session = req.session;
                        session.userid = req.body.username;
                        console.log(session.userid);

                        // res.render('home', {
                        //     message: mongooseToObject(user),
                        // });

                        // const user1 = await session.userid;
                        // res.locals.loggedUser = user1;

                        // console.log(res.locals.loggedUser);
                        res.redirect('/sites');
                        // next();

                        // console.log(session.userid);
                        // res.redirect('/sites', {
                        //     message: session.userid,
                        // });
                        // next();
                    } else if (role == 'STAFF') {
                        res.send('Xin chào STAFF');
                    } else {
                        res.send('Xin chào USER');
                    }
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    signup(req, res) {
        res.render('user/register');
    }

    async register(req, res) {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        });

        return res.status(200).json(user);
    }
}
module.exports = new UserController();
