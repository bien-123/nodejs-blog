// file này để quản lý tất cả các route
const newsRouter = require('./news'); // lấy dữ liệu từ file news.js
const sitesRouter = require('./site'); // lấy dữ liệu từ file news.js
const coursesRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./user');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/sites', sitesRouter);
    app.use('/', userRouter);

    // app.get('/search', (req, res) => {
    //     // console.log(req.query.q)
    //     res.render('search'); // link đến file search.hbs
    // })

    // app.post('/search', (req, res) => {
    //     // console.log(req.query.q): Query parameters thì là .query
    //     console.log(req.body);// Form default thì là .body
    //     // res.send('search');
    //     res.send(''); // link đến file search.hbs
    // })
}

module.exports = route; //export function để có thể lấy đc dữ liệu
