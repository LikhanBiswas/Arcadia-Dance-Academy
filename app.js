const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
port = 8084;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use(express.static('static'))
app.use('/static', express.static('static')) //for serving static file
app.use(express.urlencoded())




//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {} 
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    
    const params = {} 
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})

app.get('/services', (req, res) => {
    const params = {}; // You can pass dynamic data here if needed
    res.status(200).render('services.pug', params);
});

app.get('/class', (req, res) => {
    const params = {}; // You can pass dynamic data here if needed
    res.status(200).render('classInfo.pug', params);
});
app.get('/about', (req, res) => {
    const params = {}; // You can pass dynamic data here if needed
    res.status(200).render('about.pug', params);
});


//START THER SERVER
app.listen(port,()=>{
    console.log(`this application started successfully on ${port}`);
});