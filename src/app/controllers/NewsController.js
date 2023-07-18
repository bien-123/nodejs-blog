class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news'); //trả về trang news
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('Hello');
    }
}

module.exports = new NewsController();
