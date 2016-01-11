var express = require('express');
var vre		  = require('./vreconnect');
var pbase		= require('./databases');
var	pflow		= require('./workflows');
var app			= express();

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
