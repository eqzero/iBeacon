var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listem(server);

server.listen(3000);

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});