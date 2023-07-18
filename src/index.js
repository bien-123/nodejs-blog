const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes/index'); //gọi đến file index

// static files
app.use(express.static(path.join(__dirname, 'public'))); //trỏ đến folder public

// Sử dụng middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //xử lý với dữ liệu từ form gửi lên
app.use(express.json()); // xử lý dạng dữ liệu từ code js gửi lên

// HTTP logger: hiển thị log cho dễ xét lỗi
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', //khi đặt tên đuôi chỉ cần để là hbs thay vì handlebars
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Router init
route(app);

// Connect với port và hiển thị đường dẫn dự án
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
