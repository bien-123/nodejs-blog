const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

// static files
app.use(express.static(path.join(__dirname,'public')));//trỏ đến folder public


// Sử dụng middleware
app.use(express.urlencoded({
    extended: true
})); //xử lý với dữ liệu từ form gửi lên
app.use(express.json()); // xử lý dạng dữ liệu từ code js gửi lên


// HTTP logger: hiển thị log cho dễ xét lỗi
// app.use(morgan('combined'));


// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs' //khi đặt tên đuôi chỉ cần để là hbs thay vì handlebars
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// Router
app.get('/', (req, res) => { //req: request, res: response
    res.render('home'); // link đến file home.hbs
})

app.get('/news', (req, res) => {
    res.render('news'); // link đến file news.hbs
})

app.get('/search', (req, res) => {
    // console.log(req.query.q)
    res.render('search'); // link đến file search.hbs
})

app.post('/search', (req, res) => {
    // console.log(req.query.q): Query parameters thì là .query
    console.log(req.body);// Form default thì là .body
    // res.send('search');
    res.send(''); // link đến file search.hbs
})

// Connect với port và hiển thị đường dẫn dự án
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));