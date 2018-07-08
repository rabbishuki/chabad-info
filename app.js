const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config.json')
const index = require('./routes/index');

let app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/assets/images/', 'truma-ico.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'public/dist'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// DEBUG
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.server = http.createServer(app);
app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Server is up and listenning on port ${app.server.address().port} at ${new Date()}`)
});