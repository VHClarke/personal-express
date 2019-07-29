//need two PUTs to update the thumbs down
//clicks have to be server side!!
//be aware of the difference between client-side and server-side

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Dummyexpress:Hello123@cluster0-tgucb.gcp.mongodb.net/test?retryWrites=true&w=majority"; //mongo atlas url
const dbName = "personal-express";

app.listen(7000, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs') //says what templating language to use
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) //client-side code

// messages (aka items)
app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages:result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({message: req.body.msg,funds:req.body.fnd,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/changeColor', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      color:"pink"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/messages', (req, res) => {-
  db.collection('messages').findOneAndDelete({funds:req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
