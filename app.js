let express = require('express');
let todoController = require('./controllers/todocontroller');

let app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use('/assets', express.static('assets'));

//fire controllers
todoController(app);

//listen to ports
app.listen(3000);
console.log('You are listening to port 3000');
