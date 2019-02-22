/*let data = [{
  item: 'get milk'
}, {
  item: 'walk dog'
}, {
  item: 'eat potatos'
}];*/
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({
  extended: false
});
let mongoose = require('mongoose');

//Connect to the data base
mongoose.connect('mongodb://test:test@todo-shard-00-00-mtkwl.mongodb.net:27017,todo-shard-00-01-mtkwl.mongodb.net:27017,todo-shard-00-02-mtkwl.mongodb.net:27017/test?ssl=true&replicaSet=todo-shard-0&authSource=admin&retryWrites=true');

//Create a schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = (app) => {
  //get data from mongodb and pass it to the view
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data)=>{
      if (err) throw err;
      res.render('todo', {
        todos: data
      });
    })
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    //get data from the view and add it to mongoDB
    let newTodo = Todo(req.body).save((err, data)=>{
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', (req, res) => {
    //delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data)=>{
      if (err) throw err;
      res.json(data);
    })
  });
};
