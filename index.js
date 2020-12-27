const express = require('express')
const app = express()
const path = require('path');
const sass = require('node-sass-middleware');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, `draw.txt`)
    }
})
const upload = multer({
    storage: storage
})

app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'pug');
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}));
app.use('/', express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));

app.get('/', (req, res) => {
    res.render('index');
})
app.post('/', upload.single('txtFile'), (req, res) => {
    fs.readFile('./public/draw.txt', function (err, f) {
        var array = f.toString().split('\n');
        Array.prototype.random = function () {
            return this[Math.floor((Math.random() * this.length))];
        }
        res.render('final', {
            array,
            winner: array.random()
        });
    });



})

app.listen(3010, () => {
    console.log(`listening at http://localhost:3010`)
})