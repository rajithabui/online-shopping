console.log('starting my node');

//creating express
const express = require('express');
const app = express()

//accessible to the public by using a built-in middleware called express.static
app.use(express.static('public'))

//setting the view engine in express to ejs
app.set('view engine','ejs')

//adding middleware is body-parser
const bodyParser = require('body-parser')
//The urlencoded tells body-parser to extract data from the <form> element and add them to the body property in the request object
app.use(bodyParser.urlencoded({extend:true}))

//The code is updated to use the newer method hereter
let db
//connecting to mongodb
const MongoClient = require('mongodb').MongoClient
//used to return the database directly
MongoClient.connect('mongodb://onlineproducts1:onlineproducts1@ds243963.mlab.com:43963/shoppingdb',
    {useNewUrlParser: true}, (err,client)=>{
        if (err) return console.log(err)
        db = client.db('shoppingdb') // whatever your database name is
        //app.listen(3005, () => {console.log('listening on 3005')
        // })

    })




//creating server to connect with browser using listen
app.listen(3000,function () {
    console.log('listening on port 3000')
})

//creating CRUD operations
//to handle get request with GET
// app.get('/',function (request,response) {
//     response.send('Welcome online-shopping')
// })
//using arrow function and send file

//to read JSON data by using the bodyparser.json() middleware
app.use(bodyParser.json())
//CORS
app.use(function (req,res,next) {
    console.log('I am in http header');
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Accept');
    res.setHeader('Content-Type','text/html');
    
    if (req.method === "OPTIONS")
        res.send(200)
    else
        next();
})


// creating GET method for Products page
app.get('/productspage',(req,res)=>{
    //to get the data from db and displaying from db collection we are using find()
     db.collection('productsdb').find().toArray(function (err,results) {
        console.log(results)
         if(err) return console.log(err)
         res.render('products.ejs',{product: results})
    })
      res.sendFile(__dirname + '/index.html')

})

//creating GET method for USERs page
app.get('/',(req,res)=>{
    //to get the data from db and displaying from db collection we are using find()
    db.collection('users-table').find().toArray(function (err,results) {
        console.log(results)
        if(err) return console.log(err)
        res.render('index.ejs',{user: results})
    })
    // res.sendFile(__dirname + '/index.html')

})

// creating CREATE/POST method products page
app.post('/productspage',(req,res) =>{

    //to get data on db
    db.collection('productsdb').save(req.body,(err,result)=>{
        if(err) return console.log(err)
        console.log('saved to database')
        res.redirect('/productspage')
    })
})

// creating CREATE/POST method USers page
app.post('/user',(req,res) =>{

    //to get data on db
    db.collection('users-table').save(req.body,(err,result)=>{
        if(err) return console.log(err)
        console.log('saved to database')
        // res.redirect('/')
        res.send(req.body)

    })
})

//creating PUT method
// app.put('/productspage', (req, res) => {
//     // Handle put request and to update data in db
//     console.log('in put API');
//     console.log(req.body.pname);
//     console.log(req.body.pid);
//
//     db.collection('productsdb')
//         .findOneAndUpdate({pname: 'eggs'}, {
//             $set: {
//                 pname: req.body.pname,
//                 pid: req.body.pid
//             }
//         }, {
//             sort: {_id: -1},
//             upsert: true
//         }, (err, result) => {
//             if (err) return res.send(err)
//             console.log(result)
//             res.send(result)
//         })
// })

app.put('/user', (req, res) => {
    // Handle put request and to update data in db
    console.log('in put API');
    console.log(req.body.name);
    console.log(req.body.password);

    db.collection('users-table')
        .findOneAndUpdate({name: 'rajitha'}, {
            $set: {
                name: req.body.name,
                // password: req.body.password
            }
        }, {
            sort: {_id: -1},
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err)
            console.log(result)
            res.send(result)
        })
})

//creating DELETE method
// app.delete('/productspage', (req, res) => {
//     // Handle DELETE request and to update data in db
//     console.log('in Delete API');
//     console.log(req.body.pname);
//     console.log(req.body.pid);
//
//     db.collection('productsdb')
//         .findOneAndDelete({pname: req.body.pname},
//         //     {
//         //     $set: {
//         //         pname: req.body.pname,
//         //         // pid: req.body.pid
//         //     }
//         // },
//         //     {
//         //     sort: {_id: -1},
//         //     upsert: true
//         // },
//             (err, result) => {
//             if (err) return res.send(err)
//             console.log(result)
//             res.send(result)
//         })
// })

app.delete('/user', (req, res) => {
    // Handle DELETE request and to update data in db
    console.log('in Delete API');
    console.log(req.body.pname);
    console.log(req.body.pid);

    db.collection('users-table')
        .findOneAndDelete({name: req.body.name},
            //     {
            //     $set: {
            //         pname: req.body.pname,
            //         // pid: req.body.pid
            //     }
            // },
            //     {
            //     sort: {_id: -1},
            //     upsert: true
            // },
            (err, result) => {
                if (err) return res.send(err)
                console.log(result)
                res.send(result)
            })
})



//GET method for React
// app.get("/userdata",function(request,response){
//     db.collection('productsdb').find().toArray(function (error,result) {
//     if(error){
//         return console.log(error)
//     }
//
//     var result = {result};
//     response.send(result);
// })
// })

//creating CREATE/GET method for React
app.get("/user",function(request,response)
{	db.collection('users-table').find().toArray(function (error,result) {
    if(error){
        return console.log(error)
    }

    var result = {result};
    response.send(result);
})
})

//creating CREATE/POST method for React
// app.post("/user",function(request,response)
// {
//     console.log(request.body)
//     db.collection('users-table').find().toArray(function (error,result) {
//     if(error){
//         return console.log(error)
//     }
//
//         console.log('saved to database')
//         response.send(result)
// })
// })


