const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env];
const routerUser = require('./routes/users');
const routerTeam = require('./routes/teams');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.json());
app.use(urlencodedParser);
app.use(routerUser);
app.use(routerTeam);

app.get('/', (req, res) => {
    res.json({message: 'success', status:200})
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

