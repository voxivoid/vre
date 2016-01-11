var express = require('express');
var pbase		= require('./databases');
/*var		pflow = require('./workflows');*/

var app = express();

app.use(require("helmet")());
app.use(require("compression")());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/databases', pbase.findAll);
app.get('/databases/:id', pbase.findById);
app.post('/databases', pbase.addPubbase);
app.put('/databases/:id', pbase.updatePubbase);
app.delete('/databases/:id', pbase.deletePubbase);
/*
app.get('/workflows', pflow.findAll);
app.get('/workflows/:id', pflow.findById);
app.post('/workflows', pflow.addPubflow);
app.put('/workflows/:id', pflow.updatePubflow);
app.delete('/workflows/:id', pflow.deletePubflow);
*/

app.listen(5000);
console.log('Listening on port 5000...');
