var express = require('express');
var vre		  = require('./vreconnect');
var pbase		= require('./databases');
var	pflow		= require('./workflows');
var app			= express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow (other options: OPTIONS, PATCH, DELETE)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});


app.use(require("helmet")());
app.use(require("compression")());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/databases', pbase.findAllPubbase);
app.get('/databases/:id', pbase.findByIdPubbase);
app.post('/databases', pbase.addPubbase);
app.put('/databases/:id', pbase.updatePubbase);
app.delete('/databases/:id', pbase.deletePubbase);

app.get('/workflows', pflow.findAllPubflow);
app.get('/workflows/:id', pflow.findByIdPubflow);
app.post('/workflows', pflow.addPubflow);
app.put('/workflows/:id', pflow.updatePubflow);
app.delete('/workflows/:id', pflow.deletePubflow);


app.listen(5000);
console.log('Listening on port 5000...');
