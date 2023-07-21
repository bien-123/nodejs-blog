const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const { handlebars } = require('express-handlebars');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes/index'); //gọi đến file index
const db = require('./config/db');

// Connect to DB
db.connect();

// static files
app.use(express.static(path.join(__dirname, 'public'))); //trỏ đến folder public

// Sử dụng middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //xử lý với dữ liệu từ form gửi lên

// xử lý dạng dữ liệu từ code js gửi lên
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middlewares
app.use(SortMiddleware);

// HTTP logger: hiển thị thông tin chương trình
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs', //khi đặt tên đuôi chỉ cần để là hbs thay vì handlebars
        helpers: {
            sum: (a, b) => a + b, //hiển thị id +1
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href='?_sort&column=${field}&type=${type}'>
                    <span class="${icon}"></span>
                    </a>`
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //trỏ đến folder resources/views

// Router init
route(app);

// Connect với port và hiển thị đường dẫn dự án
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
