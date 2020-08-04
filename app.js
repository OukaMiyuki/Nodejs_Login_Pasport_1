const mongoose = require('mongoose');
const db = require('./Config/keys').MongoUrl;
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', require('./Routes/index'));
app.use('/users', require('./Routes/users'));

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});